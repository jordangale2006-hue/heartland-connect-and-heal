// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { conditions } from "../src/data/conditions";

const BASE_URL = "https://heartlandmhservices.com";
const SUPABASE_URL = "https://rstknhbsfpnkzqpysjuw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdGtuaGJzZnBua3pxcHlzanV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTE2OTYsImV4cCI6MjA5MzUyNzY5Nn0.AifXkSV7_CcpeKwO7fEJz6WGnG6FWq456LZQl2qFXtA";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/book", changefreq: "monthly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/careers", changefreq: "monthly", priority: "0.5" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/crisis", changefreq: "monthly", priority: "0.6" },
  { path: "/conditions", changefreq: "monthly", priority: "0.9" },
  { path: "/unsubscribe", changefreq: "yearly", priority: "0.1" },
];

const conditionEntries: SitemapEntry[] = conditions.map((c) => ({
  path: `/conditions/${c.slug}`,
  changefreq: "monthly",
  priority: "0.8",
}));

async function fetchBlogEntries(): Promise<SitemapEntry[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,published_at&published=eq.true`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) {
      console.warn(`sitemap: blog fetch failed (${res.status})`);
      return [];
    }
    const rows = (await res.json()) as Array<{ slug: string; published_at?: string }>;
    return rows
      .filter((r) => r.slug)
      .map((r) => ({
        path: `/blog/${r.slug}`,
        lastmod: r.published_at?.slice(0, 10),
        changefreq: "monthly" as const,
        priority: "0.6",
      }));
  } catch (err) {
    console.warn("sitemap: blog fetch error", err);
    return [];
  }
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const blogEntries = await fetchBlogEntries();
const entries = [...staticEntries, ...conditionEntries, ...blogEntries];

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
