# Nida Sajjad — Portfolio (React + Vite + Tailwind)

An advanced, animation-rich portfolio built with **React 18, Vite, Tailwind CSS, Framer Motion and Three.js**.
Light purple / fuchsia theme with dark "showcase" bands for the projects and skills sections.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Requires Node.js 18+ (https://nodejs.org).

## Build & deploy

```bash
npm run build      # outputs /dist
npm run preview    # test the production build
```

**Vercel (easiest):** push the folder to GitHub → vercel.com → *Add New Project* → import repo → Deploy (defaults work).
**Netlify:** *Add new site → Import from Git*, build command `npm run build`, publish directory `dist`.
**GitHub Pages:** `npm run build`, then publish the `dist` folder (the config already uses relative paths).
**Single-file build:** `npm run build:single` → one self-contained `dist/index.html`.

## Your photo, CV and links

| What | Where |
|------|-------|
| Hero photo | replace `src/assets/profile.jpg` (square, ~800 px works best) |
| CV (Download CV button) | replace `src/assets/Nida_Sajjad_CV.pdf`; regenerate with `python3 scripts/make_cv.py` after editing the script |
| GitHub / LinkedIn | `profile.github` and `profile.linkedin` in `src/data.js` (used in hero, contact and footer) |
| Project screenshots | put images in `public/projects/` and add `image: "projects/name.png"` to that project in `src/data.js` |
| Project live / repo URL | the project's `link` in `src/data.js` |

## Contact form (Send Message)

The form posts to [FormSubmit](https://formsubmit.co) and lands in nidasajjad120@gmail.com — no backend needed.
**One-time activation:** the first time anyone submits the live site, FormSubmit emails you an activation link. Submit a test message yourself right after deploying and click the confirmation in your inbox (check spam). On success the visitor sees a "Message sent!" confirmation card and also gets an automatic confirmation email. If the request fails (e.g. blocked network or not yet activated), a panel offers Gmail / email app / copy as a fallback.
**Note:** sending only works on the real deployed site (Vercel/Netlify/etc.) — sandboxed previews block outgoing requests.

## Where to edit content

Almost everything lives in **`src/data.js`**: name, contact details, projects (in-progress / completed), skills, services, timeline and testimonials.
Project cards currently use generated mock-UI visuals; swap in real screenshots by editing `src/components/HeroParallax.jsx`.
Testimonials are **sample placeholders** (labelled "Sample") — replace them with real feedback.
Each project's `link` (in `src/data.js`) is what the **Visit live** button opens — placeholders point to github.com, replace them with your real URLs. Stacks/years/progress there are placeholders too.
Social links (GitHub / LinkedIn / Behance) are set to `#` in `src/components/Contact.jsx`.

## Section → component map

| Section | Effect | File |
|---------|--------|------|
| Hero | Cloud Shader (WebGL), typewriter roles, 3D tilt profile, floating tech chips | `Hero.jsx`, `CloudShader.jsx` |
| Projects | Hero Parallax — horizontal, tilted rows (In Progress / Completed) | `HeroParallax.jsx` |
| Skills | Lamp light, filterable animated skill cloud, 3D dotted globe horizon | `Skills.jsx`, `Globe.jsx` |
| Services | Background Ripple grid (click it) + spotlight tilt cards | `Services.jsx` |
| Journey | Scroll-drawn timeline + terminal with typing **sound** | `Journey.jsx`, `Terminal.jsx` |
| All Projects page | Line-by-line project list (`#all-projects`), curtain page-transition, filters, live pulse badges, progress bars, cursor-following preview | `AllProjects.jsx`, `App.jsx` |
| Kind Words | Testimonials marquee grid (vertical, pause on hover) | `Testimonials.jsx` |
| Contact | Rotating gradient border, parallax blobs, magnetic buttons, confetti | `Contact.jsx` |
| Dark mode | Sun↔moon toggle in navbar, circular-reveal theme transition, starry night-sky cloud shader, saved in localStorage | `theme.jsx`, `ThemeToggle.jsx`, `index.css` |
| Global | Custom cursor, scroll progress bar, magnetic buttons, scroll-spy nav | `Cursor.jsx`, `Magnetic.jsx`, `Navbar.jsx` |

### CloudShader props
`speed` (1), `count` (1–6+), `cloudColor`, `skyTopColor`, `skyBottomColor`.

## Notes
- Typing sounds use the Web Audio API; browsers require one click/keypress on the page before audio plays. Toggle with the **Sound** button in the terminal.
- The contact form opens the visitor's email app (`mailto:`). For server-side delivery, connect Formspree/EmailJS in `Contact.jsx`.
