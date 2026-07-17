import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { parseMarkdown } from "../lib/markdown";

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/blog/${slug}.md`)
      .then((r) => r.text())
      .then((raw) => {
        const { data, content } = parseMarkdown(raw);
        setMeta(data);
        setContent(content);
      });
  }, [slug]);

  if (!slug) return null;

  return (
    <div className="container max-w-3xl py-12">
      <Link to="/blog" className="inline-block mb-4 text-sm text-muted-foreground">← Back to blog</Link>

      <article className="p-6 border border-border rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">{meta?.title}</h1>
        {meta?.date && <div className="text-sm text-muted-foreground mb-4">{new Date(meta.date).toDateString()}</div>}

        <div className="prose max-w-none">
          {content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          ) : (
            <p>Loading…</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
