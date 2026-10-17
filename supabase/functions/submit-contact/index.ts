import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendEmail } from '../_shared/send-email.ts'
import { corsHeadersFor, isHoneypotFilled, isRateLimited, runInBackground } from '../_shared/security.ts'

interface Body {
  name?: unknown
  email?: unknown
  message?: unknown
  website?: unknown // honeypot — must stay empty
}

function isStr(v: unknown): v is string {
  return typeof v === 'string'
}

Deno.serve(async (req) => {
  const corsHeaders = corsHeadersFor(req)
  const json = (status: number, data: unknown) =>
    new Response(JSON.stringify(data), {
      status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  let body: Body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Invalid JSON' })
  }

  // Honeypot: pretend success, save nothing, send nothing
  if (isHoneypotFilled(body.website)) {
    return json(200, { success: true })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  if (await isRateLimited(supabase, req, 'submit-contact')) {
    return json(429, { error: 'Too many requests. Please call us at (520) 595-5709.' })
  }

  // Server-side validation (do not trust client)
  const name = isStr(body.name) ? body.name.trim() : ''
  const email = isStr(body.email) ? body.email.trim() : ''
  const message = isStr(body.message) ? body.message.trim() : ''

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (
    name.length < 1 || name.length > 100 ||
    email.length < 3 || email.length > 255 || !emailRe.test(email) ||
    message.length < 5 || message.length > 2000
  ) {
    return json(400, { error: 'Invalid input' })
  }

  const id = crypto.randomUUID()
  const { error: insertError } = await supabase
    .from('contact_submissions')
    .insert({ id, name, email, message })

  if (insertError) {
    console.error('Insert failed', insertError)
    return json(500, { error: 'Failed to save submission' })
  }

  // Send emails in the background so the user gets an instant response.
  // Failures are logged, not swallowed, but never block the user response.
  await runInBackground(Promise.all([
    sendEmail(supabase, {
      templateName: 'contact-confirmation',
      recipientEmail: email,
      idempotencyKey: `contact-confirm-${id}`,
      templateData: { name },
    }),
    sendEmail(supabase, {
      templateName: 'contact-notification',
      idempotencyKey: `contact-notify-${id}`,
      templateData: { name, email, message },
    }),
  ]))

  return json(200, { success: true })
})
