import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const featuredProjects = [
  {
    title: "Terminal Music Player",
    description: "A retro-inspired music player driven by terminal-style controls.",
    to: "/terminal-music-player",
  },
  {
    title: "Fintrack",
    description: "A personal finance tracker built to help keep budgets clear and expenses organized.",
    to: "/fintrack",
  },
  {
    title: "Ternary Computing",
    description: "An experimental project exploring ternary logic and next-generation computing models.",
    to: "/ternary-computing",
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Back Button and Title */}
      <div className="mx-auto max-w-3xl px-6 pt-12 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        
        <div className="flex flex-col mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground">
            Portfolio
          </h1>
          <p className="mt-2 text-muted-foreground">Selected works and projects</p>
        </div>
      </div>

      <main className="flex-1 px-6">
        <div className="mx-auto max-w-3xl pb-24">
          <section className="space-y-8 border-t border-border/10 pt-12">
            <div className="space-y-4">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground/70">
                Featured Projects
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Current portfolio highlights
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Explore live project entries that connect to dedicated pages for each work.
              </p>
            </div>

            <motion.div
              className="grid gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              {featuredProjects.map((project) => (
                <Link
                  key={project.title}
                  to={project.to}
                  className="group block rounded-3xl border border-border/60 bg-background/80 p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/60 hover:bg-muted/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <span className="text-sm font-medium uppercase tracking-[0.32em] text-muted-foreground/70">
                      View
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </Link>
              ))}
            </motion.div>
          </section>
        </div>
      </main>

      <motion.p
        className="pb-10 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        © {new Date().getFullYear()}
      </motion.p>
    </div>
  );
};

export default Portfolio;
