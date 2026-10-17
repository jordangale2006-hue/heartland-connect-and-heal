DELETE FROM public.contact_submissions WHERE email IN ('bot@example.com','bot2@example.com','t@example.com','real@example.com','test@example.com');
DELETE FROM public.appointment_requests WHERE email = 'rate@example.com';
DELETE FROM public.form_rate_limits;
DELETE FROM public.email_send_log WHERE recipient_email IN ('bot@example.com','bot2@example.com','t@example.com','real@example.com','test@example.com','rate@example.com');