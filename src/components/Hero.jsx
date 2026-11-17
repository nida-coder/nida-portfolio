import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CloudShader from "./CloudShader.jsx";
import Magnetic from "./Magnetic.jsx";
import { profile } from "../data.js";
import Socials from "./Socials.jsx";
import photo from "../assets/profile.jpg";
import cvUrl from "../assets/Nida_Sajjad_CV.pdf";
import { useTheme } from "../theme.jsx";

const STARS = Array.from({ length: 70 }, (_, i) => ({ x: (i * 37.7) % 100, y: (i * 53.3) % 78, s: 1 + (i % 3), d: (i % 9) * 0.5, t: 2 + (i % 5) }));

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) { setText(w.slice(0, text.length + 1)); if (text.length + 1 === w.length) setTimeout(() => setDel(true), 1400); }
      else { setText(w.slice(0, text.length - 1)); if (text.length - 1 === 0) { setDel(false); setI(i + 1); } }
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

const chips = [
  { t: "React", x: "-12%", y: "8%", d: 0 }, { t: "Python", x: "88%", y: "2%", d: 0.6 },
  { t: "AI Agents", x: "92%", y: "62%", d: 1.2 }, { t: "Figma", x: "-14%", y: "70%", d: 1.8 },
  { t: "Django", x: "40%", y: "-12%", d: 2.4 }, { t: "UI/UX", x: "46%", y: "104%", d: 3 },
];

export default function Hero() {
  const { dark } = useTheme();
  const word = useTypewriter(profile.roles);
  // Normal site: the <a download> works natively. Inside the claude.ai artifact viewer, direct downloads are blocked,
  // so the file is handed to the viewer's "downloads" capability instead.
  const onCv = async (e) => {
    if (!window.claude?.use) return;
    e.preventDefault();
    try {
      const d = await window.claude.use("downloads");
      if (!d) return;
      const data = cvUrl.startsWith("data:") ? Uint8Array.from(atob(cvUrl.split(",")[1]), (ch) => ch.charCodeAt(0)) : await (await fetch(cvUrl)).blob();
      await d.save({ filename: "Nida_Sajjad_CV.pdf", data });
    } catch (_) {}
  };
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-16, 16]);
  const rotX = useTransform(sy, [-1, 1], [14, -14]);
  const chipX = useTransform(sx, [-1, 1], [-18, 18]);
  const chipY = useTransform(sy, [-1, 1], [-14, 14]);
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        {dark
          ? <CloudShader speed={0.8} count={5} cloudColor="#c4a8ff" skyTopColor="#05011a" skyBottomColor="#4a1d96" />
          : <CloudShader speed={1} count={6} />}
      </div>
      {dark && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {STARS.map((st, i) => (
            <i key={i} className="absolute rounded-full bg-white" style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animation: `twinkle ${st.t}s ease-in-out ${st.d}s infinite` }} />
          ))}
          {[0, 1, 2].map((k) => (
            <i key={k} className="absolute h-px w-24 bg-gradient-to-r from-white to-transparent" style={{ left: `${60 + k * 14}%`, top: `${8 + k * 9}%`, animation: `shoot 3.2s ease-in ${k * 4.5 + 1}s infinite`, opacity: 0 }} />
          ))}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-lightBg" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-32 md:px-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 font-mono text-sm text-white backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Open to work · freelance · QA roles
          </motion.p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(60,20,140,.35)] sm:text-6xl md:text-7xl">
            {"Hi, I'm".split("").map((c, k) => (
              <motion.span key={k} initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.3 + k * 0.04 }} className="inline-block">{c === " " ? "\u00A0" : c}</motion.span>
            ))}
            <br />
            <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }} className="inline-block bg-gradient-to-r from-white via-fuchsia-100 to-white bg-clip-text text-transparent">
              Nida Sajjad
            </motion.span>
          </h1>
          <p className="mt-6 h-10 font-display text-2xl font-semibold text-white/95 md:text-3xl">
            {word}<span className="ml-1 inline-block h-7 w-[3px] translate-y-1 animate-blink bg-white" />
          </p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            I engineer intelligent, beautifully crafted software — from AI agents and scalable back-ends to pixel-perfect interfaces — and test it like a user who refuses to settle.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="mt-10 flex flex-wrap gap-4">
            <Magnetic><a href="#projects" className="block rounded-full bg-white px-8 py-4 font-bold text-primary shadow-xl shadow-purple-900/20 transition hover:shadow-2xl">View My Work</a></Magnetic>
            <Magnetic><a href={cvUrl} download="Nida_Sajjad_CV.pdf" onClick={onCv} className="block rounded-full border-2 border-white/70 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur transition hover:bg-white hover:text-primary">Download CV</a></Magnetic>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-8 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">find me</span>
            <Socials />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 80 }} className="flex justify-center">
          <div className="relative h-[300px] w-[300px] sm:h-[360px] sm:w-[360px]" style={{ perspective: 1000 }}>
            <div className="absolute -inset-8 animate-spin-slow rounded-[3rem] border border-dashed border-white/60" />
            <div className="absolute -inset-16 animate-spin-slow rounded-full border border-white/20 [animation-direction:reverse]" />
            <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative h-full w-full rounded-[2rem] bg-gradient-to-br from-white via-fuchsia-300 to-primary p-[5px] shadow-[0_30px_80px_rgba(80,30,160,.45)] [transform-style:preserve-3d]">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-violet-200 to-fuchsia-200">
                <img src={photo} alt="Nida Sajjad" className="h-full w-full object-cover object-top" />
              </div>
            </motion.div>
            {chips.map((c) => (
              <motion.span key={c.t} style={{ left: c.x, top: c.y, x: chipX, y: chipY }}
                animate={{ translateY: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: c.d, ease: "easeInOut" }}
                className="absolute rounded-full border border-white/50 bg-white/80 px-4 py-1.5 text-sm font-semibold text-primary shadow-lg backdrop-blur">
                {c.t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a href="#projects" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs font-mono uppercase tracking-widest text-ink/70">
        scroll ↓
      </motion.a>
    </section>
  );
}
