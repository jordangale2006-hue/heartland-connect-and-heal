# Plan: First Blog Post — "Telehealth Psychiatry: Is Online Care Right for You?"

## Goal
Publish the practice's first blog post in the `blog_posts` table so it appears on `/blog` and `/blog/<slug>`, with a cover image, warm empathetic tone (per brand), and author "Heartland Mental Health Services." The sitemap script auto-fetches published posts, so the new URL is picked up on the next dev/build cycle with no manual edit.

## Topic (confirmed)
"Telehealth Psychiatry: Is Online Care Right for You?" — directly addresses the 100% virtual model, overcomes objections, and drives bookings. Author: Heartland Mental Health Services (collective voice).

## Current state (verified)
- `blog_posts` table exists, is **empty** (no posts yet).
- RLS: published posts are readable by everyone (`published = true`, public role); admin-only write. Insert will use `run_sql` (service role bypasses RLS).
- No public storage bucket exists (only a private `resumes` bucket) — a cover image needs a public URL, so a new public bucket is required.
- `scripts/generate-sitemap.ts` fetches `slug,published_at` for published posts at build/dev time → new post is auto-included; no sitemap hand-edit needed.
- `BlogPost.tsx` renders `content` as plain text with `whitespace-pre-wrap` (paragraph breaks via blank lines, no markdown parser).

## Steps

### 1. Create a public storage bucket
- Create `blog-assets` as a **public** bucket via storage tooling.
- This holds cover images for all future blog posts (reusable).

### 2. Generate + upload the cover image
- Use imagegen to create a warm, calming cover image (e.g., a person on a relaxed video call from a sunlit home, soft orange/neutral palette matching the brand).
- Save locally, then upload to the `blog-assets` bucket.
- Capture the public URL: `https://rstknhbsfpnkzqpysjuw.supabase.co/storage/v1/object/public/blog-assets/<file>`.

### 3. Insert the blog post (run_sql)
Insert one row into `public.blog_posts`:
- `slug`: `is-telehealth-psychiatry-right-for-you`
- `title`: `Telehealth Psychiatry: Is Online Care Right for You?`
- `excerpt`: ~1–2 sentence summary for cards + meta description.
- `content`: ~800–1,000 word plain-text article (paragraphs separated by blank lines). Sections:
  - What telepsychiatry is (and isn't)
  - The benefits (comfort of home, no travel across Arizona, flexible scheduling, same evidence-based care)
  - Who it's a great fit for (adults & adolescents with anxiety, ADHD, depression, medication management)
  - What to expect at your first visit
  - When in-person care might make more sense (brief, honest)
  - Warm CTA → book an appointment
- `cover_image_url`: the public URL from step 2.
- `author`: `Heartland Mental Health Services`
- `published`: `true`
- `published_at`: `now()`
- `created_at` / `updated_at`: `now()`

### 4. Verify
- Read `blog_posts` to confirm the row exists and `published = true`.
- Open `/blog` in the preview: confirm the card appears with cover image, title, excerpt, date, and links to `/blog/is-telehealth-psychiatry-right-for-you`.
- Open the post page: confirm cover image, article body, and "Back to Blog" link render.
- Confirm the post's `<title>`, meta description, canonical, and Article JSON-LD are set (already handled by `BlogPost.tsx` + `SEO.tsx`).

## Notes / constraints honored
- Tone: warm, empathetic, reassuring (brand memory).
- HIPAA: no patient info; general education content only.
- No maps (virtual practice).
- No new code files — content lives in the database; the existing blog pages render it.
