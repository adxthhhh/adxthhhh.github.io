import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Article {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  href?: string;
}

const articles: Article[] = [
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
  },
  {
    title: "My journey into creating dynamic animations",
    date: "January 14, 2025",
    readTime: "6 min read",
    excerpt: "Exploring the power of Framer Motion and other tools to bring life and interactivity to static web pages.",
    href: "#"
  },
  {
    title: "Understanding complex systems through simple models",
    date: "December 05, 2024",
    readTime: "7 min read",
    excerpt: "How reducing complex architectures to simple mental models can drastically improve problem-solving capabilities.",
    href: "#"
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
    <div className="min-h-screen bg-background">
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
            <p className="mt-2 text-muted-foreground">My thoughts and writings</p>
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
        <motion.div
          className="flex flex-col gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {articles.map((article, index) => (
            <motion.div
              key={index}
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
              <a href={article.href} className="inline-flex items-center gap-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {article.title}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </a>
              
              {/* Excerpt */}
              <p className="text-sm leading-relaxed text-muted-foreground/80 mt-1">
                {article.excerpt}
              </p>
            </motion.div>
          ))}
        </motion.div>
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

export default Articles;
