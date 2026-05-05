## Goal
Make contact form submissions actually go somewhere: email them to `heartlandmentalhealthservices@gmail.com` AND save them to a database for record-keeping.

## What gets built

### 1. Database
- New `contact_submissions` table: `id`, `name`, `email`, `message`, `created_at`
- RLS: anyone can insert (public form); only authenticated admins can read

### 2. Email infrastructure (Lovable Cloud + Lovable Email)
- Enable Lovable Cloud
- Set up sender email domain (you'll be prompted to pick one — e.g. `notify.heartlandmentalhealthservices.com` or similar)
- Two transactional email templates:
  - **Notification to you** → sent to `heartlandmentalhealthservices@gmail.com` with the client's name, email, and message
  - **Confirmation to client** → warm "We received your message, we'll get back to you soon" reply

### 3. Form wiring (`src/pages/Contact.tsx`)
- Add zod validation (name/email/message length + format)
- On submit: insert row into `contact_submissions`, then trigger both emails
- Keep the existing success toast; show error toast if something fails

## Notes
- Setting up the email domain requires one DNS step on your domain registrar. I'll walk you through it when we get there.
- Until DNS is verified, submissions still save to the database, and emails queue up and send once verification completes.
- Confirmation email will use the warm Heartland brand styling (Lora headings, warm palette).

## Approve this and I'll start building.