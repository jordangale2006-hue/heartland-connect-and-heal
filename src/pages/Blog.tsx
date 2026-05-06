import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Blog | Heartland Mental Health Services";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Mental health insights, education, and resources from the Heartland Mental Health Services team.");

    const load = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image_url, author, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-3">Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compassionate insights and resources to support your mental wellness journey.
        </p>
      </header>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          No posts yet. Please check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <Card className="h-full transition-shadow group-hover:shadow-lg">
                {post.cover_image_url && (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  {post.published_at && (
                    <CardDescription>
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {post.author ? ` · ${post.author}` : ""}
                    </CardDescription>
                  )}
                </CardHeader>
                {post.excerpt && (
                  <CardContent>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Blog;
