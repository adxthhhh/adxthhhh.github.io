import { motion } from "framer-motion";
import { ArrowLeft, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// List of movies
const movies = [
  // Quentin Tarantino
  "Django Unchained", "Pulp Fiction", "Once Upon a Time... in Hollywood", "Reservoir Dogs", "Inglourious Basterds", "The Hateful Eight",
  // Stanley Kubrick
  "A Clockwork Orange", "The Shining", "Eyes Wide Shut", "Full Metal Jacket",
  // Jake Gyllenhaal
  "Nocturnal Animals", "Nightcrawler", "Southpaw", "Enemy", "Prisoners", "Donnie Darko", "Demolition", "Zodiac", "Love & Other Drugs",
  // Hollywood Dramas / Action / Sci-Fi / Misc
  "Dead Poets Society", "The Social Network", "The Breakfast Club", "8 Mile", "The Truman Show", 
  "Marley & Me", "The Founder", "Lady Macbeth", "Collateral", "Warrior", "The Edge of Seventeen", 
  "Goodfellas", "Taxi Driver", "Arrival", "Dune", "Dune: Part Two", 
  "The Usual Suspects", "Avatar", "Avatar: The Way of Water", 
  "The Big Short", "Whiplash", "Good Will Hunting", "Requiem For A Dream", 
  "The Station Agent", "Dumb Money", "Boiler Room", 
  "Tetris", "Sound of Metal", "True Detective", "The Talented Mr. Ripley", 
  "Raging Bull", "The Terminal", "The Reluctant Fundamentalist", "The Fighter", 
  "The Godfather", "Sinners", "Star Wars: Episode III - Revenge of the Sith", 
  "Casino Royale", "Skyfall", "Quantum of Solace", "Spectre", "No Time to Die", 
  "The Machinist", "The Prestige", "American Psycho", "Ford v Ferrari", "Tenet", 
  "Oppenheimer", "Memento", "Inception", "Interstellar", "The Dark Knight", 
  "Dunkirk", "Ocean's Eleven", "Fight Club", "Mr. & Mrs. Smith", "Se7en", "F1", 
  "Catch Me If You Can", "Shutter Island", "Drive", "Blade Runner 2049", "The Lincoln Lawyer",
  // Romance / Rom-Coms
  "Before Sunrise", "Me Before You", "Notting Hill", "The Rewrite",
  "The Theory of Everything", "The Fault in Our Stars", "Five Feet Apart", 
  "Atonement", "13 Going on 30", "How I Met Your Mother", "The Vow", 
  "Eternal Sunshine of the Spotless Mind", "Begin Again", "50 First Dates", 
  "Her", "Pretty Woman", "The Notebook", "Failure to Launch", "How to Lose a Guy in 10 Days",
  // Action/Horror/Comedy (Moved based on priority)
  "Don't Breathe", "Gran Turismo", "Tracers", "Ready or Not", "Bullet Train", 
  "You Don't Mess with the Zohan", "Riverdale", "Wrong Turn", "Wrong Turn 2", "Wrong Turn 3", "The Karate Kid",
  // Indian Cinema / Non-Hollywood
  "Kireedam", "Vikram", "Kaithi", "Vaaranam Aayiram", "Alaipayuthey", "Kabhi Khushi Kabhie Gham", 
  "Zindagi Na Milegi Dobara", "Gully Boy", "Farzi", "No Smoking", "Karthik Calling Karthik", "The Ship of Theseus"
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

// Component to fetch and display a single movie poster
const MovieCard = ({ title }: { title: string }) => {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We use OMDB free api to get the poster by title.
    // In a real application, consider using a backend or a private key!
    const fetchMovieData = async () => {
      try {
        let apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=8b0b451`;
        
        // Handling strict matches using IMDB IDs for tricky titles
        if (title.includes("Once Upon a Time")) {
          apiUrl = `https://www.omdbapi.com/?i=tt7131622&apikey=8b0b451`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.Poster && data.Poster !== "N/A") {
          setPosterUrl(data.Poster);
        } else {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieData();
  }, [title]);

  const letterboxdUrl = `https://letterboxd.com/search/${encodeURIComponent(title)}/`;

  return (
    <motion.a
      href={letterboxdUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{ scale: 1.15, y: -10, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex aspect-[2/3] w-full flex-col overflow-hidden rounded-xl bg-secondary hover:shadow-2xl shadow-md border border-border"
    >
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center animate-pulse bg-muted">
          <Film className="h-8 w-8 text-muted-foreground opacity-50" />
        </div>
      ) : hasError || !posterUrl ? (
        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center bg-card">
          <Film className="h-10 w-10 text-muted-foreground opacity-50 mb-3" />
          <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-tight">{title}</h3>
        </div>
      ) : (
        <img 
          src={posterUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      )}
      
      {/* Overlay with title that appears on hover */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="p-4">
          <p className="text-white font-bold text-sm leading-tight drop-shadow-md">
            {title}
          </p>
          <p className="text-white/70 text-xs mt-1 flex items-center">
            View on Letterboxd 
            <span className="ml-1 inline-block opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
              →
            </span>
          </p>
        </div>
      </div>
    </motion.a>
  );
};

const Movies = () => {
  return (
    <div className="min-h-screen bg-foreground pb-20">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-10 border-b border-muted-foreground/20 bg-foreground/95 backdrop-blur-sm shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-background"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="ml-auto">
            <h1 className="font-display text-lg font-semibold text-background">
              Watchlist
            </h1>
            <p className="text-xs text-muted text-right">Movies & Shows</p>
          </div>
        </div>
      </motion.header>

      {/* Movies Grid */}
      <main className="mx-auto max-w-[1200px] px-6 py-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-background tracking-tight mb-3">
            Cinematic Log
          </h2>
          <p className="text-muted leading-relaxed max-w-2xl">
            A matrix of all the films and shows I've watched. Posters are sourced from IMDB. Select any card to discover more on Letterboxd.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {movies.map((movie) => (
            <MovieCard key={movie} title={movie} />
          ))}
        </motion.div>
      </main>
      
      <motion.p
        className="pt-10 text-center text-xs text-muted/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} • Data from OMDB API
      </motion.p>
    </div>
  );
};

export default Movies;
