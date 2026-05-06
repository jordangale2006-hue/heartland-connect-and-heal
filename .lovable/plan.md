## Goal
Make the Careers application form actually do something when submitted: save the application, store the resume file, notify Heartland, and confirm receipt to the applicant.

## What gets built

### 1. Database
New `job_applications` table:
- `id`, `created_at`
- `first_name`, `last_name`, `phone`, `email`
- `convicted` (yes/no), `conviction_details` (nullable)
- `fingerprint_card` (yes/no)
- `resume_path` (nullable — path inside storage bucket)
- `status` (default `new`) for future triage

RLS:
- No public SELECT/UPDATE/DELETE
- INSERT allowed via the edge function (service role) only — same secure pattern as `contact_submissions`
- Admins can SELECT (using existing `has_role` + `admin` role)

### 2. Resume storage
Private storage bucket `resumes`:
- Not public
- Max ~10MB, accept PDF/DOC/DOCX only (validated client + server)
- Files stored at `applications/{uuid}-{safe-filename}`
- RLS: only service role can read/write; admins get signed URLs via the notification email

### 3. Edge function: `submit-application`
- Validates all fields with zod (names, email format, phone, conviction logic, fingerprint, optional resume metadata)
- Receives the resume as base64 (small payload, simple), uploads to `resumes` bucket using service role
- Inserts row into `job_applications`
- Triggers two emails via `send-transactional-email`:
  - **Notification → `heartlandmentalhealthservices@gmail.com`** with applicant details + a 7-day signed download link to the resume
  - **Confirmation → applicant** warm acknowledgment using Heartland brand styling

### 4. Email templates (new, in `_shared/transactional-email-templates/`)
- `application-notification.tsx` — internal notification with applicant info and resume link
- `application-confirmation.tsx` — warm "We received your application" reply (Lora headings, warm palette, virtual-practice tone)
- Both registered in `registry.ts`

### 5. Form wiring (`src/pages/Careers.tsx`)
- Add zod validation matching the server schema
- On submit: read resume as base64, call `submit-application` edge function
- Show loading state on the button, success/error toasts
- Reset form on success

## Notes
- Uses existing Lovable Email infrastructure on `notify.heartlandmhservices.com` — no new domain setup needed
- Resume is optional (matches current UI which doesn't mark it required)
- All sensitive data flows through the edge function; the browser never touches the database directly
- Idempotency keys derived from the new application's UUID so retries won't double-send

## Approve and I'll build it.