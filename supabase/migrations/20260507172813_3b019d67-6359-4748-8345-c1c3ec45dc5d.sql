
-- job_applications: add service_role insert + admin update/delete policies
CREATE POLICY "Service role can insert job applications"
ON public.job_applications FOR INSERT TO public
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can update job applications"
ON public.job_applications FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete job applications"
ON public.job_applications FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- resumes storage bucket: add insert (service role) + admin update/delete policies
CREATE POLICY "Service role can upload resumes"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'resumes' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update resumes"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));
