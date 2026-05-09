
CREATE TABLE public.appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  insurance text,
  reason text,
  preferred_time text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.appointment_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert appointment requests"
  ON public.appointment_requests FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can view appointment requests"
  ON public.appointment_requests FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update appointment requests"
  ON public.appointment_requests FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete appointment requests"
  ON public.appointment_requests FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
