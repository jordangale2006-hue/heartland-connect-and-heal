import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import BlogArticleContent from "@/components/BlogArticleContent";
import { articleSchema, breadcrumbSchema, SITE_URL } from "@/lib/structured-data";

const BLOG_SEO_TITLES: Record<string, string> = {
  "is-telehealth-psychiatry-right-for-you": "Telehealth Psychiatry: Is Online Care Right for You?",
  "online-adhd-treatment-care": "Online ADHD Treatment in Arizona & Iowa",
  "anxiety-vs-depression-how-to-tell-the-difference": "Anxiety vs. Depression: Know the Difference",
};

const BLOG_SEO_DESCRIPTIONS: Record<string, string> = {
  "is-telehealth-psychiatry-right-for-you": "Learn how telehealth psychiatry works, who it may help, and what to expect from secure online mental health care in Arizona and Iowa.",
  "online-adhd-treatment-care": "Learn what to expect from online ADHD evaluation, medication management, and ongoing care for patients in Arizona and Iowa.",
  "anxiety-vs-depression-how-to-tell-the-difference": "Anxiety and depression can overlap. Learn common signs, key differences, and when to seek professional support in Arizona or Iowa.",
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
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!data) {
        setNotFound(true);
      } else {
        setPost(data as BlogPostData);
      }
      setLoading(false);
    };
    load();
  }, [slug]);

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

  if (notFound || !post) {
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
      </article>
    </main>
  );
};

export default BlogPost;
