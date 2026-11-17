import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Terminal from "./Terminal.jsx";
import { timeline } from "../data.js";

export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
        <p className="font-mono text-sm tracking-widest text-primary">// timeline</p>
        <h2 className="mt-2 font-display text-4xl font-bold md:text-6xl">My <span className="gradient-text gradient-text-anim">Journey</span></h2>
      </motion.div>

      <div ref={ref} className="relative mb-32">
        <div className="absolute bottom-0 left-4 top-0 w-[3px] rounded bg-violet-200 md:left-1/2 md:-translate-x-1/2" />
        <motion.div style={{ scaleY: h }} className="absolute bottom-0 left-4 top-0 w-[3px] origin-top rounded bg-gradient-to-b from-primary to-secondary shadow-[0_0_20px_#d946ef] md:left-1/2 md:-translate-x-1/2" />
        <div className="space-y-16">
          {timeline.map((t, i) => {
            const left = i % 2 === 0;
            return (
              <div key={t.title} className="relative grid items-center md:grid-cols-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-120px" }} transition={{ type: "spring", delay: 0.2 }}
                  className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gradient-to-br from-primary to-secondary shadow-[0_0_0_6px_rgba(139,92,246,.2)] md:left-1/2" />
                <motion.div
                  initial={{ opacity: 0, x: left ? -80 : 80, rotateY: left ? 20 : -20 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ y: -6, scale: 1.02 }} data-hover
                  className={`glass ml-12 rounded-2xl p-6 md:ml-0 ${left ? "md:col-start-1 md:mr-12" : "md:col-start-2 md:ml-12"}`}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-primary">{t.when}</span>
                    <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{t.tag}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold">{t.title}</h3>
                  <p className="text-sm font-semibold text-secondary">{t.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.text}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <Terminal />
    </section>
  );
}
