import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { pgEssays } from "@/data/pg_essays";


interface Article {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  href?: string;
}

const myArticles: Article[] = [
  {
    title: "Building modern web applications in 2025",
    date: "March 15, 2025",
    readTime: "5 min read",
    excerpt: "An overview of the current landscape of web development, focusing on performance, aesthetics, and developer experience.",
    href: "#"
  },
  {
    title: "The art of minimalism in UI design",
    date: "February 28, 2025",
    readTime: "4 min read",
    excerpt: "Why less is often more when designing user interfaces. Embracing white space and focusing on what truly matters.",
    href: "#"
  }
];

const inspiredArticles: Article[] = [
  {
    title: "The Creative Act: A Way of Being",
    date: "January 14, 2025",
    readTime: "6 min read",
    excerpt: "Rick Rubin's timeless wisdom on creativity and the creative process, and how it translates to every aspect of life.",
    href: "https://www.google.com/search?q=The+Creative+Act+Rick+Rubin"
  },
  {
    title: "Steve Jobs' 2005 Stanford Commencement Address",
    date: "December 05, 2024",
    readTime: "15 min read",
    excerpt: "A profound reflection on life, death, and following your heart. One of the most inspired speeches of our time.",
    href: "https://www.youtube.com/watch?v=UF8uR6Z6KLc"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const Articles = () => {
  return (
    <div className="min-h-screen bg-background text-[0.8rem]">
      {/* Back Button and Title */}
      <div className="mx-auto max-w-3xl px-6 pt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        
        <div className="flex items-end justify-between mb-12">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground">
              Articles
            </h1>
            <p className="mt-2 text-muted-foreground">My thoughts and literature that shifted my perspective</p>
          </div>
          {/* Pale Sticky note decoration */}
          <div className="flex h-12 w-12 rotate-6 items-center justify-center rounded-sm bg-[#fefce8] shadow-sm border border-[#fef08a] relative mb-2">
            <div className="absolute top-0 h-1 w-full bg-[#fef08a]/40"></div>
            <span className="text-xl">📝</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-16">
          {/* Section: My Writings */}
          <section>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-8 border-b border-border/50 pb-2">
              My Writings
            </h2>
            <motion.div
              className="flex flex-col gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {myArticles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </motion.div>
          </section>

          {/* Section: Found Inspirations */}
          <section>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-8 border-b border-border/50 pb-2">
              Found Inspirations
            </h2>
            <motion.div
              className="flex flex-col gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {inspiredArticles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </motion.div>
          </section>

          {/* Section: Paul Graham Essays */}
          <section>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-8 border-b border-border/50 pb-2">
              Paul Graham Essays to Read
            </h2>
            <motion.div
              className="flex flex-col gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {pgEssays.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </motion.div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="pb-10 pt-16 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="mx-auto mb-4 h-[1px] w-16 bg-border/50"></div>
        <p>© {new Date().getFullYear()} Adith A J. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

const ArticleCard = ({ article }: { article: Article }) => (
  <motion.div
    variants={item}
    className="group relative flex flex-col gap-2 border-l-2 border-border/50 pl-6 transition-colors hover:border-primary/50"
  >
    {/* Date and Read Time */}
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <time>{article.date}</time>
      <span>•</span>
      <span>{article.readTime}</span>
    </div>
    
    {/* Title */}
    <a href={article.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
      {article.title}
      <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
    </a>
    
    {/* Excerpt */}
    <p className="text-sm leading-relaxed text-muted-foreground/80 mt-1">
      {article.excerpt}
    </p>
  </motion.div>
);
export default Articles;
