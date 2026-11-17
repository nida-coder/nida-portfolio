let ctx = null;
export function unlockAudio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) ctx = new AC();
  }
  if (ctx && ctx.state === "suspended") ctx.resume();
}
export function keyClick() {
  if (!ctx || ctx.state !== "running") return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const f = ctx.createBiquadFilter();
  o.type = "triangle";
  o.frequency.setValueAtTime(900 + Math.random() * 500, t);
  o.frequency.exponentialRampToValueAtTime(120, t + 0.03);
  f.type = "highpass";
  f.frequency.value = 200;
  g.gain.setValueAtTime(0.07, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
  o.connect(f); f.connect(g); g.connect(ctx.destination);
  o.start(t); o.stop(t + 0.05);
}
