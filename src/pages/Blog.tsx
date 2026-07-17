import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { PostIndex } from "../lib/markdown";

const Blog = () => {
  const [posts, setPosts] = useState<PostIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/blog/posts.json")
      .then((r) => {
        if (!r.ok) throw new Error("no index");
        return r.json();
      })
      .then((data) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl mb-6">Blog</h1>

      {loading ? (
        <p>Loading…</p>
      ) : posts.length === 0 ? (
        <div className="p-6 border border-border rounded-lg">
          <p className="mb-2">No posts found. Ensure <strong>/public/blog/posts.json</strong> exists and contains your post index.</p>
          <p className="text-sm text-muted-foreground">You can create posts via the admin panel; update the posts.json manifest after publishing.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.slug}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card-hover"
            >
              <div>
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="text-sm font-medium text-muted-foreground">READ</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
