import { ArrowLeft, Github } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectPageProps {
  title: string;
  tagline: string;
  repoUrl: string;
}

const ProjectPage = ({ title, tagline, repoUrl }: ProjectPageProps) => {
  return (
    <div className="min-h-screen bg-background text-[0.93rem]">
      <div className="mx-auto max-w-3xl px-6 pt-12">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="space-y-4">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-muted-foreground/70">
            Project
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-base leading-relaxed text-muted-foreground">{tagline}</p>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 pb-24">
        <article className="rounded-3xl border border-border/60 bg-background/90 p-8 shadow-sm">
          <div className="space-y-8">
            <section className="space-y-4 rounded-3xl border border-border/60 bg-muted/5 p-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Project details will be added later
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This page is a placeholder for the project overview, roadmap, and highlights. Check back later for more details, screenshots, and progress notes.
              </p>
            </section>

            <section className="rounded-3xl border border-border/60 bg-background p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                In the meantime, you can explore the repository and watch this space for future updates.
              </p>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                <Github className="h-4 w-4" />
                View repository
              </a>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ProjectPage;
