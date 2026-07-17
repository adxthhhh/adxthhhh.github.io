import matter from "gray-matter";

export type PostIndex = {
  title: string;
  date?: string;
  excerpt?: string;
  slug: string;
  cover?: string;
};

export function parseMarkdown(raw: string) {
  const parsed = matter(raw);
  return { data: parsed.data, content: parsed.content };
}
