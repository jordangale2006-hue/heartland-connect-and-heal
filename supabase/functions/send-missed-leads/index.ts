// One-time catch-up: emails all stored appointment requests and contact
// messages to staff as a single digest. Removed after it has been run once.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendEmail } from '../_shared/send-email.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const fmt = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString('en-US', {
        timeZone: 'America/Phoenix',
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : undefined

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const [{ data: appts, error: aErr }, { data: msgs, error: mErr }] = await Promise.all([
    supabase.from('appointment_requests').select('*').order('created_at', { ascending: true }),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: true }),
  ])

  if (aErr || mErr) {
    return new Response(JSON.stringify({ error: aErr?.message ?? mErr?.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const appointments = (appts ?? []).map((a: any) => ({
    createdAt: fmt(a.created_at),
    name: a.name,
    phone: a.phone,
    email: a.email,
    insurance: a.insurance ?? undefined,
    preferredTime: a.preferred_time ?? undefined,
    reason: a.reason ?? undefined,
    status: a.status ?? undefined,
  }))

  const messages = (msgs ?? []).map((m: any) => ({
    createdAt: fmt(m.created_at),
    name: m.name,
    email: m.email,
    message: m.message,
  }))

  const result = await sendEmail(supabase, {
    templateName: 'missed-leads-digest',
    idempotencyKey: `missed-leads-digest-${appointments.length}-${messages.length}-${Date.now()}`,
    templateData: { appointments, messages },
  })

  return new Response(
    JSON.stringify({
      ok: result.ok,
      appointments: appointments.length,
      messages: messages.length,
      ...(('message' in result) ? { message: result.message } : {}),
    }),
    {
      status: result.ok ? 200 : 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  )
})
