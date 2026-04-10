import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Instagram, ExternalLink, BookOpen, Film } from "lucide-react";
import { Link } from "react-router-dom";
import profileImg from "@/assets/profile.jpg";

interface BentoCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  href?: string;
  to?: string;
  className?: string;
  iconColor?: string;
  bgColor?: string;
}

const BentoCard = ({ title, description, icon, href, to, className = "", iconColor, bgColor }: BentoCardProps) => {
  const content = (
    <>
      <div className="flex items-start justify-between">
        <div className={iconColor || "text-muted-foreground"}>
          {icon}
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-4">
        <h3 className={`font-display text-lg font-semibold ${iconColor || "text-foreground"}`}>
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </>
  );

  const sharedClass = `group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border p-6 shadow-sm transition-all hover:shadow-md ${bgColor || "bg-card"} ${className}`;

  if (to) {
    return (
      <Link to={to}>
        <motion.div
          className={sharedClass}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClass}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {content}
    </motion.a>
  );
};

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || "h-7 w-7 fill-current"} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const BentoGrid = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-secondary/50">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          className="mb-14 text-center relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sticky Note */}
          <Link to="/articles" className="absolute top-0 right-0 md:-right-8 lg:-right-24 xl:-right-32 hidden md:block z-10 transition-transform">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 6 }}
              initial={{ rotate: 3 }}
              className="w-32 h-32 md:w-36 md:h-36 bg-[#fefce8] shadow-md flex flex-col pt-6 px-4 rounded-br-3xl cursor-pointer border border-[#fef08a]"
              style={{
                backgroundImage: 'linear-gradient(transparent 90%, #fef08a 90%)',
                backgroundSize: '100% 1.5rem',
                boxShadow: '2px 4px 10px rgba(0,0,0,0.05)'
              }}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/60 shadow-sm backdrop-blur-sm -rotate-2" />
              <h3 className="font-display font-bold text-xl text-yellow-800/90 mt-1 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                Articles
              </h3>
              <p className="text-xs text-yellow-700/70 text-center mt-1 font-medium leading-relaxed">
                Read my <br/>latest thoughts
              </p>
            </motion.div>
          </Link>

          <div className="mx-auto mb-4 h-20 w-20 rounded-full overflow-hidden bg-secondary">
            <img src={profileImg} alt="Adith A J" className="h-full w-full object-cover" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            ADITH A J
          </h1>
          <p className="mt-2 text-muted-foreground text-sm">
            a kite dancing in a hurricane
          </p>
          
          {/* Social Icons Inline */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <a href="https://github.com/adxthhhh" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-githubc text-white shadow-sm transition-transform hover:scale-110 hover:shadow-md" aria-label="GitHub">
              <Github className="h-[1.375rem] w-[1.375rem]" strokeWidth={2.5} />
            </a>
            <a href="https://www.linkedin.com/in/adith-a-j-b623a0372/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-linkedin text-white shadow-sm transition-transform hover:scale-110 hover:shadow-md" aria-label="LinkedIn">
              <Linkedin className="h-[1.375rem] w-[1.375rem] fill-current" />
            </a>
            <a href="https://x.com/adxthhhh" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-xtwitter text-white shadow-sm transition-transform hover:scale-110 hover:shadow-md" aria-label="Twitter">
              <Twitter className="h-[1.375rem] w-[1.375rem] fill-current" />
            </a>
            <a href="https://www.instagram.com/adxthhhh/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white shadow-sm transition-transform hover:scale-110 hover:shadow-md" aria-label="Instagram">
              <Instagram className="h-[1.375rem] w-[1.375rem]" strokeWidth={2.25} />
            </a>
            <a href="https://open.spotify.com/user/31sh7m5titrta4j3nzfdyumdmrs4?si=c0d0d013d2f841b4" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-spotify text-white shadow-sm transition-transform hover:scale-110 hover:shadow-md" aria-label="Spotify">
              <SpotifyIcon className="h-[1.375rem] w-[1.375rem] fill-current" />
            </a>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >

          {/* Portfolio */}
          <motion.div variants={item} className="col-span-2 sm:col-span-2">
            <BentoCard
              title="Portfolio"
              icon={<ExternalLink className="h-7 w-7" />}
              to="/portfolio"
              iconColor="text-portfolioc"
              bgColor="bg-portfolioc-bg"
              className="h-full"
            />
          </motion.div>

          {/* Email - wide */}
          <motion.div variants={item} className="col-span-2 sm:col-span-2">
            <BentoCard
              title="Get in touch"
              description="adithaj2006@gmail.com"
              icon={<Mail className="h-7 w-7" />}
              href="mailto:adithaj2006@gmail.com"
              iconColor="text-emailc"
              bgColor="bg-emailc-bg"
              className="h-full"
            />
          </motion.div>

          {/* Books */}
          <motion.div variants={item} className="col-span-1 sm:col-span-2">
            <BentoCard
              title="Bookshelf"
              description="My favourite reads"
              icon={<BookOpen className="h-7 w-7" />}
              to="/books"
              iconColor="text-foreground"
              bgColor="bg-secondary"
              className="h-full"
            />
          </motion.div>

          {/* Movies */}
          <motion.div variants={item} className="col-span-1 sm:col-span-2">
            <BentoCard
              title="Watchlist"
              description="Movies & Shows"
              icon={<Film className="h-7 w-7" />}
              to="/movies"
              iconColor="text-foreground"
              bgColor="bg-secondary"
              className="h-full"
            />
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-8 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          © {new Date().getFullYear()}
        </motion.p>
      </div>
    </div>
  );
};

export default BentoGrid;
