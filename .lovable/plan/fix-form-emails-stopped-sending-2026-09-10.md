# Fix: form emails stopped sending

## What I found

Your website forms are still saving everything correctly — no lost leads:

- 23 appointment requests (most recent: Sept 10)
- 13 contact messages (most recent: Sept 8)

But the email record shows the **last email ever sent was May 6**. Since then, every
appointment request and contact message was saved to your database and no email went
out — not to you, and not to the patient. The domain itself
(notify.heartlandmhservices.com) is verified and healthy, so this is not a domain or
DNS problem.

Cause: the part of the site that hands emails off to the sending system is failing, and
the failure was being ignored silently instead of reported. The most likely trigger is a
security key rotation on the backend after early May, which breaks the handoff. I'll
confirm the exact cause as the first step rather than guessing.

## Plan

1. **Confirm the cause** — inspect the email queue and run one live test send through the
   sending function to capture the real error message.
2. **Repair the email plumbing** — re-run the email infrastructure setup (safe and
   repeatable) so the backend key and scheduled queue worker are refreshed, then redeploy
   the email functions and the three form handlers.
3. **Stop silent failures** — change the appointment, contact, and careers form handlers so
   a failed email is recorded and visible instead of swallowed. Forms will still save the
   submission and still show the visitor a success message, so nothing breaks for patients.
4. **Verify end to end** — submit a real appointment request and a contact message from the
   site, then confirm both the staff notification and the patient confirmation are logged as
   sent.
5. **Catch up on the backlog** — report the 23 appointment requests and 13 contact messages
   from the silent period so nobody is missed. On your say-so I can either email you one
   summary list of them, or leave them for you to review directly.

## Technical notes

- `email_send_log` last row: 2026-05-06; no rows for `appointment-request-*` templates ever.
- `submit-appointment-request` and `submit-contact` wrap `functions.invoke('send-transactional-email')`
  in `Promise.allSettled` with no error inspection — the root of the silence.
- Suspected: rotated service-role key → 401 on invoke / queue processing. Fix is
  `setup_email_infra` (idempotent; refreshes the Vault secret and pg_cron job), not manual SQL.
- Redeploy: `send-transactional-email`, `process-email-queue`, `submit-appointment-request`,
  `submit-contact`, `submit-application`.
- No schema changes, no template redesign, no visible UI change.
