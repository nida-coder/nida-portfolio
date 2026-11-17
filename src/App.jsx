import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Cursor from "./components/Cursor.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import HeroParallax from "./components/HeroParallax.jsx";
import Skills from "./components/Skills.jsx";
import Services from "./components/Services.jsx";
import Journey from "./components/Journey.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import AllProjects from "./components/AllProjects.jsx";
import { unlockAudio } from "./audio.js";
import { ThemeProvider } from "./theme.jsx";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BARS = 6;

export default function App() {
  const [view, setView] = useState(() => (window.location.hash === "#all-projects" ? "all" : "home"));
  const [phase, setPhase] = useState("idle"); // idle | in | out  (page-transition curtain)
  const viewRef = useRef(view);
  viewRef.current = view;
  const busy = useRef(false);

  const go = async (to, anchor) => {
    if (busy.current) return;
    busy.current = true;
    setPhase("in");
    await sleep(850);
    setView(to);
    window.scrollTo({ top: 0, behavior: "instant" });
    await sleep(120);
    if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: "instant" });
    setPhase("out");
    await sleep(900);
    setPhase("idle");
    busy.current = false;
  };

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (h === "all-projects") { if (viewRef.current !== "all") go("all"); }
      else if (viewRef.current === "all") go("home", h || undefined);
    };
    window.addEventListener("hashchange", onHash);
    const u = () => unlockAudio();
    window.addEventListener("pointerdown", u, { once: true });
    window.addEventListener("keydown", u, { once: true });
    return () => { window.removeEventListener("hashchange", onHash); window.removeEventListener("pointerdown", u); window.removeEventListener("keydown", u); };
  }, []);

  return (
    <ThemeProvider>
      <Cursor />
      <ScrollProgress />
      <Navbar solid={view === "all"} />

      {view === "home" ? (
        <>
          <main>
            <Hero />
            <HeroParallax />
            <Skills />
            <Services />
            <Journey />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      ) : (
        <AllProjects />
      )}

      {/* page transition curtain */}
      <div className="pointer-events-none fixed inset-0 z-[300] flex">
        {Array.from({ length: BARS }).map((_, i) => (
          <motion.div key={i} className="h-full flex-1 bg-gradient-to-b from-primary via-fuchsia-600 to-secondary"
            style={{ originY: phase === "out" ? 0 : 1 }} animate={{ scaleY: phase === "in" ? 1 : 0 }}
            transition={{ duration: 0.55, delay: (phase === "out" ? BARS - 1 - i : i) * 0.06, ease: [0.76, 0, 0.24, 1] }} />
        ))}
      </div>
      <motion.div className="pointer-events-none fixed inset-0 z-[301] flex items-center justify-center font-display text-4xl font-bold text-white md:text-6xl"
        animate={{ opacity: phase === "in" ? 1 : 0, scale: phase === "in" ? 1 : 0.9 }} transition={{ duration: 0.4, delay: phase === "in" ? 0.4 : 0 }}>
        Nida<span className="text-fuchsia-200">.</span>Sajjad
      </motion.div>
    </ThemeProvider>
  );
}
