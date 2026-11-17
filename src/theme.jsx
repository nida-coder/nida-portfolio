import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

const Ctx = createContext({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(Ctx);

const initial = () => {
  try {
    const s = localStorage.getItem("theme");
    if (s) return s === "dark";
  } catch (e) {}
  return false;
};

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(initial);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  }, [dark]);

  const toggle = (e) => {
    const next = !dark;
    const apply = () => { document.documentElement.classList.toggle("dark", next); flushSync(() => setDark(next)); };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { apply(); return; }
    const x = e?.clientX ?? window.innerWidth / 2, y = e?.clientY ?? 40;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(apply);
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 900, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };
  return <Ctx.Provider value={{ dark, toggle }}>{children}</Ctx.Provider>;
}
