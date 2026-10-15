# Add “Do I Need Therapy, Medication, or Both?”

## Scope
Add one new blog post with a featured image, search metadata, and a booking button. Do not change the existing posts or the website’s design.

## Verified current setup
- The blog database contains three published posts; none has the new title or proposed slug.
- The blog listing loads published posts automatically.
- The article renderer supports section headings, links to the requested condition pages, and a booking button.
- The sitemap generator includes published blog posts.

## Article
- **Title:** Do I Need Therapy, Medication, or Both?
- **Slug:** `do-i-need-therapy-medication-or-both`
- **Publish date:** October 15, 2026.
- **Author:** Heartland Mental Health Services.
- **Excerpt:** “Wondering whether therapy, medication, or both might help is a very common place to start. Here’s a clear, jargon-free look at what each can offer and how a first visit can help you explore your options.”
- Write approximately 800–1,000 words with the requested introduction and sections: “What therapy does,” “What psychiatric medication does,” “When both together works best,” and “How we decide with you.”
- Explain coping skills, patterns, medication management, and the limits of each approach without recommending a treatment to the reader. Discuss combined care for anxiety, depression, ADHD, and PTSD as an individualized possibility—not a universal requirement or guaranteed outcome.
- Describe Heartland’s providers as **psychiatric mental health nurse practitioners (PMHNPs)** and the practice as **100% virtual, serving Arizona and Iowa**. Do not call providers psychiatrists or psychologists.
- Describe the first evaluation and shared decision-making warmly, with no pressure or one-size-fits-all plan.
- Include natural links to `/conditions/anxiety`, `/conditions/depression`, and `/book`.
- End with the exact booking button: **“Still unsure? A first visit is the best way to find out what's right for you”**, linking to `/book`.
- Include an informational-purposes-only disclaimer; no diagnoses, specific medication recommendations, or personal medical advice.

## Featured image and SEO
- Generate a warm, telehealth-focused editorial photo matching the existing blog imagery, without text, logos, or identifiable patient information.
- Store it through the website’s asset flow and use it for the new blog card and article.
- **SEO title:** `Therapy, Medication, or Both? | Arizona & Iowa`
- **SEO description:** `Explore therapy, psychiatric medication, and combined care with Heartland’s PMHNPs, serving Arizona and Iowa through personalized virtual visits.`
- Use the existing shared SEO setup for canonical URLs, social tags, Article markup, and breadcrumbs.

## Technical details
- Add only the new post’s SEO entries to the existing blog metadata maps; preserve existing entries.
- Insert one published database row with a slug/title duplicate guard. If a matching post appears before insertion, stop rather than overwrite or duplicate it.
- Keep the article in the database and reuse the existing renderer and listing.
- Regenerate the sitemap and publish the necessary website update so the image, metadata, and article presentation work on the public domain.

## Verification
- Confirm the new article’s word count, exact author, October date, two-sentence excerpt, working links, booking button, and disclaimer.
- Confirm the three original records remain unchanged and exactly one new record exists.
- Check the website’s build result.
- Open the public blog on `heartlandmhservices.com` and verify all four posts appear; open the new article and verify the image, full content, links, booking button, metadata, canonical URL, and sitemap entry.
- Report completion only after the public-site checks succeed; otherwise identify the remaining publishing blocker.