import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
interface Book {
  title: string;
  author: string;
  color: string;
  textColor: string;
  href?: string;
}

const books: Book[] = [
  {
    title: "The Creative Act",
    author: "Rick Rubin",
    color: "hsl(0 0% 92%)",
    textColor: "hsl(0 0% 15%)",
  },
  {
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    color: "hsl(25 60% 45%)",
    textColor: "hsl(25 20% 95%)",
  },
  {
    title: "Fooled by Randomness",
    author: "Nassim Nicholas Taleb",
    color: "hsl(210 50% 35%)",
    textColor: "hsl(210 20% 90%)",
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    color: "hsl(45 80% 60%)",
    textColor: "hsl(45 30% 15%)",
  },
  {
    title: "1984",
    author: "George Orwell",
    color: "hsl(0 60% 42%)",
    textColor: "hsl(0 20% 95%)",
  },
];

const otherBooks = {
  uncategorized: [
    "A Thousand Splendid Suns",
    "One Indian Girl",
    "Half Girlfriend",
  ],
  "2023": [
    "Rich Dad Poor Dad",
    "The Psychology Of Money",
    "Think and Grow Rich (Irfan from Brilliant)",
    "The 48 Laws Of Power",
    "Atomic Habits (Irfan from Brilliant)",
    "Ikigai",
    "The Subtle Art Of Not Giving A Fuck",
    "The Diary Of A CEO",
  ],
  "2024": [
    "White Nights (My opinion)",
    "The Kite Runner",
    "And The Mountains Echoed",
  ],
  "2025": [
    "Greenlights",
    "If you could see the sun",
    "Shoe Dog (Lend to Aysha Shafeeque)",
    "Fooled by Randomness",
    "Mr Salary",
    "1984",
  ]
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const Books = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-foreground">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-10 border-b border-muted-foreground/20 bg-foreground/95 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-background"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="ml-auto">
            <h1 className="font-display text-lg font-semibold text-background">
              Bookshelf
            </h1>
            <p className="text-xs text-muted">Favourite reads</p>
          </div>
        </div>
      </motion.header>

      {/* Book Stack */}
      <main className="mx-auto max-w-3xl px-6 py-16">
        <motion.div
          className="flex flex-col items-center gap-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {books.map((book, index) => {
            const widthPercent = 100 - index * 2.5;
            return (
              <motion.div
                key={book.title}
                variants={item}
                className="w-full"
                style={{ maxWidth: `${widthPercent}%` }}
              >
                <BookSpine book={book} />
              </motion.div>
            );
          })}
        </motion.div>
      </main>

    <motion.p
        className="pb-10 text-center text-xs text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()}
      </motion.p>

      {/* Peeping Card */}
      <motion.div
        className="fixed right-0 top-1/2 z-40 -translate-y-1/2 cursor-pointer rounded-l-lg bg-background p-3 py-6 text-foreground shadow-2xl transition-all hover:pr-4 border border-r-0 border-border"
        onClick={() => setIsDrawerOpen(true)}
        initial={{ x: "100%" }}
        animate={{ x: isDrawerOpen ? "100%" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <p style={{ writingMode: "vertical-rl" }} className="rotate-180 text-sm font-medium tracking-widest opacity-80">
          List of other books that I have read
        </p>
      </motion.div>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sliding Drawer */}
      <motion.div
        className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto bg-background p-6 shadow-2xl border-l border-border"
        initial={{ x: "100%" }}
        animate={{ x: isDrawerOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <button 
          onClick={() => setIsDrawerOpen(false)} 
          className="mb-8 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="mr-2 h-4 w-4" /> Close
        </button>
        
        <h2 className="mb-6 font-display text-xl font-bold text-foreground">Other Books I've Read</h2>
        
        <div className="space-y-8">
          {/* Uncategorized */}
          <div className="space-y-3">
            {otherBooks.uncategorized.map(book => (
              <a 
                key={book} 
                href={`https://www.google.com/search?q=book+${encodeURIComponent(book)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-sm text-muted-foreground hover:text-primary hover:underline transition-colors leading-relaxed"
              >
                • {book}
              </a>
            ))}
          </div>
          
          {/* Yearly Categories */}
          {["2023", "2024", "2025"].map(year => (
            <div key={year} className="space-y-3">
              <h3 className="font-semibold text-lg border-b border-border pb-1 mb-3 text-foreground">{year}</h3>
              {otherBooks[year as keyof typeof otherBooks].map(book => (
                <a 
                  key={book} 
                  href={`https://www.google.com/search?q=book+${encodeURIComponent(book)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-sm text-muted-foreground hover:text-primary hover:underline transition-colors leading-relaxed"
                >
                  • {book}
                </a>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const BookSpine = ({ book }: { book: Book }) => {
  const inner = (
    <motion.div
      className="flex items-center justify-between rounded-sm px-6 py-5 shadow-md transition-shadow hover:shadow-lg"
      style={{ backgroundColor: book.color, color: book.textColor }}
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span className="text-sm font-medium opacity-80">{book.author}</span>
      <span className="font-display text-base font-semibold sm:text-lg">
        {book.title}
      </span>
    </motion.div>
  );

  if (book.href) {
    return (
      <a href={book.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return inner;
};

export default Books;
