# On-page SEO infrastructure for Heartland

## Goal
Improve crawlability and page relevance across the public site without changing the visual design or the meaning of the existing care content. All location language will describe a 100% virtual practice serving patients across Arizona and Iowa; no city will be presented as an office location.

## Plan

### 1. Normalize page metadata and canonical URLs
- Update the shared SEO helper so supplied titles remain under 60 characters instead of automatically gaining a long brand suffix.
- Add unique, keyword-focused titles and descriptions under the requested limits for every indexable route: home, booking, about, contact, crisis, careers, blog, all three published posts, privacy, HIPAA notice, services, conditions overview, and every condition detail page.
- Use self-referencing canonicals on `https://heartlandmhservices.com/<path>` consistently, removing the conflicting `www` host and duplicate static homepage canonical.
- Keep the unsubscribe utility out of search results rather than optimizing it as a public landing page.

### 2. Repair headings without redesigning pages
- Keep exactly one H1 on each indexable page.
- Refine existing H1 wording only where needed to include the page’s current primary topic and Arizona/Iowa virtual-care context; retain the existing styling and underlying meaning.
- Preserve the current section layout while correcting any heading-level gaps so H2s describe major sections logically.

### 3. Strengthen structured data
- Correct and reuse the `MedicalBusiness` schema with Heartland’s name, virtual-practice description, canonical URL, `+1-520-595-5709`, Arizona and Iowa as state-level service areas, and Psychiatry as the specialty.
- Include that business entity sitewide without duplicating conflicting organizations.
- Keep FAQ schema generated from the same visible FAQ data on the homepage and condition pages.
- Do not add quiz-result FAQ schema because the audited results currently contain no visible FAQs; marking up nonexistent answers would be misleading.
- Add `BreadcrumbList` to condition pages, blog articles, and other suitable interior pages, and retain Article schema for each post.

### 4. Complete social metadata using the Heartland brand
- Add route-specific Open Graph and Twitter title, description, URL, and type through the existing SEO layer.
- Use an absolute Heartland logo URL for the requested social image and remove the current Lovable screenshot and `@Lovable` attribution.
- Align the static fallback head with Arizona-and-Iowa virtual psychiatry so non-JavaScript social crawlers no longer receive Arizona-only wording.

### 5. Audit images and internal links
- Give every meaningful logo, provider, condition, and blog image descriptive alt text; keep decorative images appropriately empty if any are found.
- Remove any literal “SVG Image” fallback text found during the full asset/render audit.
- Generalize blog internal-link parsing so links can point to any real condition page, not only anxiety and depression.
- Add natural booking and related-condition links where a condition page or published article lacks them, without changing clinical claims or article meaning.

### 6. Synchronize sitemap and crawler controls
- Keep the existing generated sitemap mechanism and include every indexable static route, all condition routes, and every published blog post.
- Remove the unsubscribe utility from the sitemap and give it route-level `noindex` metadata.
- Preserve authoritative post publication dates as blog `lastmod` values; do not add build-date timestamps.
- Preserve `robots.txt` as allow-all with the canonical sitemap URL.

### 7. Validate before completion
- Check title and description character limits, one-H1-per-page rules, canonical/OG URL consistency, JSON-LD validity, alt text, internal links, sitemap entries, and robots directives.
- Run the project checks and inspect representative desktop/mobile pages without changing their visual layout.
- Verify the public site after publishing, including several condition pages and all three blog articles.

## Technical notes
- Keyword research supports “online psychiatrist Arizona” as a low-volume but relevant target (about 50 US searches/month); available evidence for the exact Iowa and ADHD phrases is weak, so metadata will use natural language rather than forced repetition.
- The current SPA can update metadata for search crawlers that execute JavaScript. Static social crawlers receive the sitewide fallback head, so their per-route previews may remain generic without server rendering; the implementation will still provide correct route metadata for browsers and JavaScript-capable crawlers.
