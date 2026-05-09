import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Body {
  name?: unknown
  email?: unknown
  phone?: unknown
  insurance?: unknown
  reason?: unknown
  preferredTime?: unknown
}

const isStr = (v: unknown): v is string => typeof v === 'string'
const trimStr = (v: unknown, max: number) =>
  isStr(v) ? v.trim().slice(0, max) : ''

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: Body
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const name = trimStr(body.name, 100)
  const email = trimStr(body.email, 255)
  const phone = trimStr(body.phone, 40)
  const insurance = trimStr(body.insurance, 80)
  const reason = trimStr(body.reason, 500)
  const preferredTime = trimStr(body.preferredTime, 120)

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRe = /^[+\d().\-\s]{7,}$/

  if (
    name.length < 1 ||
    !emailRe.test(email) ||
    !phoneRe.test(phone)
  ) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const id = crypto.randomUUID()
  const { error: insertError } = await supabase
    .from('appointment_requests')
    .insert({ id, name, email, phone, insurance, reason, preferred_time: preferredTime })

  if (insertError) {
    console.error('Insert failed', insertError)
    return new Response(JSON.stringify({ error: 'Failed to save request' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  await Promise.allSettled([
    supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'appointment-request-confirmation',
        recipientEmail: email,
        idempotencyKey: `appt-confirm-${id}`,
        templateData: { name },
      },
    }),
    supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'appointment-request-notification',
        idempotencyKey: `appt-notify-${id}`,
        templateData: { name, email, phone, insurance, reason, preferredTime },
      },
    }),
  ])

  return new Response(JSON.stringify({ success: true }), {
    status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
