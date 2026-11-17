import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  ["home", "Home"], ["projects", "Projects"], ["skills", "Skills"], ["services", "Services"],
  ["experience", "Journey"], ["testimonials", "Kind Words"], ["contact", "Contact"],
];

export default function Navbar({ solid = false }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolledRaw, setScrolled] = useState(false);
  const scrolled = scrolledRaw || solid;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, [solid]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-end px-3 sm:px-4">
      {/* bar — anchored to the right edge and slides in from the right */}
      <motion.nav
        initial={{ x: 240, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 0.84, 0.44, 1] }}
        className={`pointer-events-auto flex w-full items-center justify-between rounded-full px-5 py-3 transition-[background,box-shadow,border-color] duration-500 md:px-7 lg:w-[min(100%,62rem)] ${scrolled || open ? "glass" : "border border-white/30 bg-white/15 backdrop-blur-md"}`}>
        <a href="#home" className={`font-display text-xl font-bold tracking-tight ${scrolled || open ? "text-ink" : "text-white"}`}>
          Nida<span className="text-secondary">.</span>Sajjad
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition ${scrolled ? "text-gray-600 hover:text-primary" : "text-white/90 hover:text-white"}`}>
              {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-primary/15" />}
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle scrolled={scrolled || open} />
          <Magnetic><a href="#contact" className="hidden rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-bold text-white shadow-lg sm:block">Hire Me</a></Magnetic>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className={`flex h-10 w-10 items-center justify-center rounded-full text-2xl lg:hidden ${scrolled || open ? "text-ink" : "text-white"}`}>
            <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>{open ? "✕" : "☰"}</motion.span>
          </button>
        </div>
      </motion.nav>

      {/* mobile menu — separate rounded card under the bar (no more oval) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.97 }} transition={{ duration: 0.25 }}
            className="glass pointer-events-auto mt-2 w-full origin-top-right rounded-2xl p-3 lg:hidden">
            {links.map(([id, label], i) => (
              <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}
                className={`block rounded-xl px-4 py-2.5 font-medium text-ink transition hover:bg-primary/10 ${active === id ? "bg-primary/15 text-primary" : ""}`}>
                {label}
              </motion.a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-center font-bold text-white">Hire Me</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
