import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
        document.title = `${data.title} | Heartland Mental Health Services`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta && data.excerpt) meta.setAttribute("content", data.excerpt);
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
            alt={post.title}
            className="w-full rounded-lg mb-8 object-cover max-h-96"
          />
        )}

        <div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
