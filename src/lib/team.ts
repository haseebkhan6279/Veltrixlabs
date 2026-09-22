export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  location: string;
  bio: string;
  focus: readonly string[];
  education: string;
  email: string;
  phone: string;
  linkedIn: string;
  github?: string;
  accent: string;
};

export const TEAM: readonly TeamMember[] = [
  {
    name: "Haseeb Gulraiz Khan",
    role: "Founder & Full-Stack Engineer",
    initials: "HK",
    location: "Lahore, Pakistan · Remote worldwide",
    bio: "I didn't learn to code in a classroom — I learned by shipping. I own the stack from database to deploy: Next.js, NestJS, React Native, and the APIs that hold production load. 40+ products for clients in Pakistan, the UK and the US.",
    focus: ["Next.js", "NestJS", "React Native", "PostgreSQL", "AI / n8n"],
    education: "BS Computer Science, UOL · MS CS, ITU",
    email: "haseebgulraiz222@gmail.com",
    phone: "+92 324 049 7250",
    linkedIn: "https://www.linkedin.com/in/haseebgulraizkhan",
    github: "https://github.com/haseebkhan6279",
    accent: "from-cyan-electric to-indigo-400",
  },
  {
    name: "Hamza Azeem",
    role: "Co-Founder & Full-Stack Developer",
    initials: "HA",
    location: "Lahore, Pakistan · Remote worldwide",
    bio: "Full-stack developer for modern web and cross-platform mobile apps, with a strong base in system design. Expanding into AI automation — n8n workflows, LLM APIs, and agents that take the grind out of operations.",
    focus: [
      "Next.js",
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "LLM APIs",
      "n8n",
    ],
    education: "BS Computer Science, University of Lahore · 2021–2026",
    email: "70125186@student.uol.edu.pk",
    phone: "+92 371 0726646",
    linkedIn: "https://www.linkedin.com/in/hamzaazeemdeveloper",
    accent: "from-purple-neon to-fuchsia-400",
  },
];
