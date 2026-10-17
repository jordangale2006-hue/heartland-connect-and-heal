// Shared security helpers for public form endpoints:
// CORS allowlist, honeypot detection, and per-IP rate limiting.

const ALLOWED_ORIGINS = new Set([
  'https://heartlandmhservices.com',
  'https://www.heartlandmhservices.com',
])

const PREVIEW_ORIGIN_RE = /^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.(lovable\.app|lovableproject\.com)$/

export function corsHeadersFor(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') ?? ''
  const allowed = ALLOWED_ORIGINS.has(origin) || PREVIEW_ORIGIN_RE.test(origin)
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'https://heartlandmhservices.com',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Vary': 'Origin',
  }
}

// A filled honeypot means a bot. Caller should return a fake 200 success
// without saving anything or sending email.
export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function clientIp(req: Request): string {
  const cf = req.headers.get('cf-connecting-ip')
  if (cf) return cf.trim()
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return 'unknown'
}

const RATE_LIMIT = 5
const WINDOW_MINUTES = 60

// Returns true if the request is over the limit (5 per IP per hour per function).
// Stores only a SHA-256 hash of the IP. Opportunistically deletes rows older than 24h.
export async function isRateLimited(supabase: any, req: Request, functionName: string): Promise<boolean> {
  try {
    const ipHash = await sha256Hex(clientIp(req))
    const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString()

    const { count, error } = await supabase
      .from('form_rate_limits')
      .select('id', { count: 'exact', head: true })
      .eq('function_name', functionName)
      .eq('ip_hash', ipHash)
      .gte('created_at', windowStart)

    if (error) {
      console.error('Rate limit check failed', { functionName, message: error.message })
      return false // fail open: never block real patients on a rate-limit error
    }

    if ((count ?? 0) >= RATE_LIMIT) return true

    const { error: insertError } = await supabase
      .from('form_rate_limits')
      .insert({ function_name: functionName, ip_hash: ipHash })
    if (insertError) {
      console.error('Rate limit insert failed', { functionName, message: insertError.message })
    }

    // Opportunistic cleanup of rows older than 24 hours
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    supabase.from('form_rate_limits').delete().lt('created_at', cutoff).then(() => {})

    return false
  } catch (e) {
    console.error('Rate limit error', { functionName, message: e instanceof Error ? e.message : String(e) })
    return false
  }
}

// Run work in the background when the edge runtime supports it; otherwise the
// caller awaits the returned promise. Always `await runInBackground(...)`.
export function runInBackground(promise: Promise<unknown>): Promise<unknown> {
  const edgeRuntime = (globalThis as any).EdgeRuntime
  if (edgeRuntime && typeof edgeRuntime.waitUntil === 'function') {
    edgeRuntime.waitUntil(promise)
    return Promise.resolve()
  }
  return promise
}
