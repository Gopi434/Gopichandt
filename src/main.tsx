import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// Always open on the intro: no scroll restoration on reload / back-forward.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
scrollTo(0, 0);
addEventListener("beforeunload", () => scrollTo(0, 0));
addEventListener("pageshow", (e) => { if (e.persisted) scrollTo(0, 0); });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Fetch the gallery code in the background once the page is idle.
const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500));
idle(() => import("./components/Gallery"));
