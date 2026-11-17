import { useState } from "react";
import { motion } from "framer-motion";
import Globe from "./Globe.jsx";
import { skills, categories } from "../data.js";

const sizeCls = { 1: "px-4 py-2 text-sm", 2: "px-5 py-2.5 text-base", 3: "px-7 py-3.5 text-lg" };
const catColor = Object.fromEntries(categories.map((c) => [c.id, c.color]));

function Lamp() {
  const beam = (side) => (
    <motion.div
      initial={{ opacity: 0.5, width: "15rem" }} whileInView={{ opacity: 1, width: "30rem" }}
      transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }} viewport={{ once: true }}
      style={{ backgroundImage: `conic-gradient(from ${side === "l" ? "70deg" : "290deg"} at center top, #d946ef, transparent, transparent)` }}
      className={`absolute inset-auto h-56 overflow-visible ${side === "l" ? "right-1/2" : "left-1/2"}`}
    >
      <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-night [mask-image:linear-gradient(to_top,white,transparent)]" />
      <div className={`absolute bottom-0 z-20 h-full w-40 bg-night ${side === "l" ? "left-0 [mask-image:linear-gradient(to_right,white,transparent)]" : "right-0 [mask-image:linear-gradient(to_left,white,transparent)]"}`} />
    </motion.div>
  );
  return (
    <div className="relative z-0 flex h-56 w-full scale-y-125 items-center justify-center isolate">
      {beam("l")}{beam("r")}
      <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-night blur-2xl" />
      <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
      <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-fuchsia-500 opacity-50 blur-3xl" />
      <motion.div initial={{ width: "8rem" }} whileInView={{ width: "16rem" }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }} className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-fuchsia-400 blur-2xl" />
      <motion.div initial={{ width: "15rem" }} whileInView={{ width: "30rem" }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }} className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-fuchsia-300" />
      <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-night" />
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("all");
  return (
    <section id="skills" className="relative z-0 px-3 py-16 md:px-6">
      <div className="relative isolate z-0 mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-[2.5rem] bg-night pt-4 ring-1 ring-white/10">
        <Lamp />
        <motion.h2 initial={{ opacity: 0.4, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="relative z-50 -mt-24 bg-gradient-to-br from-white to-purple-300 bg-clip-text px-4 py-4 text-center font-display text-5xl font-bold tracking-tight text-transparent md:text-7xl">
          Skills that <br className="sm:hidden" />light up ideas
        </motion.h2>
        <p className="relative z-50 mt-2 max-w-2xl px-6 text-center text-purple-200/70">Full-stack engineering, AI agent building, web development and UI/UX design — one toolkit, end to end.</p>

        <div className="relative z-50 mt-8 flex flex-wrap justify-center gap-2 px-4">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition ${active === c.id ? "border-transparent text-night" : "border-white/20 text-white/70 hover:border-white/50"}`}
              style={active === c.id ? { background: c.color } : {}}>{c.label}</button>
          ))}
        </div>

        <div className="relative z-50 mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3 px-5 md:gap-4">
          {skills.map((s, i) => {
            const on = active === "all" || active === s.cat;
            return (
              <motion.span key={s.label}
                initial={{ opacity: 0, scale: 0.4, y: 40 }} whileInView={{ opacity: on ? 1 : 0.18, scale: on ? 1 : 0.92, y: 0 }} viewport={{ once: true }}
                animate={on ? { y: [0, -6, 0] } : {}} transition={{ delay: (i % 12) * 0.05, type: "spring", stiffness: 120, y: { duration: 3 + (i % 5) * 0.6, repeat: Infinity, delay: i * 0.1 } }}
                whileHover={{ scale: 1.14, y: -8, boxShadow: `0 0 28px ${catColor[s.cat]}aa` }} data-hover
                className={`rounded-full border bg-white/5 font-semibold text-white backdrop-blur ${sizeCls[s.size]}`} style={{ borderColor: `${catColor[s.cat]}77` }}>
                <i className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: catColor[s.cat], boxShadow: `0 0 8px ${catColor[s.cat]}` }} />{s.label}
              </motion.span>
            );
          })}
        </div>

        {/* globe horizon — only the top arc of the sphere rises into view */}
        <div className="relative mt-4 h-[22rem] w-full overflow-hidden sm:h-[26rem]" style={{ "--w": "min(1000px, 150vw)" }}>
          <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[70%] -translate-x-1/2 rounded-full bg-fuchsia-600/30 blur-[100px]" />
          <div className="absolute left-1/2 -translate-x-1/2" style={{ width: "var(--w)", top: "calc(var(--w) * -0.075)" }}>
            <Globe />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-night to-transparent" />
        </div>
      </div>
    </section>
  );
}
