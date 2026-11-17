import { testimonials } from "../data.js";

function Card({ t }) {
  return (
    <figure className="glass mb-5 rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/50" data-hover>
      <div className="mb-3 text-2xl text-secondary">“</div>
      <blockquote className="text-sm leading-relaxed text-gray-700">{t.quote}</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">{t.role.split("· ")[1][0]}</span>
        <span className="font-mono text-xs text-gray-500">{t.role}</span>
      </figcaption>
    </figure>
  );
}

function Column({ items, dir, cls = "" }) {
  const list = [...items, ...items];
  return (
    <div className={`marquee-col h-[34rem] overflow-hidden mask-fade-y ${cls}`}>
      <div className={dir === "up" ? "animate-marquee-up" : "animate-marquee-down"}>
        {list.map((t, i) => <Card key={i} t={t} />)}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const a = testimonials.slice(0, 3), b = testimonials.slice(3, 6), c = testimonials.slice(6, 9);
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <p className="font-mono text-sm tracking-widest text-primary">// kind words</p>
        <h2 className="mt-2 font-display text-4xl font-bold md:text-6xl">What people <span className="gradient-text gradient-text-anim">say</span></h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Column items={a} dir="up" />
        <Column items={b} dir="down" cls="hidden md:block" />
        <Column items={c} dir="up" cls="hidden lg:block" />
      </div>
    </section>
  );
}
