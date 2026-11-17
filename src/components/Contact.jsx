import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Magnetic from "./Magnetic.jsx";
import { profile } from "../data.js";
import Socials from "./Socials.jsx";
import emailjs from '@emailjs/browser'; // EmailJS import kiya

function Field({ label, children, i }) {
  return (
    <motion.label initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i }} className="group block">
      <span className="mb-1.5 block text-sm font-semibold text-gray-700 transition group-focus-within:text-primary">{label}</span>
      {children}
    </motion.label>
  );
}
const input = "w-full rounded-xl border-2 border-violet-200 bg-white px-4 py-3.5 outline-none transition focus:-translate-y-0.5 focus:border-primary focus:shadow-[0_0_0_5px_rgba(139,92,246,.12)]";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", type: "Web Development", msg: "" });
  const [state, setState] = useState("idle");
  const [done, setDone] = useState(null);
  const form = useRef(); // Form ka reference

  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }), sy = useSpring(my, { stiffness: 50, damping: 20 });
  const b1x = useTransform(sx, [-1, 1], [-40, 40]), b1y = useTransform(sy, [-1, 1], [-30, 30]);
  const b2x = useTransform(sx, [-1, 1], [50, -50]), b2y = useTransform(sy, [-1, 1], [30, -30]);

  const [err, setErr] = useState("");

  // Naya EmailJS wala submit function
  const submit = (e) => {
    e.preventDefault();
    setState("sending"); 
    setErr("");

    emailjs.sendForm(
      'service_l5htgnc',       // Aapki Service ID
      'template_obyz8yb',      // Aapki Template ID
      form.current,            // Form ka data
      'dG69xWO5y8Gr-y1OG'      // Aapki Public Key
    )
    .then((result) => {
        setDone({ name: f.name, email: f.email });
        setState("idle");
        setF({ name: "", email: "", type: "Web Development", msg: "" });
        form.current.reset();
    }, (error) => {
        setState("idle");
        setErr("fail");
        console.error(error.text);
    });
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28"
      onMouseMove={(e) => { mx.set((e.clientX / window.innerWidth) * 2 - 1); my.set((e.clientY / window.innerHeight) * 2 - 1); }}>
      <motion.div style={{ x: b1x, y: b1y }} className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-primary/30 blur-[90px]" />
      <motion.div style={{ x: b2x, y: b2y }} className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-secondary/30 blur-[90px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="absolute -inset-[2px] overflow-hidden rounded-[3rem]">
          <div className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,#8b5cf6,transparent_25%,#d946ef,transparent_60%,#8b5cf6)] opacity-70" />
        </div>
        <div className="relative grid gap-12 rounded-[3rem] contact-card bg-[#faf8ff] p-8 md:grid-cols-2 md:p-16">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-mono text-sm tracking-widest text-primary">// get in touch</motion.p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-6xl">
              {"Let's build something".split(" ").map((w, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 40, rotate: 6 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="mr-3 inline-block">{w}</motion.span>
              ))}
              <span className="gradient-text gradient-text-anim">extraordinary.</span>
            </h2>
            <p className="mt-5 max-w-md text-gray-600">Have a product idea, a bug that needs hunting or a design that needs life? Send a message — I reply fast.</p>
            <div className="mt-10 space-y-5">
              {[["📧", "Email", profile.email, `mailto:${profile.email}`], ["📞", "Phone", profile.phone, `tel:${profile.phone.replace(/\s/g, "")}`]].map(([ic, l, v, href], i) => (
                <motion.a key={l} href={href} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }} whileHover={{ x: 8 }} className="flex items-center gap-4" data-hover>
                  <motion.span whileHover={{ rotate: 360, scale: 1.15 }} transition={{ duration: 0.6 }} className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xl shadow-lg shadow-purple-300">{ic}</motion.span>
                  <span><span className="block text-sm text-gray-500">{l}</span><span className="font-bold">{v}</span></span>
                </motion.a>
              ))}
            </div>
            <div className="mt-10"><Socials variant="pill" tone="dark" className="flex-wrap" /></div>
          </div>

          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 120 }} className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-emerald-300/60 bg-emerald-50 p-10 text-center dark:border-emerald-400/30 dark:bg-emerald-950/30" role="status" aria-live="polite">
              <svg viewBox="0 0 52 52" className="mb-5 h-20 w-20">
                <motion.circle cx="26" cy="26" r="23" fill="none" stroke="#10b981" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
                <motion.path d="M15 27l8 8 14-16" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
              </svg>
              <h3 className="font-display text-3xl font-bold text-emerald-700 dark:text-emerald-300">Message sent!</h3>
              <p className="mt-3 max-w-sm text-gray-600">Thank you{done.name ? `, ${done.name.split(" ")[0]}` : ""}! Your message has reached my inbox. I'll reply to <b>{done.email}</b> within 24 hours.</p>
              <p className="mt-1 text-sm text-gray-500">A confirmation email is on its way to you too.</p>
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.i key={i} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: (i % 2 ? 1 : -1) * (40 + ((i * 37) % 160)), y: -60 - ((i * 53) % 160), opacity: 0, rotate: i * 40 }} transition={{ duration: 1.3, delay: 0.5 }} className="pointer-events-none absolute left-1/2 top-1/3 h-2.5 w-2.5 rounded-sm" style={{ background: ["#8b5cf6", "#d946ef", "#f0abfc", "#fbbf24", "#34d399"][i % 5] }} />
              ))}
              <button type="button" onClick={() => setDone(null)} className="mt-6 rounded-full border border-primary/50 px-5 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white">Send another message</button>
            </motion.div>
          ) : (
          <form ref={form} onSubmit={submit} className="relative space-y-5">
            <Field label="Your Name" i={0}>
              <input required name="name" className={input} placeholder="Jane Doe" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            </Field>
            <Field label="Your Email" i={1}>
              <input required type="email" name="email" className={input} placeholder="jane@example.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            </Field>
            <Field label="Project Type" i={2}>
              <select name="project_type" className={input} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
                {["Web Development", "AI Application", "UI/UX Design", "Graphic Design", "QA & Testing"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Your Message" i={3}>
              <textarea required name="message" rows={4} className={`${input} resize-none`} placeholder="Tell me about your project…" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
            </Field>
            <Magnetic strength={0.15} className="w-full">
              <motion.button whileTap={{ scale: 0.96 }} disabled={state !== "idle"} type="submit"
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] py-4 text-lg font-bold text-white shadow-xl shadow-purple-300 animate-shimmer">
                <AnimatePresence mode="wait">
                  <motion.span key={state} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} className="block">
                    {state === "idle" && "Send Message →"}{state === "sending" && "Sending…"}{state === "sent" && "✓ Message sent — thank you!"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </Magnetic>
            <AnimatePresence>
              {err === "fail" && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} aria-live="polite"
                  className="rounded-2xl border border-rose-300/60 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-950/40 dark:text-rose-200">
                  <p className="font-semibold">Message send nahi ho saka.</p>
                  <p className="mt-1 opacity-90">Internet connection check karein ya thodi der baad koshish karein.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}