import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { services } from "../data.js";

const CELL = 52;

function RippleGrid() {
  const ref = useRef(null);
  const [dims, setDims] = useState({ rows: 8, cols: 20 });
  const [click, setClick] = useState(null);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setDims({ rows: Math.ceil(height / CELL), cols: Math.ceil(width / CELL) });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const cells = Array.from({ length: dims.rows * dims.cols }, (_, i) => i);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${dims.cols}, ${CELL}px)`, gridTemplateRows: `repeat(${dims.rows}, ${CELL}px)` }}>
        {cells.map((i) => {
          const r = Math.floor(i / dims.cols), c = i % dims.cols;
          const dist = click ? Math.hypot(click.r - r, click.c - c) : 0;
          return (
            <div key={`${i}-${click?.k ?? 0}`} onClick={() => setClick({ r, c, k: Date.now() })}
              className={`ripple-cell border border-violet-400/25 bg-violet-300/0 transition hover:bg-fuchsia-400/25 ${click ? "go" : ""}`}
              style={click ? { animationDelay: `${dist * 55}ms` } : undefined} />
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg)_85%)]" />
    </div>
  );
}

function SpotCard({ s, i }) {
  const x = useMotionValue(-300), y = useMotionValue(-300);
  const bg = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(217,70,239,.18), transparent 70%)`;
  const rx = useMotionValue(0), ry = useMotionValue(0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.08, duration: 0.7 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top); rx.set(((e.clientY - r.top) / r.height - 0.5) * -10); ry.set(((e.clientX - r.left) / r.width - 0.5) * 10); }}
      onMouseLeave={() => { x.set(-300); y.set(-300); rx.set(0); ry.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      className="glass group relative overflow-hidden rounded-3xl p-8 transition-shadow hover:shadow-2xl hover:shadow-purple-300/40" data-hover>
      <motion.div style={{ background: bg }} className="pointer-events-none absolute inset-0" />
      <motion.div whileHover={{ rotate: [0, -12, 12, 0], scale: 1.2 }} className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/20 text-3xl">{s.icon}</motion.div>
      <h3 className="mb-2 font-display text-xl font-bold">{s.title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{s.text}</p>
      <span className="mt-5 inline-block h-0.5 w-8 bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-24" />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-28">
      <RippleGrid />
      <div className="pointer-events-none relative z-10 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <p className="font-mono text-sm tracking-widest text-primary">// what I do</p>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-6xl">What I <span className="gradient-text gradient-text-anim">Excel At</span></h2>
          <p className="mt-3 font-mono text-xs text-gray-500">psst… click the grid behind these cards ✦</p>
        </motion.div>
        <div className="pointer-events-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <SpotCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
