import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Forcefully strip out any legacy dark mode classes stuck in the DOM
document.documentElement.classList.remove("dark");
document.documentElement.style.colorScheme = "light";

createRoot(document.getElementById("root")!).render(<App />);
