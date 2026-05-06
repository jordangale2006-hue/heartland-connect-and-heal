import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Body {
  name?: unknown
  email?: unknown
  message?: unknown
}

function isStr(v: unknown): v is string {
  return typeof v === 'string'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: Body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
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
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const id = crypto.randomUUID()
  const { error: insertError } = await supabase
    .from('contact_submissions')
    .insert({ id, name, email, message })

  if (insertError) {
    console.error('Insert failed', insertError)
    return new Response(JSON.stringify({ error: 'Failed to save submission' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Fire-and-forget emails — failures here should not block the user response
  await Promise.allSettled([
    supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'contact-confirmation',
        recipientEmail: email,
        idempotencyKey: `contact-confirm-${id}`,
        templateData: { name },
      },
    }),
    supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'contact-notification',
        idempotencyKey: `contact-notify-${id}`,
        templateData: { name, email, message },
      },
    }),
  ])

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
