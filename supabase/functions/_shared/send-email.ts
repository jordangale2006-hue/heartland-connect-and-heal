// Shared helper: send a registered template through Lovable's managed email API
// and record the outcome in email_send_log. Never throws — a failed email must
// never block a successful form submission, but it is always logged.
import { sendTemplateEmail } from './transactional-email-templates/send-email.ts'

export async function sendEmail(
  supabase: any,
  args: {
    templateName: string
    recipientEmail?: string
    idempotencyKey: string
    templateData?: Record<string, unknown>
  }
) {
  const logRow = async (
    status: 'sent' | 'suppressed' | 'failed',
    errorMessage?: string
  ) => {
    const { error } = await supabase.from('email_send_log').insert({
      message_id: null,
      template_name: args.templateName,
      recipient_email: args.recipientEmail ?? 'unknown',
      status,
      error_message: errorMessage ? errorMessage.slice(0, 500) : null,
    })
    if (error) {
      console.error('Failed to write email_send_log row', {
        status,
        code: error.code,
        message: error.message,
      })
    }
  }

  try {
    const result = await sendTemplateEmail(
      args.templateName,
      args.recipientEmail ?? '',
      {
        templateData: args.templateData as Record<string, any> | undefined,
        idempotencyKey: args.idempotencyKey,
      }
    )

    if (result.sent) {
      console.log('Email sent', { templateName: args.templateName })
      await logRow('sent')
      return { ok: true as const }
    }

    console.log('Email suppressed', { templateName: args.templateName })
    await logRow('suppressed', 'Recipient is suppressed')
    return { ok: true as const, suppressed: true as const }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.error('Email send failed', { templateName: args.templateName, message })
    await logRow('failed', message)
    return { ok: false as const, message }
  }
}
