function Mock({ kind }) {
  const bar = "rounded bg-white/25";
  if (kind === "dashboard")
    return (
      <div className="flex h-full gap-2 p-3">
        <div className="w-1/5 space-y-2"><div className={`${bar} h-2 w-full`} /><div className={`${bar} h-2 w-3/4`} /><div className={`${bar} h-2 w-2/3`} /><div className={`${bar} h-2 w-4/5`} /></div>
        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-10 rounded-lg bg-white/25" />)}</div>
          <div className="flex h-20 items-end gap-1 rounded-lg bg-white/15 p-2">{[40, 70, 50, 90, 60, 80, 45, 95].map((h, i) => <div key={i} className="flex-1 rounded-t bg-white/70" style={{ height: `${h}%` }} />)}</div>
        </div>
      </div>
    );
  if (kind === "chat")
    return (
      <div className="flex h-full flex-col justify-end gap-2 p-4">
        <div className="ml-auto h-6 w-2/3 rounded-2xl rounded-br-sm bg-white/70" />
        <div className="h-9 w-4/5 rounded-2xl rounded-bl-sm bg-white/30" />
        <div className="ml-auto h-6 w-1/2 rounded-2xl rounded-br-sm bg-white/70" />
        <div className="mt-1 h-8 rounded-full bg-white/25" />
      </div>
    );
  if (kind === "mobile")
    return (
      <div className="flex h-full items-center justify-center gap-4 p-3">
        {[0, 1].map((i) => (
          <div key={i} className={`h-[92%] w-24 rounded-2xl border-2 border-white/60 bg-white/15 p-2 ${i ? "mt-6" : "-mt-3"}`}>
            <div className="mb-2 h-10 rounded-lg bg-white/50" /><div className={`${bar} mb-1.5 h-2`} /><div className={`${bar} mb-1.5 h-2 w-3/4`} /><div className="h-10 rounded-lg bg-white/30" />
          </div>
        ))}
      </div>
    );
  if (kind === "design")
    return (
      <div className="grid h-full grid-cols-3 gap-2 p-3">
        <div className="col-span-2 row-span-2 rounded-xl bg-white/35" /><div className="rounded-xl bg-white/20" /><div className="rounded-full bg-white/60" />
        <div className="rounded-xl bg-white/25" /><div className="col-span-2 rounded-xl bg-white/15" /><div className="rounded-xl bg-white/45" />
      </div>
    );
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center gap-2"><div className="h-8 w-8 rounded-full bg-white/60" /><div className="flex-1 space-y-1"><div className={`${bar} h-2 w-1/2`} /><div className={`${bar} h-2 w-1/3`} /></div></div>
      <div className="h-20 rounded-xl bg-white/30" /><div className={`${bar} h-2`} /><div className={`${bar} h-2 w-4/5`} />
    </div>
  );
}


const src = (u) => (/^(https?:|data:)/.test(u) ? u : `${import.meta.env.BASE_URL}${u.replace(/^\//, "")}`);

export default function ProjectVisual({ p }) {
  if (p.image) {
    return (
      <>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }} />
        <img src={src(p.image)} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </>
    );
  }
  return (
    <>
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }} />
      <div className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-xl border border-white/30 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-white/20 px-3 py-2"><i className="h-2 w-2 rounded-full bg-red-300" /><i className="h-2 w-2 rounded-full bg-yellow-200" /><i className="h-2 w-2 rounded-full bg-green-300" /><span className="ml-3 h-2 w-32 rounded bg-white/25" /></div>
        <div className="h-full"><Mock kind={p.kind} /></div>
      </div>
    </>
  );
}
