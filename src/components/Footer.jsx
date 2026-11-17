import Socials from "./Socials.jsx";

export default function Footer() {
  return (
    <footer className="py-12 text-center">
      <p className="font-display text-2xl font-bold">Nida<span className="text-secondary">.</span>Sajjad</p>
      <Socials tone="dark" className="mt-4 justify-center" />
      <p className="mt-4 text-sm text-gray-500">© {new Date().getFullYear()} Nida Sajjad · Designed & built with 💜</p>
    </footer>
  );
}
