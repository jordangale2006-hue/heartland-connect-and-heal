import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BlogArticleContentProps {
  content: string;
}

const INTERNAL_LINK_PATTERN = /\[([^\]]+)\]\((\/(?:conditions\/(?:anxiety|depression)|book))\)/g;

const renderInlineLinks = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INTERNAL_LINK_PATTERN)) {
    const index = match.index ?? 0;
    const label = match[1];
    const path = match[2];

    if (index > cursor) nodes.push(text.slice(cursor, index));
    nodes.push(
      <Link key={`${path}-${index}`} to={path} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
        {label}
      </Link>,
    );
    cursor = index + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
};

const BlogArticleContent = ({ content }: BlogArticleContentProps) => {
  const blocks = content.trim().split(/\n\s*\n/);

  return (
    <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="font-serif text-2xl sm:text-3xl text-foreground mt-10 mb-4">
              {trimmed.slice(3)}
            </h2>
          );
        }

        if (trimmed.startsWith("[[CTA|") && trimmed.endsWith("]]")) {
          const [label, path] = trimmed.slice(6, -2).split("|");
          if (label && path === "/book") {
            return (
              <div key={index} className="not-prose my-10 text-center">
                <Button asChild variant="warmCta" size="lg" className="h-auto max-w-full whitespace-normal py-3 text-center">
                  <Link to={path}>{label}</Link>
                </Button>
              </div>
            );
          }
        }

        const lines = trimmed.split("\n");
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="my-5 space-y-2">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{renderInlineLinks(line.slice(2))}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{renderInlineLinks(trimmed)}</p>;
      })}
    </div>
  );
};

export default BlogArticleContent;