import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Body {
  firstName?: unknown
  lastName?: unknown
  phone?: unknown
  email?: unknown
  convicted?: unknown
  convictionDetails?: unknown
  fingerprintCard?: unknown
  resume?: unknown // { filename, contentType, base64 }
}

const isStr = (v: unknown): v is string => typeof v === 'string'

const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const MAX_RESUME_BYTES = 10 * 1024 * 1024 // 10MB

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120)
}

function jsonResponse(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return jsonResponse(405, { error: 'Method not allowed' })

  let body: Body
  try {
    body = await req.json()
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON' })
  }

  const firstName = isStr(body.firstName) ? body.firstName.trim() : ''
  const lastName = isStr(body.lastName) ? body.lastName.trim() : ''
  const phone = isStr(body.phone) ? body.phone.trim() : ''
  const email = isStr(body.email) ? body.email.trim() : ''
  const convicted = isStr(body.convicted) ? body.convicted.trim() : ''
  const convictionDetails = isStr(body.convictionDetails) ? body.convictionDetails.trim() : ''
  const fingerprintCard = isStr(body.fingerprintCard) ? body.fingerprintCard.trim() : ''

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (
    firstName.length < 1 || firstName.length > 80 ||
    lastName.length < 1 || lastName.length > 80 ||
    phone.length < 7 || phone.length > 30 ||
    email.length < 3 || email.length > 255 || !emailRe.test(email) ||
    !['yes', 'no'].includes(convicted) ||
    !['yes', 'no'].includes(fingerprintCard) ||
    (convicted === 'yes' && (convictionDetails.length < 1 || convictionDetails.length > 2000))
  ) {
    return jsonResponse(400, { error: 'Invalid input' })
  }

  // Optional resume
  let resumeUpload: { filename: string; contentType: string; bytes: Uint8Array } | null = null
  if (body.resume && typeof body.resume === 'object') {
    const r = body.resume as { filename?: unknown; contentType?: unknown; base64?: unknown }
    const filename = isStr(r.filename) ? r.filename : ''
    const contentType = isStr(r.contentType) ? r.contentType : ''
    const base64 = isStr(r.base64) ? r.base64 : ''
    if (!filename || !contentType || !base64) {
      return jsonResponse(400, { error: 'Invalid resume' })
    }
    if (!ALLOWED_RESUME_TYPES.has(contentType)) {
      return jsonResponse(400, { error: 'Resume must be PDF, DOC, or DOCX' })
    }
    let bytes: Uint8Array
    try {
      const bin = atob(base64)
      bytes = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    } catch {
      return jsonResponse(400, { error: 'Invalid resume encoding' })
    }
    if (bytes.byteLength > MAX_RESUME_BYTES) {
      return jsonResponse(400, { error: 'Resume exceeds 10MB' })
    }
    resumeUpload = { filename: safeFilename(filename), contentType, bytes }
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const id = crypto.randomUUID()
  let resumePath: string | null = null
  let resumeUrl: string | undefined

  if (resumeUpload) {
    const path = `applications/${id}-${resumeUpload.filename}`
    const { error: uploadErr } = await supabase.storage
      .from('resumes')
      .upload(path, resumeUpload.bytes, {
        contentType: resumeUpload.contentType,
        upsert: false,
      })
    if (uploadErr) {
      console.error('Resume upload failed', uploadErr)
      return jsonResponse(500, { error: 'Failed to upload resume' })
    }
    resumePath = path
    const { data: signed } = await supabase.storage
      .from('resumes')
      .createSignedUrl(path, 60 * 60 * 24 * 7) // 7 days
    resumeUrl = signed?.signedUrl
  }

  const { error: insertError } = await supabase
    .from('job_applications')
    .insert({
      id,
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      convicted,
      conviction_details: convicted === 'yes' ? convictionDetails : null,
      fingerprint_card: fingerprintCard,
      resume_path: resumePath,
    })

  if (insertError) {
    console.error('Insert failed', insertError)
    return jsonResponse(500, { error: 'Failed to save application' })
  }

  await Promise.allSettled([
    supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'application-confirmation',
        recipientEmail: email,
        idempotencyKey: `application-confirm-${id}`,
        templateData: { firstName },
      },
    }),
    supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'application-notification',
        idempotencyKey: `application-notify-${id}`,
        templateData: {
          firstName,
          lastName,
          email,
          phone,
          convicted,
          convictionDetails: convicted === 'yes' ? convictionDetails : '',
          fingerprintCard,
          resumeUrl,
          resumeFilename: resumeUpload?.filename,
        },
      },
    }),
  ])

  return jsonResponse(200, { success: true })
})
