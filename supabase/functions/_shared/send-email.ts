// Shared helper: call send-transactional-email and never fail silently.
// Uses an explicit fetch with both apikey and Authorization headers, because
// functions.invoke does not reliably forward the service key as a bearer token.
// Records a `failed` row in email_send_log when the handoff itself breaks so
// email problems are visible instead of swallowed.
export async function sendEmail(
  supabase: any,
  args: {
    templateName: string
    recipientEmail?: string
    idempotencyKey: string
    templateData?: Record<string, unknown>
  }
) {
  const url = Deno.env.get('SUPABASE_URL') ?? ''
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

  try {
    const res = await fetch(`${url}/functions/v1/send-transactional-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        templateName: args.templateName,
        recipientEmail: args.recipientEmail,
        idempotencyKey: args.idempotencyKey,
        templateData: args.templateData ?? {},
      }),
    })

    const text = await res.text()
    if (!res.ok) throw new Error(`${res.status} ${text}`.slice(0, 400))

    console.log('Email handed off', { templateName: args.templateName, text })
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
