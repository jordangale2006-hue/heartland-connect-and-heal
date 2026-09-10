ALTER TABLE public.appointment_requests ADD COLUMN state text;

ALTER TABLE public.appointment_requests
  ADD CONSTRAINT appointment_requests_state_check
  CHECK (state IS NULL OR state IN ('Arizona', 'Iowa'));

COMMENT ON COLUMN public.appointment_requests.state IS 'State where the patient will be located for care: Arizona or Iowa.';