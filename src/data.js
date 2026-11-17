export const profile = {
  name: "Nida Sajjad",
  email: "nidasajjad120@gmail.com",
  phone: "+92 326 1213069",
  roles: ["Full-Stack Developer", "AI Agent Builder", "UI/UX Designer", "Graphic Designer"],
  github: "https://github.com/nida-coder",
  linkedin: "https://www.linkedin.com/in/nida-sajjad-92681244a/",
};

// Edit these freely. `kind` picks the mock-UI style shown on the card.
// Optional per project: `image: "projects/my-shot.png"` (file placed in /public/projects) or a full https URL — it replaces the mock UI.
// `link` is the live/GitHub URL opened by the "Live" button (placeholders point to GitHub — replace with your real URLs).
const GH = "https://github.com/nida-coder"; // default target of the "Visit live" buttons — replace per project with a live URL or repo link
export const projects = {
  inProgress: [
    { title: "SocialSphere", desc: "Social platform with real-time feeds", long: "A social platform with real-time feeds, profiles and rich interactions.", image: "projects/SocialSphere.png",stack: ["React", "Node.js", "PostgreSQL"], progress: 70, year: "2026", kind: "feed", colors: ["#7c3aed", "#d946ef"], link: GH },
    { title: "DevMetrics AI", desc: "Engineering analytics dashboard", long: "An analytics dashboard that turns engineering activity into clear, actionable insight.",image: "projects/DevMetricsAI.png", stack: ["React", "Django", "SQL"], progress: 60, year: "2026", kind: "dashboard", colors: ["#6d28d9", "#ec4899"], link: GH },
    { title: "EcoTrack", desc: "Sustainability habit tracker", long: "A mobile-first habit tracker that makes sustainable living measurable and fun.", image: "projects/EcoTrack.png", stack: ["React", "Tailwind", "Charts"], progress: 40, year: "2026", kind: "mobile", colors: ["#7c3aed", "#f0abfc"], link: GH },
    { title: "TestPilot QA", desc: "Test-case & bug tracking suite", long: "A test-case management and bug-tracking suite built around a QA engineer's workflow.", image: "projects/TestPilotQA.png", stack: ["Django", "React", "SQL"], progress: 35, year: "2026", kind: "dashboard", colors: ["#5b21b6", "#a855f7"], link: GH },
  ],
  completed: [
    { title: "NeuralLearn", desc: "AI-powered learning assistant", long: "An AI-powered learning assistant that adapts explanations to how you study.",image: "projects/NeuralLearn.png", stack: ["Python", "React", "LLM"], year: "2025", kind: "chat", colors: ["#8b5cf6", "#d946ef"], link: "https://fyp-neura-learn.vercel.app/" },
    { title: "AI Creations Studio", desc: "Content writer for small online sellers", long: "A writing assistant for small online sellers: product descriptions, Instagram captions, shop names and customer replies in English, Urdu or Roman Urdu, generated live with Claude. Designed in oxblood leather, parchment and laser cyan.", image: "projects/my-pic.png", stack: ["Claude API", "JavaScript", "UX writing"], year: "2026", kind: "chat", colors: ["#4f0e14", "#b99a66"], link: "https://claude.ai/artifact/EgSxG8QWX5bChAS2vTGJLq" },
    
    { title: "CareNest", desc: "Personal life management app", long: "A personal life-management app for tasks, routines and goals in one calm place.",image: "projects/CareNest.png", stack: ["React", "Django", "SQL"], year: "2025", kind: "mobile", colors: ["#6366f1", "#e879f9"], link: GH },
    { title: "UI/UX Case Study", desc: "End-to-end product design", long: "End-to-end product design: research, wireframes, prototype and developer hand-off.", image: "projects/UIUXCaseStudy.png",stack: ["Figma", "Prototyping", "Design Systems"], year: "2025", kind: "design", colors: ["#7e22ce", "#f472b6"], link: "https://drive.google.com/drive/folders/1fGY2CWFwfeomEFGjH8qnldr68Bcm_ccN?usp=drive_link" },
    { title: "Graphic Design Suite", desc: "Branding & visual assets", long: "Branding, social and print assets designed as one cohesive visual system.",image: "projects/pizza.png", stack: ["Illustrator", "Photoshop", "Branding"], year: "2024", kind: "design", colors: ["#a855f7", "#ec4899"], link: "https://drive.google.com/drive/folders/1qtrVs7yDTckplwF2x3onaBIYWPqPzJOu?usp=sharing" },
    {title: "Unity Game Development",desc: "Interactive 2D & 3D games",long: "Designed and developed interactive games using Unity, focusing on gameplay mechanics, player controls, game environments, and interactive experiences.",image: "projects/UnityGameDevelopment.png",stack: ["Unity", "C#", "Game Development"],year: "2025",kind: "feed",colors: ["#4338ca", "#d946ef"],link: "https://drive.google.com/drive/folders/10egSA1F65mKvF9lEtEr4gHMP62N_MvNz?usp=drive_link"},
    //{ title: "Final Year Project", desc: "Team-built software system", long: "A team-built software system delivered as our BS Software Engineering capstone.", stack: ["Team project", "Full-Stack", "SQL"], year: "2025", kind: "feed", colors: ["#4338ca", "#d946ef"], link: GH },
  ],
};

export const skills = [
  { label: "React.js", cat: "web", size: 3 }, { label: "Next.js", cat: "web", size: 2 },
  { label: "JavaScript", cat: "web", size: 3 }, { label: "TypeScript", cat: "web", size: 2 },
  { label: "HTML5", cat: "web", size: 1 }, { label: "CSS3", cat: "web", size: 1 },
  { label: "Tailwind CSS", cat: "web", size: 2 }, { label: "Framer Motion", cat: "web", size: 1 },
  { label: "Three.js", cat: "web", size: 2 }, { label: "Git & GitHub", cat: "web", size: 1 },
  { label: "Node.js", cat: "full", size: 2 }, { label: "Django", cat: "full", size: 3 },
  { label: "REST APIs", cat: "full", size: 2 }, { label: "SQL", cat: "full", size: 3 },
  { label: "PostgreSQL", cat: "full", size: 1 }, { label: "MongoDB", cat: "full", size: 1 },
  { label: "Python", cat: "ai", size: 3 }, { label: "AI Agents", cat: "ai", size: 3 },
  { label: "LLM Integration", cat: "ai", size: 2 }, { label: "Prompt Engineering", cat: "ai", size: 2 },
  { label: "RAG", cat: "ai", size: 1 }, { label: "Generative AI", cat: "ai", size: 2 },
  { label: "Figma", cat: "ux", size: 3 }, { label: "Wireframing", cat: "ux", size: 1 },
  { label: "Prototyping", cat: "ux", size: 2 }, { label: "Design Systems", cat: "ux", size: 2 },
  { label: "Adobe Illustrator", cat: "ux", size: 1 }, { label: "Photoshop", cat: "ux", size: 1 },
  { label: "Branding", cat: "ux", size: 2 },
  { label: "Manual Testing", cat: "qa", size: 1 }, { label: "Test Cases", cat: "qa", size: 1 },
];

export const categories = [
  { id: "all", label: "All", color: "#e9d5ff" },
  { id: "full", label: "Full-Stack", color: "#a78bfa" },
  { id: "ai", label: "AI & Agents", color: "#f0abfc" },
  { id: "web", label: "Web Dev", color: "#c4b5fd" },
  { id: "ux", label: "UI/UX & Design", color: "#f472b6" },
  { id: "qa", label: "QA", color: "#86efac" },
];

export const services = [
  { icon: "🤖", title: "AI Agents & Automation", text: "Designing agents and LLM-powered features that take real work off people's plates." },
  { icon: "💻", title: "Full-Stack Web Apps", text: "React frontends with Django / Node backends, SQL databases and clean APIs." },
  { icon: "🎨", title: "UI/UX Design", text: "Research-led interfaces in Figma — wireframes, prototypes and design systems." },
  { icon: "🖌️", title: "Graphic & Brand Design", text: "Logos, social assets and visual identities that feel cohesive and memorable." },
  { icon: "🧪", title: "QA & Testing", text: "Test-case design and bug hunting with a user's eye for the edge cases." },
  { icon: "⚡", title: "Frontend Engineering", text: "Responsive, accessible, animation-rich interfaces that stay fast." },
];

export const timeline = [
  { when: "2025 — Present", title: "Frontend Developer", org: "Fast Services", text: "Building responsive interfaces and integrating APIs into production products.", tag: "Work" },
  { when: "Recent", title: "Guest Speaker — AI & Developers", org: "Community session", text: "Shared perspectives on how AI is reshaping the way developers work.", tag: "Speaking" },
  { when: "2024", title: "IT Intern", org: "Dynamics Outfitters", text: "Supported troubleshooting and testing, and learned how real teams ship and maintain software.", tag: "Internship" },
  { when: "Education", title: "BS Software Engineering", org: "Lahore College for Women University", text: "Core engineering foundations plus team-based final year project work.", tag: "Education" },
];

// SAMPLE placeholders — replace with real feedback you have received.
export const testimonials = [
  { quote: "Turned a rough idea into a clean, working interface faster than we expected.", role: "Sample · Client" },
  { quote: "Great eye for detail — the UI felt polished from the very first demo.", role: "Sample · Mentor" },
  { quote: "Reliable teammate who communicates early and owns her tasks end to end.", role: "Sample · Teammate" },
  { quote: "Her animations made the product feel premium without hurting performance.", role: "Sample · Product Owner" },
  { quote: "She tests like a user and builds like an engineer — a rare combination.", role: "Sample · Team Lead" },
  { quote: "Understood our brand quickly and delivered consistent visuals across the board.", role: "Sample · Client" },
  { quote: "Picks up new tools remarkably fast and documents what she builds.", role: "Sample · Colleague" },
  { quote: "The AI feature she integrated saved our team hours every week.", role: "Sample · Client" },
  { quote: "Calm under deadlines and always open to feedback.", role: "Sample · Supervisor" },
];
