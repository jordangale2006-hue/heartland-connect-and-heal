## Goal
Balance the left/right whitespace in the header without shrinking the logo or any nav text.

## What's happening now
- Logo: `h-36 sm:h-[30rem]` with `-my-28` (vertical overflow). Size is unchanged from before.
- Previously, `sm:-ml-20 lg:-ml-28` pulled the logo into the left whitespace, which made it feel larger.
- Removing that negative margin pushed the logo flush against the container's left padding, while the nav + CTA buttons stayed on the right — so the logo now feels cramped/"smaller" even though it's the same pixels.

## Plan
In `src/components/Header.tsx`:

1. Restore the logo's leftward offset so it visually occupies the same space as before:
   - `<Link>` gets back `sm:-ml-12 lg:-ml-20` (slightly less than the previous `-ml-28` so the right side isn't starved).
2. Add a matching rightward offset on the right-side cluster (phone + Patient Portal + Schedule Appointment) so both sides of whitespace are even:
   - The right `<div>` gets `sm:-mr-4 lg:-mr-8` (small negative right margin to mirror).
3. Keep the nav centered between them — no changes to the nav links or text sizes.

Net effect: logo stays the same size, nav text stays the same size, and the white gutters on the far left and far right of the header look symmetric.

## Files
- `src/components/Header.tsx` — adjust margins only on the logo `<Link>` and the right-side button group `<div>`.
