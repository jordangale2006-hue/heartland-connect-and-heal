# Iowa launch announcement and homepage update

## Site-wide announcement
- Add an orange announcement bar above the header on every page.
- Center the supplied Iowa announcement, include a “Book now” link to `/book`, and add an accessible close icon.
- Keep dismissal temporary for the current page view only, so the bar returns after refresh.
- Keep the header navigation and mobile menu spacing intact when the bar is visible or dismissed.

## Homepage hero
- Add the small uppercase “NEW — NOW SERVING IOWA” pill above the existing H1, using a letter-spaced label and translucent white surface.
- Replace the hero subhead with the exact Arizona/Iowa licensing, Wellmark HMO, self-pay, and same-week availability copy.
- Update the existing “Mon–Sat appointments” item in the hero trust row to display Arizona and Iowa/Central hours without overcrowding the mobile layout.

## Iowa expansion section
- Insert a new section immediately below the hero, before the existing trust strip.
- Use a two-column desktop layout and stacked mobile layout headed “Heartland is now licensed in Iowa.”
- Present the supplied statewide access message, Wellmark HMO and self-pay details, Arizona/Iowa hours, referral note, and “Book an Iowa appointment” link to `/book`.
- Keep the language clear that care is virtual statewide and avoid implying there is an Iowa office.

## Insurance section
- Replace the current state dropdown in the homepage insurance section with two simultaneously visible, labeled columns: Arizona and Iowa.
- Keep all current Arizona plans in the Arizona column.
- Show only Wellmark Blue Cross Blue Shield of Iowa (HMO) and self-pay in the Iowa column.
- Preserve state-specific notices and the plan-verification disclaimer.
- Keep the compact booking-page version usable; if the two-column layout is too wide there, stack both labeled groups.

## Verification
- Check the announcement dismissal, booking links, and insurance labels across multiple pages.
- Verify the homepage at desktop and 393px mobile widths for readable text, stable spacing, and no overlap.
- Run the project build after implementation.

## Technical details
- Add a focused announcement component with local React state; no persistent browser storage is needed.
- Reuse the existing orange accent token, button/link patterns, insurance data, logo grid, and responsive utilities.
- Keep all changes presentation-only; no database or appointment-submission changes are required.
