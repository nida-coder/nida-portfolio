import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useSpring } from "framer-motion";
import ProjectVisual from "./ProjectVisual.jsx";
import Magnetic from "./Magnetic.jsx";
import Footer from "./Footer.jsx";
import { projects } from "../data.js";

const all = [
  ...projects.inProgress.map((p) => ({ ...p, status: "progress" })),
  ...projects.completed.map((p) => ({ ...p, status: "done" })),
];

function Count({ to }) {
  const [v, setV] = useState(0);
  useEffect(() => { const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) }); return () => c.stop(); }, [to]);
  return <>{String(v).padStart(2, "0")}</>;
}

function LivePill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-300">
      <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span>
      LIVE
    </span>
  );
}

function Row({ p, i, onHover }) {
  return (
    <motion.a
      layout href={p.link} target="_blank" rel="noreferrer" data-hover
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -60 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: (i % 5) * 0.06 }}
      onMouseEnter={() => onHover(p)} onMouseLeave={() => onHover(null)}
      className="group relative grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 overflow-hidden border-b border-primary/20 px-3 py-8 sm:grid-cols-[auto_1fr_auto] sm:gap-x-8 md:px-6">
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary/15 via-secondary/10 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-700 group-hover:w-full" />

      <span className="relative font-mono text-sm text-primary md:text-base">{String(i + 1).padStart(2, "0")}</span>

      <div className="relative min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-3xl font-bold transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">{p.title}</h3>
          {p.status === "done" ? <LivePill /> : (
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3 py-1 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
              <i className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />IN PROGRESS
            </span>
          )}
        </div>
        <p className="mt-2 max-w-2xl text-gray-600 transition-transform duration-500 group-hover:translate-x-3">{p.long}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 transition-transform duration-500 group-hover:translate-x-3">
          {p.stack.map((t) => <span key={t} className="rounded-full border border-primary/30 bg-white/40 px-3 py-1 font-mono text-xs text-primary dark:bg-white/5">{t}</span>)}
          <span className="ml-1 font-mono text-xs text-gray-500">{p.year}</span>
        </div>
        {p.status === "progress" && (
          <div className="mt-4 flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-3">
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-primary/15">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-shimmer" />
            </div>
            <span className="font-mono text-xs text-gray-500">{p.progress}% built</span>
          </div>
        )}
      </div>

      <div className="relative col-span-2 flex items-center justify-between gap-5 sm:col-span-1 sm:justify-end">
        <div className="relative h-24 w-40 overflow-hidden rounded-xl shadow-lg lg:hidden"><ProjectVisual p={p} /></div>
        <span className="flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-bold text-primary transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-400/40">
          {p.status === "done" ? "Visit live" : "Follow build"}
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1">↗</span>
        </span>
      </div>
    </motion.a>
  );
}

const filters = [["all", "All"], ["done", "Live"], ["progress", "In progress"]];

export default function AllProjects() {
  const [filter, setFilter] = useState("all");
  const [hover, setHover] = useState(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 20 }), sy = useSpring(my, { stiffness: 160, damping: 20 });
  const list = filter === "all" ? all : all.filter((p) => p.status === filter);
  const nDone = all.filter((p) => p.status === "done").length;

  return (
    <div className="relative min-h-screen overflow-hidden pt-36" onMouseMove={(e) => { mx.set(e.clientX + 90); my.set(e.clientY - 100); }}>
      <div className="pointer-events-none absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-[40%] h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.a href="#projects" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="group mb-10 inline-flex items-center gap-2 font-mono text-sm text-primary">
          <span className="transition-transform duration-300 group-hover:-translate-x-1.5">←</span> back to portfolio
        </motion.a>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-mono text-sm tracking-widest text-primary">// the archive</motion.p>
        <h1 className="font-display text-6xl font-bold leading-[0.95] md:text-9xl">
          {"All".split("").map((c, k) => <motion.span key={k} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + k * 0.06, type: "spring", stiffness: 90 }} className="inline-block">{c}</motion.span>)}
          <br />
          <motion.span initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 90 }} className="gradient-text gradient-text-anim inline-block">Projects</motion.span>
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div className="flex gap-8 font-mono">
            {[["total", all.length], ["live", nDone], ["building", all.length - nDone]].map(([l, n]) => (
              <div key={l}><div className="font-display text-4xl font-bold gradient-text md:text-5xl"><Count to={n} /></div><div className="text-xs uppercase tracking-widest text-gray-500">{l}</div></div>
            ))}
          </div>
          <div className="glass flex gap-1 rounded-full p-1.5">
            {filters.map(([id, label]) => (
              <button key={id} onClick={() => setFilter(id)} className="relative rounded-full px-4 py-2 text-sm font-semibold transition">
                {filter === id && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary" />}
                <span className={`relative ${filter === id ? "text-white" : "text-gray-600"}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-primary/20">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <Row key={p.title} p={p} i={i} onHover={setHover} />)}
          </AnimatePresence>
        </div>

        <div className="mb-24 mt-20 text-center">
          <p className="mb-5 text-gray-600">Have an idea that deserves a spot on this list?</p>
          <Magnetic><a href="#contact" className="inline-block rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 font-bold text-white shadow-xl shadow-purple-300/50">Let's build it together →</a></Magnetic>
        </div>
      </div>

      {/* cursor-following preview (desktop) */}
      <AnimatePresence>
        {hover && (
          <motion.div key="preview" style={{ x: sx, y: sy }} initial={{ opacity: 0, scale: 0.6, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: -3 }} exit={{ opacity: 0, scale: 0.6 }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden h-48 w-72 overflow-hidden rounded-2xl border-2 border-white/70 shadow-2xl shadow-purple-900/40 lg:block">
            <ProjectVisual p={hover} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
