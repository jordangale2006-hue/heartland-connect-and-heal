# Bigger header logo + two new FAQs

## Part A — Bigger header logo (already approved, not yet built)

Carried over unchanged from the approved plan:
- Header row uses the window width (up to 1,600px) instead of the 1,152px content cap; gutter hacks removed.
- Full horizontal menu shows only at 1400px and up; below that, logo + three-line menu button (phone number added to the drop-down).
- Logo uses a trimmed copy (`src/assets/logo-header.webp`, cropped to its visible artwork) at a fixed height: about 170 x 63px below 1400px, about 216 x 80px at 1400px+. Menu links get `whitespace-nowrap`. Footer logo untouched.

## Part B — New FAQs and ADHD age wording

1. **Homepage FAQ** (`src/pages/Index.tsx`, `faqs` list) — add two entries at the end, wording exactly as given:
   - "Do you prescribe controlled substances such as ADHD stimulants?" with the supplied answer (stimulants via telehealth when clinically indicated, federal flexibilities through December 31, 2026, state rules may differ).
   - "What ages do you treat?" — "We provide care for patients ages 6 and older — children, adolescents, and adults. For patients under 18, a parent or guardian is typically involved in care."
   These also flow automatically into the homepage's search-engine FAQ data.
2. **/conditions/adhd FAQ** (`src/data/conditions.ts`) — add the controlled-substances question with the same answer. The existing "Can you prescribe ADHD medication via telehealth…" entry stays as is.
3. **ADHD age wording** on /conditions/adhd only:
   - Search description: "…medication management for adolescents and adults across Arizona and Iowa." becomes "…medication management for patients ages 6 and older across Arizona and Iowa."
   - Small heading above the title: "Adult & Adolescent ADHD" becomes "ADHD Care for Ages 6+".
   Other pages that mention "adolescents and adults" (Conditions overview, About bio) are left alone, per "don't change anything else" — say the word if you want those aligned too.
4. Accordion styling and tone untouched.

## Verify
- Type check and build pass.
- Playwright: homepage FAQ shows both new questions and expands them; /conditions/adhd shows the new FAQ and the "ages 6 and older" wording; header measurements at 390, 859, 1280, 1400, 1920px per Part A.
- Add both tasks to roadmap.md and tick them off.
