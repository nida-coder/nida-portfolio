/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "var(--bg)",
        ink: "var(--ink)",
        primary: "#8b5cf6",
        secondary: "#d946ef",
        night: "#0b0618",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "marquee-up": { from: { transform: "translateY(0)" }, to: { transform: "translateY(-50%)" } },
        "marquee-down": { from: { transform: "translateY(-50%)" }, to: { transform: "translateY(0)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        blink: { "50%": { opacity: "0" } },
        "cell-ripple": { "0%": { opacity: "0.35" }, "50%": { opacity: "1", backgroundColor: "rgba(217,70,239,0.45)" }, "100%": { opacity: "0.35" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        "marquee-up": "marquee-up 38s linear infinite",
        "marquee-down": "marquee-down 38s linear infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        blink: "blink 1s step-end infinite",
        shimmer: "shimmer 5s linear infinite",
      },
    },
  },
  plugins: [],
};
