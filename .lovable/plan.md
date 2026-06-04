## Add Humana + Insurance Logos

### 1. Add Humana to the insurance list
Update `src/data/insurances.ts` — add `"Humana"` to `FEATURED_INSURANCES`. Because every component (`InsuranceChecker`, `InsuranceLogosStrip`, `InsurancesAccepted`, `QuickAppointmentForm`, `BookAppointment` sidebar) reads from this single source, Humana will automatically appear everywhere insurance is listed. No other code changes needed for the name itself.

### 2. Add insurance logos
Create a new shared component `src/components/InsuranceLogoGrid.tsx` that renders each insurance as a logo (with name as accessible fallback). Wire it into the 3 spots that currently show insurance names as text chips/bullets:

- `InsuranceLogosStrip.tsx` (homepage strip) — replace text pills with logo row
- `InsurancesAccepted.tsx` (full section) — replace 4-col text grid with logo grid
- `BookAppointment.tsx` sidebar list — replace bulleted text list with compact logo grid

The dropdowns in `InsuranceChecker` and `QuickAppointmentForm` stay as text (logos in a `<select>` don't render).

### 3. Logo sourcing — I need your input
I can't auto-download brand logos (trademark/licensing). Two options:

**Option A — You upload the logos** (recommended, cleanest):
You drag-and-drop the 9 logos into chat (PNG or SVG, transparent background ideal). I'll upload them to the CDN and wire them in. Logos needed:
Aetna, BlueCross BlueShield, Cigna, Humana, Medicare, UnitedHealthcare, Tricare, MultiPlan PHCS. (Cashpay stays as a text badge — no logo.)

**Option B — I generate stylized text "logo cards"**:
Branded-looking name plates (each insurance name styled in its brand color on a white card) instead of real logos. Legally safe, visually consistent, but not the real logos patients recognize.

**Option C — Hybrid**:
Use placeholder logo cards now so the layout ships, then swap in real logos when you upload them.

### Which logo option do you want?

After you pick, I'll switch to build mode and ship it in one pass.

### Technical notes
- New component uses semantic tokens (bg-card, border-border) for theming
- Logos use `loading="lazy"` and proper `alt` text for a11y/SEO
- `FEATURED_INSURANCES` becomes the single source of truth — add future insurances in one place
