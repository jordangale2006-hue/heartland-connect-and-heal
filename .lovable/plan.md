
# Engagement Boost Plan

Your analytics tell a clear story: **91% mobile, 79% bounce rate, 1.59 pages/visit, ~27s sessions, almost everyone lands on `/` and leaves**. The plan below is built to fix exactly that — get mobile visitors to act on the homepage instead of bouncing.

---

## 1. Stronger homepage hook + sticky CTA

Goal: make the value clear in the first 2 seconds and keep a "Book" button in reach at all times.

- Tighten the hero headline to a benefit-led line, e.g. *"Online Psychiatry in Arizona — Often Booked Within the Week."*
- Sub-headline highlights: virtual visits, most insurance accepted, Arizona-licensed providers.
- Two clear buttons: **Book Appointment** (primary) and **Verify My Insurance** (secondary).
- Trust strip directly under the hero: insurance logos/names, ZocDoc rating, "Board-certified" badge, "Mon–Sat appointments".
- **Sticky bottom CTA bar on mobile**: "Book Appointment" + "Call" — always visible while scrolling.

## 2. Quick "Request Appointment" lead form (mobile-friendly)

The OptiMantra iframe is heavy on mobile and a known drop-off point. We'll add a lightweight form as the first step.

- Short form on `/book` (and as a modal from CTAs): **Name, phone, email, insurance (dropdown of accepted plans + Cashpay), reason for visit (short), preferred contact time**.
- HIPAA-friendly disclaimer ("Please do not include sensitive health information").
- Submits via existing `submit-contact` style edge function → emails the practice + sends a confirmation email to the patient.
- Full OptiMantra portal stays available below as "Prefer to self-schedule? Use our patient portal."
- Validated with zod (length limits, valid email/phone), spam-resistant, never logs PHI.

## 3. Interactive tools to keep visitors on-site

Pick-one-or-both lightweight tools that turn passive readers into engaged leads:

- **"Do I need to see a psychiatrist?" 60-second quiz** — 5–7 gentle yes/no questions (sleep, focus, mood, anxiety, energy). Result page shows a warm, non-diagnostic summary + "Talk to a provider" CTA → opens the quick lead form.
- **Insurance checker** — dropdown of accepted plans; selecting one shows "Yes, we accept [Plan] for telehealth psychiatry in Arizona" with a Book CTA. Selecting AHCCCS/Medicaid shows the existing disclaimer + Cashpay info.

Both add a real second pageview and a clear next action (directly attacks the 1.59 pages/visit number).

## 4. Exit-intent / scroll popup (used sparingly, once per session)

- Trigger: 60% scroll on mobile or mouse-leave on desktop.
- Soft offer: *"Not ready to book? We can verify your insurance and call you back."* → opens the quick lead form.
- Dismissible, remembered via `localStorage` so it never re-pops in the same session.

## 5. Mobile-first polish

- Larger tap targets (min 44px) on all CTAs.
- Compress hero image, lazy-load below-the-fold images.
- Tap-to-call link on phone numbers (`tel:`).
- Condensed mobile hero (no large empty space above the fold).
- Faster perceived load: skeleton placeholders for the OptiMantra iframe.
- Verify viewport, font sizes (min 16px body), and contrast across breakpoints.

## 6. Light social proof additions

- Pull 2–3 short ZocDoc quotes directly into the hero area (currently the slider sits lower).
- Add an "As featured / verified on" row with ZocDoc + Psychology Today logos (only ones you're actually listed on).
- "X+ Arizona patients seen this year" stat (only if you're comfortable with a number).

---

## Technical implementation

- New components:
  - `src/components/StickyMobileCTA.tsx` — fixed bottom bar, mobile-only.
  - `src/components/QuickAppointmentForm.tsx` — zod-validated form, used inline and inside a modal.
  - `src/components/QuickAppointmentDialog.tsx` — wraps the form in a `Dialog`, opened from any CTA.
  - `src/components/InsuranceChecker.tsx` — dropdown + result panel, reads from `src/data/insurances.ts`.
  - `src/components/PsychiatryQuiz.tsx` — multi-step quiz with state, ends in result + CTA.
  - `src/components/ExitIntentDialog.tsx` — listens for `mouseleave` (desktop) / scroll depth (mobile), respects `localStorage` flag.
- Updates:
  - `src/pages/Index.tsx` — new hero copy, trust strip, embed `InsuranceChecker` + quiz teaser, FAQ schema covers new questions.
  - `src/pages/BookAppointment.tsx` — `QuickAppointmentForm` above the OptiMantra iframe, iframe gets a skeleton + lazy load.
  - `src/components/Header.tsx` / `Footer.tsx` — add `tel:` links.
  - `src/App.tsx` — mount `StickyMobileCTA` and `ExitIntentDialog` globally.
- Backend:
  - New edge function `submit-appointment-request` (mirrors `submit-contact`) → sends notification + patient confirmation via existing transactional email infra. No new DB table required (or optional `appointment_requests` table with RLS allowing inserts only).
- No design-system color changes; keep Lora/Source Sans 3 + warm palette per project memory.
- Mobile-first Tailwind classes; existing `use-mobile` hook for sticky bar visibility.

## What to expect

If we ship all of the above, the realistic targets within ~30 days are:
- Bounce rate: **79% → 55–60%**
- Pages/visit: **1.59 → 2.2–2.8**
- Booking-form starts: clear new metric to track in analytics
- Mobile session duration: meaningful lift from the quiz/insurance checker

## Out of scope (call out explicitly)

- No paid ads.
- No changes to the booking platform itself (OptiMantra stays).
- No design system overhaul — only copy, layout, and new components.
- No PHI stored in the new lead form (disclaimer + minimal fields only).
