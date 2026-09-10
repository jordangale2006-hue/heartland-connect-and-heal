// Shared helper: invoke send-transactional-email and never fail silently.
// Records a `failed` row in email_send_log when the handoff itself breaks so
// email problems are visible instead of swallowed by Promise.allSettled.
export async function sendEmail(
  supabase: any,
  args: {
    templateName: string
    recipientEmail?: string
    idempotencyKey: string
    templateData?: Record<string, unknown>
  }
) {
  try {
    const { data, error } = await supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: args.templateName,
        recipientEmail: args.recipientEmail,
        idempotencyKey: args.idempotencyKey,
        templateData: args.templateData ?? {},
      },
    })

    if (error) {
      let detail = error.message ?? String(error)
      try {
        const ctx = (error as any).context
        if (ctx && typeof ctx.text === 'function') detail += ` | ${await ctx.text()}`
      } catch { /* ignore */ }
      throw new Error(detail)
    }

    if (data && data.success === false) {
      console.warn('Email not sent', { templateName: args.templateName, data })
    }
    return { ok: true as const }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.error('Email handoff failed', { templateName: args.templateName, message })
    try {
      await supabase.from('email_send_log').insert({
        message_id: args.idempotencyKey,
        template_name: args.templateName,
        recipient_email: args.recipientEmail ?? 'unknown',
        status: 'failed',
        error_message: `Handoff failed: ${message}`.slice(0, 500),
      })
    } catch { /* never block the caller */ }
    return { ok: false as const, message }
  }
}
