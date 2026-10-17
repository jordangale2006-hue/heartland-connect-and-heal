import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendEmail } from '../_shared/send-email.ts'
import { corsHeadersFor, isHoneypotFilled, isRateLimited, runInBackground } from '../_shared/security.ts'

interface Body {
  name?: unknown
  email?: unknown
  state?: unknown
  phone?: unknown
  insurance?: unknown
  reason?: unknown
  preferredTime?: unknown
  website?: unknown // honeypot — must stay empty
}

const isStr = (v: unknown): v is string => typeof v === 'string'
const trimStr = (v: unknown, max: number) =>
  isStr(v) ? v.trim().slice(0, max) : ''

Deno.serve(async (req) => {
  const corsHeaders = corsHeadersFor(req)
  const json = (status: number, data: unknown) =>
    new Response(JSON.stringify(data), {
      status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  let body: Body
  try { body = await req.json() } catch {
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

  if (await isRateLimited(supabase, req, 'submit-appointment-request')) {
    return json(429, { error: 'Too many requests. Please call us at (520) 595-5709.' })
  }

  const name = trimStr(body.name, 100)
  const email = trimStr(body.email, 255)
  const phone = trimStr(body.phone, 40)
  const state = trimStr(body.state, 20)
  const insurance = trimStr(body.insurance, 80)
  const reason = trimStr(body.reason, 500)
  const preferredTime = trimStr(body.preferredTime, 120)

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRe = /^[+\d().\-\s]{7,}$/

  if (
    name.length < 1 ||
    !emailRe.test(email) ||
    !phoneRe.test(phone) ||
    !['Arizona', 'Iowa'].includes(state)
  ) {
    return json(400, { error: 'Invalid input' })
  }

  const id = crypto.randomUUID()
  const { error: insertError } = await supabase
    .from('appointment_requests')
    .insert({ id, name, email, phone, state, insurance, reason, preferred_time: preferredTime })

  if (insertError) {
    console.error('Insert failed', insertError)
    return json(500, { error: 'Failed to save request' })
  }

  // Send emails in the background so the user gets an instant response
  await runInBackground(Promise.all([
    sendEmail(supabase, {
      templateName: 'appointment-request-confirmation',
      recipientEmail: email,
      idempotencyKey: `appt-confirm-${id}`,
      templateData: { name, state },
    }),
    sendEmail(supabase, {
      templateName: 'appointment-request-notification',
      idempotencyKey: `appt-notify-${id}`,
      templateData: { name, email, phone, state, insurance, reason, preferredTime },
    }),
  ]))

  return json(200, { success: true })
})
