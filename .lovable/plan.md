# Blog post #2 + desktop insurance card sizing

## 1. New blog post: "ADHD Treatment Online: Diagnosis, Medication, and Ongoing Care"
- Create a new published post with slug `online-adhd-treatment-care` following the same structure as the first post (cover image, headings, booking CTA).
- Content covers: what telehealth ADHD evaluation looks like, medication management (including a careful note about controlled-substance rules), ongoing follow-ups, and how online visits work in Arizona and Iowa.
- Add a hero/cover image; link internally to the ADHD condition/service page and the booking page.
- Keep the warm, reassuring tone and HIPAA-friendly language used across the site.

## 2. Desktop insurance cards: two per row, logo-only, larger
- On desktop, show insurance logo cards in a **two-per-row** grid (keep mobile stacking compact as-is).
- Logos stay image-only — no carrier names beneath (names remain in alt text for accessibility).
- Increase card and logo sizes so they look full and balanced rather than skinny, matching the current white rounded-card style.
- Applies to the top "In-Network Insurance" strip / insurance grid on desktop; verify no horizontal overflow and consistent card heights.

## Technical details
- Blog post data file/component follows the existing blog pattern from the first post; post set to published so it appears on `/blog`.
- Insurance layout changes in `src/components/InsuranceLogoGrid.tsx` (and related strip component if needed) — desktop-only classes via responsive Tailwind breakpoints.
- Regenerate/verify sitemap includes the new blog slug if sitemap generation is static.
- Verify with `bun run build` and a quick preview check of `/blog` and the insurance section on desktop.
