
# SEO Boost Plan — Heartland Mental Health Services

Goal: help the site rank in Google for searches like *"online psychiatrist Arizona"*, *"telehealth ADHD treatment Phoenix"*, *"psychiatrist that takes Aetna Arizona"*, etc. — without ads.

---

## 1. Per-page titles & meta descriptions

Right now every page shares the title/description from `index.html`. Each page will get its own keyword-targeted version.

| Page | Title (≤60 chars) | Meta description (≤160 chars) |
|---|---|---|
| Home | Online Psychiatrist in Arizona \| Heartland Mental Health | Virtual psychiatry & medication management across Arizona. Aetna, BCBS, Cigna, Medicare, Tricare, UnitedHealthcare accepted. Book today. |
| About | About Heartland Mental Health \| Arizona Telehealth Psychiatry | Compassionate, board-certified providers offering virtual mental health care to patients across Phoenix, Tucson, Mesa, Scottsdale & all of AZ. |
| Services | Conditions We Treat \| Online Psychiatry in Arizona | ADHD, anxiety, depression, bipolar, PTSD, OCD & more — treated virtually by Arizona-licensed psychiatric providers. |
| Providers | Meet Our Providers \| Arizona Telehealth Psychiatrists | Board-certified psychiatric providers serving all of Arizona via secure telehealth. View bios, specialties & book online. |
| Book | Book a Virtual Appointment \| Heartland Mental Health AZ | Schedule a secure telehealth psychiatry visit in Arizona. Most insurance accepted. Same-week openings often available. |
| Contact | Contact Heartland Mental Health \| Arizona Telehealth | Reach our Arizona telehealth psychiatry team. Verify insurance, ask questions, or request a callback. |
| Careers | Careers at Heartland Mental Health \| Arizona Telehealth Jobs | Join a virtual psychiatric practice serving Arizona. View open clinical & support roles and apply online. |
| Blog | Mental Health Blog \| Heartland Mental Health Arizona | Articles on ADHD, anxiety, depression, medication management, and what to expect from telehealth psychiatry. |

Implementation: install `react-helmet-async` and add an `<SEO>` component that sets `<title>`, `<meta description>`, canonical, and Open Graph/Twitter tags per page.

## 2. Structured data (JSON-LD)

Injected once site-wide + per page where relevant:

- **`MedicalBusiness` / `Physician`** schema in the site root: business name, logo, URL, telephone, email, `areaServed: Arizona`, `availableService` list, accepted insurance list, opening hours (Mon–Sat).
- **`Service`** schema on the Services page for top conditions (ADHD, Anxiety, Depression, Bipolar, PTSD, Medication Management).
- **`FAQPage`** schema on Home/Contact for common questions (Do you take my insurance? Are visits virtual? What states do you serve?).
- **`BreadcrumbList`** on inner pages.
- **`Person`** schema for each provider on the Providers page.
- **`Article`** schema on each blog post.

## 3. Local SEO — Arizona cities

Naturally weave city names into copy and schema (no keyword stuffing):

- Cities: **Phoenix, Tucson, Mesa, Chandler, Scottsdale, Gilbert, Glendale, Tempe, Peoria, Flagstaff** (plus "and across Arizona").
- Add a small "Serving patients across Arizona" section on the Home and Contact pages listing the cities.
- Include the city list in `MedicalBusiness.areaServed`.
- Reminder: no map embed, no physical address shown — purely service-area language (per project memory).

## 4. Insurance-targeted content

Since insurance is a top search intent, the Home insurance section will get:
- An H2 like *"Arizona psychiatrist that accepts Aetna, BCBS, Cigna, Medicare, Tricare & UnitedHealthcare"*.
- A short FAQ: *"Do you take my insurance?"*, *"Do you offer cash pay?"*, *"Do you accept AHCCCS/Medicaid?"* — also wired to FAQ schema.

## 5. Headings & on-page copy tweaks

- Ensure each page has exactly one `<h1>` containing the primary keyword.
- Tighten H2/H3 wording on Home & Services to include searched phrases ("Online ADHD Treatment in Arizona", "Virtual Medication Management", "Telehealth Therapy for Anxiety & Depression").
- Audit and add descriptive **alt text** to every image (e.g. *"Arizona desert landscape representing calm telehealth psychiatry care"*).

## 6. Technical SEO

- Generate **`/sitemap.xml`** with all routes (Home, About, Services, Providers, Book, Contact, Careers, Blog, each blog post).
- Update **`robots.txt`** to reference the sitemap.
- Add **canonical** `<link>` tags via the SEO component.
- Set **Open Graph / Twitter** tags per page so links shared on Facebook/iMessage show the right title + image.
- Confirm `lang="en"`, viewport, and mobile-friendly basics (already good).

## 7. Blog topic starter list (for future posts)

Suggested first 8 posts targeting real searches:
1. What to expect from your first telehealth psychiatry visit in Arizona
2. Signs you may need ADHD treatment as an adult
3. Anxiety vs. panic disorder — how psychiatrists tell the difference
4. How online medication management works in Arizona
5. Does insurance cover telehealth psychiatry? (Aetna, BCBS, Cigna, Medicare)
6. Postpartum depression: when to seek help
7. Bipolar disorder treatment options in Arizona
8. Choosing between therapy, medication, or both

Posting cadence: 2 articles / month is plenty to start moving rankings within 3–6 months.

---

## Things you'll need to do outside the code (important!)

These have huge SEO impact but can't be done from Lovable:

1. **Google Search Console** — verify `heartlandmhservices.com`, submit the new `sitemap.xml`. Free.
2. **Google Business Profile** — claim/optimize listing as a *service-area business* (no street address shown), set service area to Arizona cities, add insurance list, hours, photos, request patient reviews.
3. **Bing Webmaster Tools** — same as above (small but free traffic).
4. **Citations / directories** — make sure Psychology Today, Zocdoc, Healthgrades, and AZ-focused directories all show consistent name / phone / website.

I'll mention these in chat after implementation so you have a checklist.

---

## Technical implementation summary

- Add dependency: `react-helmet-async`.
- Wrap app in `<HelmetProvider>` in `src/main.tsx`.
- New `src/components/SEO.tsx` component (props: title, description, canonical, image, jsonLd).
- New `src/lib/structured-data.ts` with reusable JSON-LD builders (`medicalBusiness`, `faqPage`, `service`, `breadcrumb`, `person`, `article`).
- Add `<SEO>` usage to: `Index.tsx`, `About.tsx`, `Services.tsx`, `BookAppointment.tsx`, `Contact.tsx`, `Careers.tsx`, `Blog.tsx`, `BlogPost.tsx`, `NotFound.tsx`.
- Add `public/sitemap.xml` + update `public/robots.txt` with `Sitemap:` line.
- Update `index.html` to keep only generic fallback meta (per-page tags will override at runtime; static crawlers also see the fallback).
- Audit `alt=""` and missing alt text across components and replace with descriptive AZ-flavored copy.
- Minor copy tweaks in `Index.tsx` hero, insurance section, and a new "Serving Arizona" strip.

No backend or database changes. No changes to booking, forms, or any business logic.
