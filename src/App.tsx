import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import Portfolio from "./pages/Portfolio";
import Articles from "./pages/Articles";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vault-tome-42" element={<Books />} />
            <Route path="/vault-reel-16" element={<Movies />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/terminal-music-player"
              element={
                <ProjectPage
                  title="Terminal Music Player"
                  tagline="A retro-inspired music player driven by terminal-style controls."
                  repoUrl="https://github.com/adxthhhh/terminal-music-player"
                />
              }
            />
            <Route
              path="/fintrack"
              element={
                <ProjectPage
                  title="Fintrack"
                  tagline="A personal finance tracker built to help keep budgets clear and expenses organized."
                  repoUrl="https://github.com/adxthhhh/fintrack"
                />
              }
            />
            <Route
              path="/ternary-computing"
              element={
                <ProjectPage
                  title="Ternary Computing"
                  tagline="An experimental project exploring ternary logic and next-generation computing models."
                  repoUrl="https://github.com/adxthhhh/ternary-computing"
                />
              }
            />
            <Route path="/vault-memo-97" element={<Articles />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>
);

export default App;
