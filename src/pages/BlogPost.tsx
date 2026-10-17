import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import BlogArticleContent from "@/components/BlogArticleContent";
import { articleSchema, breadcrumbSchema, SITE_URL } from "@/lib/structured-data";

const BLOG_SEO_TITLES: Record<string, string> = {
  "do-i-need-therapy-medication-or-both": "Therapy, Medication, or Both? | Arizona & Iowa",
  "is-telehealth-psychiatry-right-for-you": "Telehealth Psychiatry: Is Online Care Right for You?",
  "online-adhd-treatment-care": "Online ADHD Treatment in Arizona & Iowa",
  "anxiety-vs-depression-how-to-tell-the-difference": "Anxiety vs. Depression: Know the Difference",
};

const BLOG_SEO_DESCRIPTIONS: Record<string, string> = {
  "do-i-need-therapy-medication-or-both": "Explore therapy, psychiatric medication, and combined care with Heartland’s PMHNPs, serving Arizona and Iowa through personalized virtual visits.",
  "is-telehealth-psychiatry-right-for-you": "Learn how telehealth psychiatry works, who it may help, and what to expect from secure online mental health care in Arizona and Iowa.",
  "online-adhd-treatment-care": "Learn what to expect from online ADHD evaluation, medication management, and ongoing care for patients in Arizona and Iowa.",
  "anxiety-vs-depression-how-to-tell-the-difference": "Anxiety and depression can overlap. Learn common signs, key differences, and when to seek professional support in Arizona or Iowa.",
};

const BLOG_RELATED_LINKS: Record<string, { label: string; path: string }[]> = {
  "is-telehealth-psychiatry-right-for-you": [
    { label: "Explore online anxiety treatment", path: "/conditions/anxiety" },
    { label: "Explore online depression treatment", path: "/conditions/depression" },
    { label: "Request a first visit", path: "/book" },
  ],
  "online-adhd-treatment-care": [
    { label: "Learn about online ADHD treatment", path: "/conditions/adhd" },
    { label: "Explore anxiety treatment", path: "/conditions/anxiety" },
    { label: "Book an ADHD evaluation", path: "/book" },
  ],
};

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isPending: loading, isError, refetch } = useQuery({
    queryKey: ["blog-post", slug],
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) {
        console.error("Failed to load blog post", error);
        throw error;
      }
      return (data as BlogPostData | null) ?? null;
    },
  });

  if (loading) {
    return (
      <main className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-3xl mb-4">Couldn't load this post</h1>
        <p className="text-muted-foreground mb-6">Please check your connection and try again.</p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="warmCta" onClick={() => refetch()}>Try again</Button>
          <Button asChild variant="outlineWarm">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-3xl mb-4">Post not found</h1>
        <Button asChild variant="outlineWarm">
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <SEO
        title={BLOG_SEO_TITLES[post.slug] ?? post.title.slice(0, 59)}
        description={BLOG_SEO_DESCRIPTIONS[post.slug] ?? post.excerpt ?? `${post.title} — Heartland Mental Health Services blog.`}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={[
          articleSchema({
            title: post.title,
            description: post.excerpt || undefined,
            image: post.cover_image_url || undefined,
            author: post.author || undefined,
            datePublished: post.published_at || undefined,
            url: `${SITE_URL}/blog/${post.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
          ]),
        ]}
      />
      <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blog
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">{post.title}</h1>
          {post.published_at && (
            <p className="text-muted-foreground">
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {post.author ? ` · ${post.author}` : ""}
            </p>
          )}
        </header>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={`Featured image for ${post.title}`}
            width={1536}
            height={864}
            className="w-full rounded-lg mb-8 object-cover max-h-96"
          />
        )}

        <BlogArticleContent content={post.content} />
        {BLOG_RELATED_LINKS[post.slug] && (
          <aside className="mt-10 border-t border-border pt-6" aria-label="Related mental health resources">
            <h2 className="font-serif text-2xl text-foreground mb-3">Continue exploring</h2>
            <ul className="space-y-2">
              {BLOG_RELATED_LINKS[post.slug].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </main>
  );
};

export default BlogPost;
