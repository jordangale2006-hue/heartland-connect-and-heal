# Send the missed leads, then remove the admin login

## What you'll get

1. **One catch-up email** to infor@heartlandmhservices.com containing every appointment request (23) and contact message (13) currently stored, with name, phone, email, insurance, reason, preferred time, message, and the date each came in.
2. **The staff login and admin pages removed**, since new leads now arrive by email automatically.

Sending one digest instead of 36 separate emails keeps the inbox readable and avoids hitting sending limits. The stored leads are not deleted — they stay safely in your backend.

## Steps

- Build a "missed leads digest" email design matching the site's look (warm palette, Lora headings), listing appointments first, then messages, newest last.
- Add a one-time send function that reads all rows from the appointment and contact tables and sends that single digest to infor@heartlandmhservices.com, then run it once and confirm the send in the email log.
- Remove the digest function afterwards so it can't be triggered again.
- Delete the `/login` and `/admin` pages and their routes, and drop the now-unneeded lines from robots.txt.
- Verify the site builds and other pages still work.

## Technical notes

- New template `missed-leads-digest.tsx` in `supabase/functions/_shared/transactional-email-templates/`, registered in `registry.ts`, sent via `sendTemplateEmail` from a temporary `send-missed-leads` edge function (service-role read, `verify_jwt = true`, invoked once by me).
- Delete `src/pages/Admin.tsx`, `src/pages/Login.tsx`, their imports/routes in `src/App.tsx`, and the two Disallow lines in `public/robots.txt`. The `user_roles` table and `has_role` function stay in place (unused, harmless).
