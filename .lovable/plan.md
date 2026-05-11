# Competitor Gap Build — Full Plan

You picked: build everything possible, static availability badges, generic safe cost ranges, all 10+ condition pages.

## What ships now (8 items)

### 1. Condition-specific landing pages (biggest SEO win)
Create dynamic route `/conditions/:slug` plus an index `/conditions`. One data file (`src/data/conditions.ts`) drives 12 SEO pages:

ADHD, Anxiety, Depression, Bipolar Disorder, PTSD, OCD, Insomnia, Substance Use, Postpartum Depression, Panic Disorder, Schizophrenia/Psychosis, Adolescent Mental Health.

Each page has: H1, symptoms list, treatment approach, "Which provider treats this", FAQ, JSON-LD `MedicalCondition` + `FAQPage` schema, unique meta title/description, internal links to providers + booking, CTA.

### 2. Provider cards with static availability + 1-click book
New `ProviderCard` component used on Home + About. Shows photo, name, credentials, specialties, **green "Typically books within 5–7 days" badge**, and a Book button that opens the existing appointment dialog. Two cards: Rebecca Nabosa, Gwendoline Besong.

### 3. Insurance carrier logo strip on homepage
Above-the-fold strip below hero: grayscale logos (Aetna, BCBS, Cigna, UHC, Medicare, AHCCCS, etc. — pulled from existing `insurances.ts`). Links to insurance checker.

### 4. Cost estimate strip (safe generic ranges)
New `CostEstimate` section on Home + Services:
- "Most insured patients pay **$0–$40** per visit"
- "Self-pay: initial eval **$250**, follow-up **$150**" (placeholder — confirm in chat or I'll mark TBD)
- Disclaimer: "Final cost depends on your specific plan. Verify with your insurer."

### 5. Trust strip (stats + credentials)
Compact bar: "16+ years experience · Board-certified PMHNP · HIPAA-compliant · Licensed in Arizona". Adds board-cert badge SVGs.

### 6. Crisis & safety resources
- Persistent footer line: "In crisis? Call or text **988**" (link `tel:988`)
- New `/crisis` page with 988, ER guidance, SAMHSA, veterans line, warmline
- Subtle banner at top of every condition page

### 7. PWA (installable, offline shell)
Add `vite-plugin-pwa` config, manifest, icons, service worker. Lighthouse PWA score, no UX change. Brand colors per design memory.

### 8. Patient education content scaffold
- Blog already exists. Seed **6 starter posts** (drafts in DB) targeting long-tail: "ADHD diagnosis as an adult in Arizona", "Does insurance cover online psychiatry?", "What to expect at your first telepsychiatry appointment", "SSRIs vs SNRIs", "Anxiety vs panic attacks", "Bipolar I vs II".
- Add `/blog` link to main nav if missing; add related-posts on each condition page.

## Flagged — need your input later (2 items)

- **Provider video intros** — I'll add a video slot on each provider card that's hidden until you upload MP4s. Send me the files and I'll wire them up.
- **Async messaging between visits** — Requires HIPAA BAA + OptiMantra integration. Not safe to build without your sign-off on the messaging vendor. I'll skip for now.

## Routing changes
```
/conditions              → index of all conditions
/conditions/:slug        → 12 SEO landing pages
/crisis                  → safety resources
```
Header nav adds "Conditions" dropdown linking to top 6 + "View all".

## Technical notes
- All pages use existing `<SEO>` component for meta/canonical/JSON-LD.
- Condition data lives in one file → easy to edit copy later.
- No backend schema changes. No new tables.
- Sitemap.xml updated to include new routes.
- Design tokens only (orange `#ee975a`, Lora/Source Sans 3) — no new colors.
- Mobile-first since 92% of traffic is mobile per your analytics.

## Out of scope
- Real-time OptiMantra availability sync (not API-accessible without contract).
- Mobile native app.
- Per-insurer copay table (using generic ranges per your answer).

## After implementation
You'll review, then I publish. Expected impact: more indexable surface area for condition keywords, lower bounce via clearer next-step CTAs, and PWA score boost.
