import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "../data.js";
import ProjectVisual from "./ProjectVisual.jsx";
import Magnetic from "./Magnetic.jsx";

function Card({ p, status, translate }) {
  return (
    <motion.a href={p.link} target="_blank" rel="noreferrer" style={{ x: translate }} whileHover={{ y: -24 }} className="group/card relative block h-72 w-[26rem] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 sm:h-80 sm:w-[32rem]" data-hover>
      <ProjectVisual p={p} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition group-hover/card:opacity-100" />
      <div className="absolute bottom-4 left-5 right-5">
        <span className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${status === "progress" ? "bg-amber-300 text-amber-950" : "bg-emerald-300 text-emerald-950"}`}>
          <i className={`h-1.5 w-1.5 rounded-full ${status === "progress" ? "animate-pulse bg-amber-700" : "bg-emerald-700"}`} />{status === "progress" ? "In progress" : "Completed"}
        </span>
        <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
        <p className="text-sm text-white/75">{p.desc}</p>
      </div>
    </motion.a>
  );
}

function RowLabel({ n, title, text }) {
  return (
    <div className="mb-10 px-6 sm:px-12">
      <p className="font-mono text-sm tracking-widest text-fuchsia-400">// {n}</p>
      <h3 className="font-display text-3xl font-bold text-white sm:text-5xl">{title}</h3>
      <p className="mt-2 max-w-xl text-neutral-400">{text}</p>
    </div>
  );
}

export default function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const spring = { stiffness: 300, damping: 30, bounce: 100 };
  const tx = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), spring);
  const txr = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), spring);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [18, 0]), spring);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), spring);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [14, 0]), spring);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-500, 80]), spring);

  return (
    <section id="projects" ref={ref} className="relative flex h-[2080px] flex-col self-auto overflow-hidden bg-[#090614] py-32 antialiased [perspective:1000px] [transform-style:preserve-3d]">
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-[60%] h-96 w-96 rounded-full bg-secondary/20 blur-[120px]" />

      <div className="relative left-0 top-0 z-10 mx-auto w-full max-w-7xl px-6 py-16 md:py-28">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-4 font-mono text-sm tracking-widest text-fuchsia-400">// selected work</motion.p>
        <h2 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] text-white md:text-8xl">
          What I'm building <br /><span className="gradient-text gradient-text-anim">& what I've shipped</span>
        </h2>
        <p className="mt-8 max-w-2xl text-lg text-neutral-300 md:text-xl">
          A living lab of products — from AI-powered assistants to design systems. Scroll to explore the projects currently in development, followed by the work that is complete and live.
        </p>
        <Magnetic className="mt-8">
          <a href="#all-projects" className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-fuchsia-400 hover:bg-fuchsia-500/20">
            View all projects <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Magnetic>
      </div>

      <motion.div style={{ rotateZ, rotateX, translateY, opacity }}>
        <RowLabel n="01" title="In Progress" text="Currently being designed, built and refined. New features land every week." />
        <div className="mb-24 flex flex-row-reverse space-x-12 space-x-reverse">
          {projects.inProgress.map((p) => <Card key={p.title} p={p} status="progress" translate={tx} />)}
        </div>
        <RowLabel n="02" title="Completed" text="Shipped, tested and polished — projects that went the full distance." />
        <div className="flex flex-row space-x-12">
          {projects.completed.map((p) => <Card key={p.title} p={p} status="done" translate={txr} />)}
        </div>
      </motion.div>
      <div className="relative z-10 mt-16 flex justify-center">
        <Magnetic>
          <a href="#all-projects" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/40">
            See every project, line by line <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
