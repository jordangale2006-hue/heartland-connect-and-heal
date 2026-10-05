# Replace the Iowa notices with a new phone-link version

## Goal
Both Iowa notices on the homepage and the Iowa notice on /book all become the same exact sentence, with "Call us" tapping into a phone call.

## Current state (verified)
The old Iowa notice text appears in exactly three places, matching the user's description:

1. **Homepage — "Heartland is now licensed in Iowa" section** (`src/components/IowaLaunchSection.tsx`, peach notice card):
   "Wellmark HMO plans may require a referral from your primary care provider for behavioral health visits. Not sure about yours? Call us and we'll check before your first appointment."
2. **Homepage — "Insurances we accept" section** (`src/components/InsurancesAccepted.tsx`, Iowa column notice, built from `INSURANCE_NOTICES.Iowa` + a fixed in-network sentence):
   "In Iowa, we currently accept Wellmark Blue Cross Blue Shield of Iowa, Medicare, Aetna, Cigna, and cash pay. Plan availability may vary by product. Please verify that your provider is in-network before booking."
3. **/book — "Insurances we accept" section**: same component as #2 (the full-width section under the booking form), so one edit covers both.

## Changes

### 1. `src/components/IowaLaunchSection.tsx`
Replace the Wellmark HMO referral paragraph inside the peach notice card with exactly:
> Plan availability may vary by product. Not sure about yours? Call us and we'll check before your first appointment.

"Call us" becomes `<a href="tel:+15205955709">Call us</a>`, styled in the accent color so it reads as tappable; the rest keeps the current muted small text. Keep the ShieldCheck icon and peach card styling.

### 2. `src/components/InsurancesAccepted.tsx`
In the notice under the tiles, branch by state:
- **Iowa**: render exactly the new sentence with the `tel:+15205955709` "Call us" link (same accent link styling as above).
- **Arizona**: unchanged — keep `INSURANCE_NOTICES["Arizona"]` + "Plan availability may vary by product. Please verify that your provider is in-network before booking."

`INSURANCE_NOTICES.Iowa` in `src/data/insurances.ts` becomes unused; leave it (harmless) unless the type-check flags it — no functional change either way.

This single edit updates both the homepage insurance section and /book, which share the component.

## Not changing
- Arizona notices (both homepage and /book), tiles, logos, pricing, styling, FAQ, meta descriptions, or any other page.

## Verification
- `npx tsgo --noEmit -p tsconfig.app.json` and `bun run build` pass.
- Playwright at desktop + mobile widths: all three spots show the new sentence with a tappable phone link; Arizona notices untouched; peach styling intact.
- The live site picks this up on the next publish.
