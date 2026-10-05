# Plan: “Anxiety vs. Depression: How to Tell the Difference”

## Goal
Publish one new October 2026 article alongside the two existing posts, with an original featured image, Arizona-and-Iowa framing, useful internal links, clear informational-only language, and a booking call to action.

## Confirmed current state
- The database contains exactly two published posts; neither has this title or topic.
- The live `/blog` page currently displays both existing posts and reads published records dynamically.
- The working condition pages are `/conditions/anxiety` and `/conditions/depression`; the new article will link there, as selected.
- Blog content is currently displayed as plain text. It does not yet support clickable links or a styled call-to-action inside an article.
- The article page already derives its meta title, meta description, canonical URL, social metadata, and Article structured data from each post.
- The sitemap is generated from published blog records during the site build.

## Implementation
1. **Write the article**
   - Create an original 800–1,000 word article in warm, plain language.
   - Cover: why the two are confused, what anxiety feels like, what depression feels like, overlap/co-occurrence, when to seek help, and a reassuring close.
   - Refer to Heartland as serving both Arizona and Iowa.
   - Avoid diagnosing the reader or giving individualized medical advice.
   - Include an “informational purposes only” disclaimer and calm crisis guidance where appropriate.
   - Use natural links to `/conditions/anxiety`, `/conditions/depression`, and `/book`.

2. **Support safe article formatting**
   - Add a small, constrained rich-content renderer for marked-up blog content: headings, paragraphs, simple lists, approved internal links, and the final `/book` call-to-action button.
   - Keep the two existing posts’ stored content unchanged and preserve their readable presentation.
   - CTA copy: “Not sure where you land? A first visit can help you sort it out”.

3. **Create the featured image**
   - Generate a warm, calming, text-free editorial image that visually matches the existing blog cards and Heartland’s palette.
   - Store it as a site asset with descriptive alternative text and a stable public URL.

4. **Publish the new record without duplicates**
   - Insert one published `blog_posts` record with a unique slug, the exact title and author, a two-sentence excerpt, the finished article, featured-image URL, and an October 2026 publication timestamp.
   - Use an idempotent check so the title/slug cannot be inserted twice.
   - Use the article title as the SEO title and the two-sentence excerpt as the SEO meta description through the existing metadata system.

5. **Publish and verify live**
   - Build successfully, then publish the updated site so the image, article formatting, and refreshed sitemap reach the custom domain.
   - Verify on `heartlandmhservices.com` that `/blog` shows all three posts with image, title, date, and excerpt.
   - Open the new live article and verify the full copy, internal links, booking button, image, SEO title/description, canonical, and Article data.
   - Confirm the new article URL is present in the live sitemap and that the two existing database records remain unchanged.

## Technical details
- Proposed slug: `/blog/anxiety-vs-depression-how-to-tell-the-difference`
- Proposed publish date: October 5, 2026
- No new database table or authentication changes.
- Any renderer change will be limited to blog article content; no other pages or existing post records will be edited.
