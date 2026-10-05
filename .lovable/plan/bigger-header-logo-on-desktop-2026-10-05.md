# Bigger header logo on desktop

## What you will see

On a wide screen (about 1400px and above) the Heartland logo in the header becomes roughly 1.9x larger — the head-mark and the "HEARTLAND MENTAL HEALTH SERVICES" wordmark about 216 x 80px instead of today's 116 x 43px — sitting neatly centred in the header bar with the menu links centred and the phone / Patient Portal / Schedule Appointment buttons on the right, none of them wrapping or colliding.

In the mobile and tablet views the logo keeps exactly the size it has today (about 170 x 63px).

## Why the logo is small today (measured in the browser)

- The logo file has a lot of empty space baked in: the visible artwork is only 630 x 233 of the 800 x 534 canvas, so most of the logo's box is invisible padding.
- The header row is completely full: the seven menu links (557px) plus the three buttons (496px) already need 1,053px, and the header's content width is capped at 1,088px. The logo only gets the leftover sliver — and it is squeezed by the browser down to 116px wide.
- Between roughly 768px and 1,050px wide — including this preview at 859px — the logo is squeezed to nothing and disappears entirely, while "All Services" wraps onto two lines and the buttons run past the right edge.

Because the row is already at capacity, a 1.9x logo only fits once the header uses more window width and the full menu is reserved for screens that can genuinely hold it.

## The plan

1. **Give the header its own, wider row.** The header stops using the site's 1,152px content cap and uses the available window width (up to 1,600px), with the same comfortable edge margins. Menu text, font sizes and button styling are untouched.
2. **Reserve the full horizontal menu for screens that fit it (1400px and up).** Below that, the header shows the logo plus the three-line menu button — the same links, Patient Portal and Schedule Appointment, in the drop-down panel. The phone number is added to that panel so it is never lost.
3. **Make the logo size fixed, not "whatever is left".** It is pinned to a set height and can no longer be squeezed by anything else: about 170 x 63px on phones, tablets and mid-size windows, about 216 x 80px on wide desktop screens.
4. **Remove the dead space from the logo image** so the size you ask for is the size you see. The header uses a trimmed copy; the footer logo is untouched and stays exactly as it looks now.
5. **Verify** at 390, 640, 859, 1024, 1280, 1400, 1600 and 1920px: logo artwork measured, no link ever wrapping onto two lines, nothing running off the right edge, footer logo unchanged, and the build passing.

## Technical details

- New asset `src/assets/logo-header.webp`: `logo.webp` cropped to its opaque bounding box (43,137)-(672,369) plus a 2px margin, i.e. about 634 x 237 (aspect 2.70). `logo.webp` itself is left unmodified, so `Footer.tsx` is unaffected.
- `src/components/Header.tsx`:
  - Row: `container-narrow` replaced with `mx-auto w-full max-w-[1600px] flex items-center justify-between h-20 sm:h-28 px-4 sm:px-6`; the `-ml-*` / `-mr-*` gutter hacks and the `-my-28` overflow hack on the logo are removed.
  - Logo: `src/assets/logo-header.webp`, `shrink-0 h-[63px] min-[1400px]:h-20 w-auto object-contain` with `width` / `height` matching the new file.
  - Nav, button cluster: `hidden min-[1400px]:flex ... shrink-0`; each link gets `whitespace-nowrap`. Hamburger and the drop-down panel switch from `md:hidden` to `min-[1400px]:hidden`.
  - Phone number row added to the drop-down panel.
- Side effects worth knowing about: on 640-767px the logo is no longer clipped by the bar, and on 768-1399px it is visible again instead of disappearing — both are consequences of the same fix.
- Checks: `tsgo --noEmit -p tsconfig.app.json`, then Playwright measurements and header screenshots at the widths listed above.
