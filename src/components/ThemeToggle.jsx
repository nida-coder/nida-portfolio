import { motion } from "framer-motion";
import { useTheme } from "../theme.jsx";

export default function ThemeToggle({ scrolled }) {
  const { dark, toggle } = useTheme();
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <motion.button aria-label="Toggle dark mode" onClick={toggle} whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.1 }}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-colors duration-500 ${dark ? "border-violet-400/40 bg-[#1c1145]" : scrolled ? "border-violet-200 bg-white" : "border-white/40 bg-white/20"}`}>
      <motion.svg viewBox="0 0 24 24" className="h-6 w-6" animate={{ rotate: dark ? 40 : 0 }} transition={{ type: "spring", stiffness: 120, damping: 12 }}>
        <defs>
          <mask id="moon-mask">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <motion.circle r="7" fill="black" initial={false} animate={{ cx: dark ? 16 : 30, cy: dark ? 8 : 0 }} transition={{ duration: 0.6, ease: "easeInOut" }} />
          </mask>
        </defs>
        <motion.circle cx="12" cy="12" fill={dark ? "#fde68a" : scrolled ? "#f59e0b" : "#fff7cc"} mask="url(#moon-mask)" initial={false} animate={{ r: dark ? 8 : 5 }} transition={{ duration: 0.5 }} />
        <motion.g initial={false} animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.3 : 1 }} style={{ originX: "12px", originY: "12px" }} transition={{ duration: 0.4 }} stroke={scrolled ? "#f59e0b" : "#fff7cc"} strokeWidth="1.8" strokeLinecap="round">
          {rays.map((a) => <line key={a} x1="12" y1="2.2" x2="12" y2="4.2" transform={`rotate(${a} 12 12)`} />)}
        </motion.g>
      </motion.svg>
    </motion.button>
  );
}
