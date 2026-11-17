import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { keyClick, unlockAudio } from "../audio.js";

const SCRIPT = [
  { t: "$ nida --whoami", c: "text-violet-300" },
  { t: "> Software engineer · Full-Stack · AI Agents · UI/UX · QA mindset", c: "text-white" },
  { t: "", c: "" },
  { t: "$ nida --abilities", c: "text-violet-300" },
  { t: "  frontend engineering  ▰▰▰▰▰▰▰▰▰▱  React, Tailwind, animation-rich UI", c: "text-emerald-300" },
  { t: "  backend & databases   ▰▰▰▰▰▰▰▰▱▱  Django, Node.js, SQL, REST APIs", c: "text-emerald-300" },
  { t: "  AI & agents           ▰▰▰▰▰▰▰▰▱▱  LLM features, prompt design, agent workflows", c: "text-emerald-300" },
  { t: "  UI/UX & graphics      ▰▰▰▰▰▰▰▰▰▱  Figma, design systems, branding", c: "text-emerald-300" },
  { t: "  QA & testing          ▰▰▰▰▰▰▰▱▱▱  test cases, edge cases, bug reports", c: "text-emerald-300" },
  { t: "", c: "" },
  { t: "$ nida --strengths", c: "text-violet-300" },
  { t: "  ✔ ships complete features end to end — design, code, test", c: "text-fuchsia-300" },
  { t: "  ✔ learns new tools fast and explains them clearly", c: "text-fuchsia-300" },
  { t: "  ✔ team player: delivered team-based final year project work", c: "text-fuchsia-300" },
  { t: "  ✔ obsessed with details users notice (and the ones they don't)", c: "text-fuchsia-300" },
  { t: "", c: "" },
  { t: "$ status --now", c: "text-violet-300" },
  { t: "> ready for the next challenge█", c: "text-amber-300" },
];

export default function Terminal() {
  const box = useRef(null);
  const inView = useInView(box, { once: true, amount: 0.35 });
  const [lines, setLines] = useState([]);
  const [run, setRun] = useState(0);
  const [sound, setSound] = useState(true);
  const soundRef = useRef(true);
  soundRef.current = sound;

  useEffect(() => {
    if (!inView) return;
    let cancelled = false, timers = [];
    setLines([]);
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));
    (async () => {
      for (let i = 0; i < SCRIPT.length; i++) {
        const { t, c } = SCRIPT[i];
        for (let k = 1; k <= t.length; k++) {
          if (cancelled) return;
          setLines((p) => { const n = p.slice(0, i); n[i] = { text: t.slice(0, k), c }; return n; });
          if (soundRef.current && t[k - 1] !== " ") keyClick();
          await wait(16 + Math.random() * 18);
        }
        if (!t) setLines((p) => { const n = p.slice(0, i); n[i] = { text: "", c }; return n; });
        await wait(t.startsWith("$") ? 280 : 120);
      }
    })();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [inView, run]);

  return (
    <div ref={box} className="mx-auto max-w-4xl">
      <div className="mb-5 flex items-end justify-between gap-3">
        <h3 className="font-display text-3xl font-bold md:text-4xl">Run <span className="gradient-text">Diagnostics</span></h3>
        <div className="flex gap-2">
          <button onClick={() => { unlockAudio(); setSound(!sound); }} className="rounded-full border border-primary/40 bg-white px-4 py-2 text-sm font-bold text-primary shadow dark:bg-violet-950">{sound ? "🔊 Sound on" : "🔇 Muted"}</button>
          <button onClick={() => { unlockAudio(); setRun(run + 1); }} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg">▶ Replay</button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl bg-[#140c33] shadow-[0_25px_70px_rgba(30,27,75,.45)] ring-1 ring-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <i className="h-3 w-3 rounded-full bg-[#ff5f56]" /><i className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><i className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-white/40">nida@portfolio — zsh</span>
        </div>
        <div className="min-h-[26rem] overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
          {lines.map((l, i) => <div key={i} className={`whitespace-pre ${l.c}`}>{l.text || "\u00A0"}</div>)}
          <span className="inline-block h-4 w-2 animate-blink bg-fuchsia-400 align-middle" />
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-gray-500">Tip: click anywhere on the page once to enable typing sounds (browsers block audio until you interact).</p>
    </div>
  );
}
