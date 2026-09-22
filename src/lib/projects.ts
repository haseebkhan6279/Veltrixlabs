export type ProjectCategory =
  | "SaaS & Dashboards"
  | "E-commerce"
  | "AI"
  | "Mobile"
  | "Web3"
  | "Booking"
  | "Websites";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  categories?: ProjectCategory[];
  status: "Live" | "In development" | "Client delivery";
  url?: string;
  dashboardUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  image: string;
  video?: string;
  stack: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "gt-estate",
    name: "GT Estate",
    tagline: "Real estate platform, dashboard & API",
    description:
      "Residential and commercial plot investments with GSAP hero, inquiry flows, and an admin console for properties, SEO pages, reviews, and PM loan applications.",
    category: "Websites",
    categories: ["SaaS & Dashboards"],
    status: "Live",
    url: "https://www.gtestates.com.pk/",
    dashboardUrl: "https://gt-estate-server-zhly.vercel.app/dashboard",
    image: "/images/work/gt-estate-dashboard.png",
    video: "/videos/gt-estate.webm",
    stack: ["Next.js", "Express", "GSAP"],
    featured: true,
  },
  {
    slug: "buy4low",
    name: "Buy4Low",
    tagline: "E-commerce system built solo in 2 days",
    description:
      "REST API, storefront, admin dashboard and a programmatic SEO engine generating ~3,200 location-targeted landing pages.",
    category: "E-commerce",
    status: "Live",
    url: "https://buy4low.com",
    image: "/images/work/buy4low.png",
    video: "/videos/buy4low.webm",
    stack: ["Next.js", "NestJS", "MongoDB"],
    featured: true,
  },
  {
    slug: "vellay",
    name: "Velay Pro",
    tagline: "Multi-venue sports booking SaaS",
    description:
      "Owner console plus iOS and Android apps for sports complexes — live court management, bookings, and a digital front desk for high-traffic venues in Pakistan.",
    category: "SaaS & Dashboards",
    categories: ["Mobile"],
    status: "Live",
    url: "https://portal.vellay.pro",
    dashboardUrl: "https://portal.vellay.pro",
    appStoreUrl: "https://apps.apple.com/pk/app/velay-pro/id6768310187",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.hypelet.velayVendor",
    image: "/images/projects/vellay-pro-20260616-1457.png",
    video: "/videos/vellay.webm",
    stack: ["Next.js", "PostgreSQL", "Expo"],
    featured: true,
  },
  {
    slug: "vellay-app",
    name: "Velay.app",
    tagline: "Sports venue booking for players",
    description:
      "Player-facing booking app for futsal, cricket, padel and table tennis — find a court, reserve a slot, and show up.",
    category: "Booking",
    status: "Live",
    url: "https://velay.app",
    image: "/images/projects/vellay-app.png",
    video: "/videos/vellay.webm",
    stack: ["Next.js", "PostgreSQL", "Expo"],
    featured: true,
  },
  {
    slug: "southampton-port-taxi",
    name: "Southampton Port Taxi",
    tagline: "Cruise terminal taxi booking",
    description:
      "Book a taxi to and from Southampton Cruise Port Terminal online — port transfers with a clear fare before you travel.",
    category: "Booking",
    status: "Live",
    url: "https://www.southamptonporttaxi.co.uk/",
    image: "/images/projects/cab-uk.png",
    video: "/videos/cab-uk.webm",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    featured: true,
  },
  {
    slug: "court-chuno",
    name: "Court Chuno",
    tagline: "Futsal booking & real-time chat",
    description:
      "React Native thesis app for court reservations, match coordination and live player chat on Firebase.",
    category: "Mobile",
    status: "Live",
    url: "https://court-chuno.web.app",
    image: "/images/projects/court-chuno.png",
    video: "/videos/court-chuno.webm",
    stack: ["React Native", "Firebase", "FCM"],
    featured: true,
  },
  {
    slug: "degn",
    name: "DEGN",
    tagline: "Solana DEX trading platform",
    description:
      "Wallet-connected Solana trading with Jupiter swaps, portfolio tracking and live price charts.",
    category: "Web3",
    status: "Live",
    url: "https://degn.app",
    image: "/images/projects/degn-dapp.png",
    video: "/videos/degn.webm",
    stack: ["Next.js", "NestJS", "Web3.js"],
    featured: true,
  },
  {
    slug: "ostello",
    name: "OSTELLO",
    tagline: "Hostel property & resident management",
    description:
      "Live bed availability, applicant portal and a 12-module staff console for occupancy, finance, HR and security.",
    category: "SaaS & Dashboards",
    status: "Live",
    url: "https://admin.allovertheworld.cloud/signin",
    dashboardUrl: "https://admin.allovertheworld.cloud/signin",
    image: "/images/work/ostello-dashboard.png",
    video: "/videos/ostello.webm",
    stack: ["Next.js 16", "React 19", "OpenAPI"],
    featured: true,
  },
  {
    slug: "zallo",
    name: "Zallo.ai",
    tagline: "AI receptionist suite — site, CRM & staff app",
    description:
      "Marketing site, multi-tenant NestJS CRM and Expo staff app for an AI receptionist product.",
    category: "AI",
    categories: ["SaaS & Dashboards"],
    status: "Live",
    url: "https://client-portal.zallo.ai/signin",
    dashboardUrl: "https://client-portal.zallo.ai/signin",
    image: "/images/work/zallo-dashboard.png",
    video: "/videos/zallo.webm",
    stack: ["Next.js", "NestJS", "Expo"],
    featured: true,
  },
  {
    slug: "atlantic-devices",
    name: "Atlantic Devices",
    tagline: "UK circular phone marketplace + wholesale ops",
    description:
      "Sell phones with locked quotes, buy graded stock, and run IMEI inventory, POs and dual-currency invoicing.",
    category: "E-commerce",
    categories: ["SaaS & Dashboards"],
    status: "Live",
    url: "https://atlanticdevicessolutions.co.uk/",
    dashboardUrl: "https://dashboard.atlanticdevicessolutions.co.uk/",
    image: "/images/work/atlantic-devices-dashboard.png",
    video: "/videos/atlantic-devices.webm",
    stack: ["Next.js", "NestJS", "Prisma"],
  },
  {
    slug: "manpowerhub",
    name: "ManpowerHub",
    tagline: "Multi-tenant manpower supply ERP",
    description:
      "One approved timesheet drives payroll and invoicing, with Postgres row-level tenant isolation.",
    category: "SaaS & Dashboards",
    status: "Live",
    url: "https://client-portal.mp.allovertheworld.cloud/signin",
    dashboardUrl: "https://client-portal.mp.allovertheworld.cloud/signin",
    image: "/images/work/manpowerhub-dashboard.png",
    video: "/videos/manpowerhub.webm",
    stack: ["Next.js 15", "NestJS", "PostgreSQL"],
  },
  {
    slug: "hostelos",
    name: "HostelOS",
    tagline: "Hostel management SaaS — product site",
    description:
      "Marketing site for multi-branch hostel operations with a live bed-map product demo in the hero.",
    category: "SaaS & Dashboards",
    status: "Client delivery",
    image: "/images/work/hostelos.png",
    video: "/videos/hostelos.webm",
    stack: ["Next.js", "TypeScript", "CSS animation"],
  },
  {
    slug: "voxdesk",
    name: "Voxdesk",
    tagline: "White-label AI receptionist marketing site",
    description:
      "Conversion site for a white-label AI receptionist, with a pinned GSAP gallery and live brand switcher.",
    category: "AI",
    status: "Client delivery",
    image: "/images/work/voxdesk.png",
    video: "/videos/voxdesk.webm",
    stack: ["Next.js 16", "GSAP", "Lenis"],
  },
  {
    slug: "aureon-lims",
    name: "Aureon LIMS",
    tagline: "Enterprise lab information system",
    description:
      "Compliance-aware marketing site for an enterprise Laboratory Information Management System.",
    category: "Websites",
    status: "Client delivery",
    image: "/images/work/aureon-lims.png",
    video: "/videos/aureon-lims.webm",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    slug: "auto-trading-bot",
    name: "Signal Trading Bot",
    tagline: "Discord → Binance auto-trading system",
    description:
      "Always-on bot that parses Discord signals and executes Binance orders with risk controls and a dashboard.",
    category: "AI",
    status: "Client delivery",
    image: "/images/work/trading-bot.png",
    stack: ["Node.js", "Binance API", "PostgreSQL"],
  },
  {
    slug: "hajar",
    name: "HAJAR",
    tagline: "Couture label storefront + admin",
    description:
      "White-and-gold storefront for a Pakistani couture label with collections, products and Cloudinary media.",
    category: "E-commerce",
    status: "Client delivery",
    image: "/images/work/hajar.png",
    video: "/videos/hajar.webm",
    stack: ["Next.js 15", "NestJS", "MongoDB"],
  },
  {
    slug: "reworrked",
    name: "REWORRKED",
    tagline: "Premium DTC caps storefront",
    description:
      "Dark editorial storefront and admin for a premium direct-to-consumer cap brand.",
    category: "E-commerce",
    status: "Client delivery",
    image: "/images/work/reworrked.png",
    video: "/videos/reworrked.webm",
    stack: ["Next.js 16", "NestJS", "Cloudinary"],
  },
  {
    slug: "s-oil",
    name: "S-Oil Lubricants",
    tagline: "Corporate site, catalogue & CMS",
    description:
      "Lubricants brand site where products and blog posts are managed from a NestJS/MongoDB admin.",
    category: "Websites",
    status: "Client delivery",
    image: "/images/work/soil.png",
    video: "/videos/s-oil.webm",
    stack: ["Next.js 16", "NestJS", "MongoDB"],
  },
  {
    slug: "splendid",
    name: "Splendid",
    tagline: "Car engine seal catalogue",
    description:
      "Searchable seal catalogue for the Pakistani market with a Vite admin and NestJS API.",
    category: "E-commerce",
    status: "Client delivery",
    image: "/images/work/splendid.png",
    video: "/videos/splendid.webm",
    stack: ["Next.js 16", "NestJS", "MongoDB"],
  },
  {
    slug: "dongsung",
    name: "Dongsung Chemicals",
    tagline: "Research & formulation laboratory",
    description:
      "Corporate site for a chemical research lab — capabilities, research areas and process storytelling.",
    category: "Websites",
    status: "Client delivery",
    image: "/images/work/dongsung.png",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    slug: "flex-fuel",
    name: "Flex Fuel",
    tagline: "Gym platform with AI nutrition assistant",
    description:
      "Fitness platform unifying workouts, trainer programs and an AI assistant for diet and training.",
    category: "AI",
    status: "Live",
    url: "https://frontend-repo-umber.vercel.app",
    image: "/images/projects/flex-fuel.png",
    stack: ["React", "Node.js", "AI Chatbot"],
  },
  {
    slug: "shes-trends",
    name: "She's Trends",
    tagline: "Fashion e-commerce storefront",
    description:
      "Fashion retail storefront with collection browsing and conversion-focused product pages.",
    category: "E-commerce",
    status: "Client delivery",
    image: "/images/projects/shestrends.png",
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "juice-company",
    name: "Juice Company",
    tagline: "Beverage brand website",
    description:
      "Brand site and product presentation for a juice / beverage company.",
    category: "Websites",
    status: "Client delivery",
    image: "/images/projects/juice-company.jpeg",
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    slug: "paper-company",
    name: "Paper Company",
    tagline: "Industrial paper manufacturer site",
    description:
      "Corporate manufacturer website with product lines and inquiry capture.",
    category: "Websites",
    status: "Client delivery",
    image: "/images/projects/paper-company.png",
    stack: ["Next.js", "TypeScript"],
  },
  {
    slug: "accounting-system",
    name: "Accounting System",
    tagline: "Finance operations dashboard",
    description:
      "Accounting and ledger dashboard for invoices, expenses and reporting.",
    category: "SaaS & Dashboards",
    status: "Client delivery",
    image: "/images/projects/accounting-system.png",
    stack: ["React", "Node.js"],
  },
  {
    slug: "crm-system",
    name: "CRM System",
    tagline: "Lead & pipeline operations",
    description:
      "CRM for pipeline tracking, contacts and operational follow-ups.",
    category: "SaaS & Dashboards",
    status: "Client delivery",
    image: "/images/projects/crm-system.png",
    stack: ["Next.js", "NestJS"],
  },
  {
    slug: "erp-saas",
    name: "ERP SaaS",
    tagline: "Multi-module enterprise operations",
    description:
      "Modular ERP surfaces for inventory, finance and day-to-day operations.",
    category: "SaaS & Dashboards",
    status: "Client delivery",
    image: "/images/projects/erp-saas-solution.png",
    stack: ["Next.js", "PostgreSQL"],
  },
  {
    slug: "hrm-system",
    name: "HRM System",
    tagline: "Human resource management",
    description:
      "HR dashboard for people records, attendance and organisational workflows.",
    category: "SaaS & Dashboards",
    status: "Client delivery",
    image: "/images/projects/hrm-system.jpeg",
    stack: ["React", "Node.js"],
  },
  {
    slug: "inventory-management",
    name: "Inventory Management",
    tagline: "Stock, SKUs and warehouse ops",
    description:
      "Inventory system for SKUs, stock movement and warehouse visibility.",
    category: "SaaS & Dashboards",
    status: "Client delivery",
    image: "/images/projects/inventory-management-system.png",
    stack: ["Next.js", "MongoDB"],
  },
  {
    slug: "mern-cms",
    name: "MERN Stack CMS",
    tagline: "Headless content platform",
    description:
      "MERN CMS with articles, media, roles and publishing workflows.",
    category: "SaaS & Dashboards",
    status: "Client delivery",
    image: "/images/projects/mern-stack-cms.png",
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    slug: "table-tennis-backend",
    name: "Table Tennis Backend",
    tagline: "Match ops & court coordination API",
    description:
      "Backend for table-tennis match flow, courts and real-time coordination.",
    category: "Mobile",
    status: "Client delivery",
    image: "/images/projects/table-tennis-backend.jpeg",
    stack: ["Node.js", "Firebase", "TypeScript"],
  },
  {
    slug: "real-estate-ops",
    name: "Real Estate Ops",
    tagline: "Property operations dashboard",
    description:
      "Operations dashboard for listings, leads and property administration.",
    category: "SaaS & Dashboards",
    status: "Client delivery",
    image: "/images/projects/real-estate-management-system.png",
    stack: ["Next.js", "Node.js"],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function projectInCategory(project: Project, category: ProjectCategory) {
  return (
    project.category === category ||
    (project.categories?.includes(category) ?? false)
  );
}

export const PROJECT_FILTERS = [
  "All",
  ...Array.from(
    new Set(
      PROJECTS.flatMap((project) => [
        project.category,
        ...(project.categories ?? []),
      ]),
    ),
  ),
] as const;
