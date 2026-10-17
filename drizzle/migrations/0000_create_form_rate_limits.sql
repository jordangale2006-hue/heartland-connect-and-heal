CREATE TABLE public.form_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  function_name text NOT NULL,
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX form_rate_limits_lookup_idx ON public.form_rate_limits (function_name, ip_hash, created_at);

GRANT ALL ON public.form_rate_limits TO service_role;

ALTER TABLE public.form_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage rate limits"
ON public.form_rate_limits
FOR ALL
TO public
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);