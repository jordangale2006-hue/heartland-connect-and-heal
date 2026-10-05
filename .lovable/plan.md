# /book insurance section + honest AI voice widget wording

## Summary

Two changes on heartlandmhservices.com:

1. Move the "Insurances we accept" block on `/book` out of the narrow sidebar into a full-width section under the booking form, Arizona first then Iowa, with each state's notice printed directly under its own tiles.
2. Relabel the floating bottom-right assistant so patients know it is an AI voice assistant and not a call to the office.

## 1. Insurance section on /book

- `src/pages/BookAppointment.tsx`: remove `<InsurancesAccepted variant="card" />` from the right sidebar and render the full-width version (`variant="section"`) as its own section after the booking grid. The sidebar keeps "Prefer to Call?" and "What to Expect"; nothing new is added there.
- `src/components/InsurancesAccepted.tsx`: render each state's notice directly below that state's tiles instead of one combined box, and keep Arizona rendered before Iowa.
- Both tile lists and both notices continue to come from `INSURANCES_BY_STATE` and `INSURANCE_NOTICES` in `src/data/insurances.ts`, so this page and the homepage cannot drift apart. No edits to that data file are needed — the lists are already correct.
- Arizona tiles: Aetna, Blue Cross Blue Shield, Cigna, Curative, Humana, Medicare, Tricare, UnitedHealthcare, MultiPlan PHCS, Cashpay. Notice under them: "We do not accept Arizona AHCCCS/Medicaid plans. Plan availability may vary by product. Please verify that your provider is in-network before booking."
- Iowa tiles: Wellmark Blue Cross Blue Shield of Iowa, Medicare, Aetna, Cigna, Cashpay. Notice under them: "In Iowa, we currently accept Wellmark Blue Cross Blue Shield of Iowa, Medicare, Aetna, Cigna, and cash pay. Plan availability may vary by product. Please verify that your provider is in-network before booking."
- Tile style is the shared logo-card grid already used on the homepage, so the two pages match.

Side effect to be aware of: the homepage uses the same component, so its insurance block will also switch from one combined notice box to one notice under each state's tiles. The wording is identical — only the placement changes.

## 2. AI voice widget wording

- `index.html`: the current widget build ignores `action-text`, `start-call-text`, `end-call-text`, `listening-text` and `speaking-text`, which is why the card still says "Need help?" / "Start a call". Replace those with the one attribute the widget does read, `text-contents`, carrying the new wording:
  - Title: "Questions? Chat with our AI assistant"
  - Button: "Start AI voice chat"
  - End button: "End AI voice chat"
  I tested this exact attribute against the running widget and the new labels rendered.
- Add the disclaimer line as a small, muted, right-aligned caption floating just above the assistant card: "Automated assistant — not a call to our office. If you're in crisis, call or text 988." with 988 tappable (`tel:988`), matching how the crisis banner at the top of the page already handles it.
- The caption cannot sit beneath the button: that space is occupied by the assistant's own "Powered by" label, and a caption there was clipped by the card. Above the card was tested at desktop and phone widths — legible, with clear space from the card, the orange button, and the mobile "Request Appointment" bar.
- Position (bottom-right), colors, orb gradient, and lazy-loading stay as they are.

## Verification

- Type check and production build (`tsgo --noEmit -p tsconfig.app.json`, `bun run build`).
- Automated browser pass on `/book`: full-width insurance section below the form, Arizona tiles first, each notice under its own state's tiles, no "coming soon" or HMO-only wording anywhere; widget showing the new title, button and disclaimer at desktop and mobile widths; homepage block still reads correctly.
- Publish so the live site and the custom domain pick up both changes — I'll ask before publishing.

## Technical notes

- Files touched: `src/pages/BookAppointment.tsx`, `src/components/InsurancesAccepted.tsx`, `index.html`.
- No database, routing, pricing, or content changes beyond the above.
- The insurance data file (`src/data/insurances.ts`) is already the single source of truth for both states and needs no changes.
