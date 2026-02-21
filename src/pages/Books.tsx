import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
  title: string;
  author: string;
  color: string;
  textColor: string;
  href?: string;
}

const books: Book[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    color: "hsl(45 80% 60%)",
    textColor: "hsl(45 30% 15%)",
    href: "https://jamesclear.com/atomic-habits",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    color: "hsl(210 50% 35%)",
    textColor: "hsl(210 20% 90%)",
    href: "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    color: "hsl(0 0% 25%)",
    textColor: "hsl(45 90% 65%)",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    color: "hsl(25 60% 45%)",
    textColor: "hsl(25 20% 95%)",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    color: "hsl(210 80% 50%)",
    textColor: "hsl(0 0% 98%)",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    color: "hsl(0 60% 42%)",
    textColor: "hsl(0 20% 95%)",
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    color: "hsl(150 30% 40%)",
    textColor: "hsl(150 10% 95%)",
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    color: "hsl(0 0% 92%)",
    textColor: "hsl(0 0% 15%)",
  },
  {
    title: "Creativity, Inc.",
    author: "Ed Catmull",
    color: "hsl(270 40% 45%)",
    textColor: "hsl(270 20% 92%)",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    color: "hsl(45 50% 85%)",
    textColor: "hsl(45 30% 20%)",
  },
];

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
