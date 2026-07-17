import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.join(process.cwd(), 'public', 'blog');
const outPath = path.join(blogDir, 'posts.json');

async function main() {
  try {
    const files = await readdir(blogDir);
    const posts = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      const raw = await readFile(path.join(blogDir, file), 'utf8');
      const parsed = matter(raw);
      const data = parsed.data || {};
      const firstTextLine = parsed.content.split(/\n/).find(l => l.trim().length > 0) || '';
      const excerpt = data.excerpt || (firstTextLine.length > 0 ? firstTextLine.slice(0, 200) : '');

      posts.push({
        title: data.title || slug,
        date: data.date || null,
        excerpt: excerpt,
        slug,
        cover: data.cover || null
      });
    }

    posts.sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return 0;
    });

    await writeFile(outPath, JSON.stringify(posts, null, 2) + '\n', 'utf8');
    console.log('Generated', outPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
