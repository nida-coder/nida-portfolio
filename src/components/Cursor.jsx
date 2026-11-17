import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22 });
  const ry = useSpring(y, { stiffness: 220, damping: 22 });
  const [hover, setHover] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setHover(!!e.target.closest("a, button, input, textarea, select, [data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [x, y]);

  if (!fine) return null;
  return (
    <>
      <motion.div style={{ x: rx, y: ry }} animate={{ scale: hover ? 2.2 : 1, opacity: hover ? 0.9 : 0.6 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 h-10 w-10 rounded-full border border-fuchsia-400 mix-blend-multiply" />
      <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary" />
    </>
  );
}
