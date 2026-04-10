import { motion } from "framer-motion";
import { ArrowLeft, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center border-t border-border/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-secondary"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Rocket className="h-10 w-10 text-foreground" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-foreground">Projects Coming Soon</h2>
            <p className="mt-4 text-muted-foreground text-base max-w-sm mx-auto leading-relaxed">
              I'm currently curating my latest works. <br/>Check back soon for the full showcase!
            </p>
          </motion.div>
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
