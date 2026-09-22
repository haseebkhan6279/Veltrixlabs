export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ship-production-software-in-weeks",
    title: "How We Ship Production Software in Weeks, Not Quarters",
    description:
      "Veltrix Labs' delivery model for web apps, SaaS, Shopify, and AI automation — architecture first, weekly production increments, no 40-page decks.",
    date: "2026-09-10",
    category: "Process",
    keywords: [
      "production software",
      "ship fast",
      "software agency",
      "product studio",
      "MVP to production",
    ],
    body: [
      "Most teams lose months in discovery theater. We don’t. Veltrix Labs is a founder-led product studio: the people you brief are the people who write the code, design the data model, and ship the deploy.",
      "We start with a build plan — stack, modules, risks, and a first production slice. That slice is not a prototype. It is a real route, a real database, and a real deploy. From there we expand in weekly increments you can click.",
      "This is how we launched marketplaces, booking platforms, and SaaS consoles for clients in the US, UK, and Pakistan without a bloated project office. If you need a custom web app, Shopify storefront, or AI workflow in weeks, the constraint is clarity — not headcount.",
      "The stack we trust in production is Next.js, NestJS or Node, PostgreSQL or MongoDB, React Native when mobile matters, and n8n plus LLM APIs when operations need automation. We pick the smallest set that will hold load.",
    ],
  },
  {
    slug: "nextjs-full-stack-agency",
    title: "Why We Build Client Products on Next.js",
    description:
      "Next.js for agency work: App Router, TypeScript, SEO, and production DX for SaaS, marketplaces, and marketing sites that have to rank and convert.",
    date: "2026-09-04",
    category: "Web",
    keywords: [
      "Next.js development",
      "Next.js agency",
      "App Router",
      "TypeScript",
      "web app development",
    ],
    body: [
      "Next.js is the default for Veltrix Labs client work because it covers the full surface: marketing pages that need canonical URLs and Open Graph, authenticated SaaS dashboards, and API routes that sit next to the UI.",
      "App Router plus TypeScript keeps the contract between UI and data honest. Server-rendered pages are faster to index. Client islands handle the live bits — booking calendars, admin tables, hover video case studies — without turning the whole site into a SPA tax.",
      "We use it for programmatic SEO landing pages, multi-tenant consoles, and high-converting product sites. The same framework that ranks Buy4Low-style location pages can also host an owner dashboard. That is the point of a full-stack agency stack: one deploy, one language, less glue.",
      "If you are choosing between a WordPress brochure and a real product, Next.js is the path that still looks like a brand site on day one and behaves like software on day thirty.",
    ],
  },
  {
    slug: "shopify-programmatic-seo-storefronts",
    title: "Shopify Storefronts with Programmatic SEO That Actually Converts",
    description:
      "How we build Shopify and custom commerce: high-converting storefronts, payment flows, and thousands of targeted landing pages without thin content.",
    date: "2026-08-28",
    category: "E-commerce",
    keywords: [
      "Shopify development",
      "programmatic SEO",
      "e-commerce storefront",
      "Shopify agency",
      "conversion optimization",
    ],
    body: [
      "A Shopify theme is not a growth engine by itself. Conversion comes from merchandising, speed, and pages that match search intent. We build storefronts and, where it pays, programmatic SEO engines that generate location or category pages with real inventory logic — not doorway spam.",
      "On Buy4Low we shipped a storefront, admin, and roughly 3,200 location-targeted landing pages from a real catalogue. That only works if each page has unique data, unique copy slots, and a crawlable sitemap. Google rewards usefulness, not 10,000 empty keyword URLs.",
      "We also ship custom checkout paths, wholesale ops, and DTC editorial brands (dark, cinematic storefronts included). Shopify Hydrogen or a Next.js headless storefront is a fit when the brand needs more than a stock theme.",
      "If you need a Shopify partner who also owns the SEO architecture and the admin, that is a Veltrix Labs job — not a theme install.",
    ],
  },
  {
    slug: "multi-tenant-saas-dashboards",
    title: "Multi-Tenant SaaS and Dashboards Built to Take Load",
    description:
      "SaaS platform engineering: role-based access, tenant isolation, analytics, and real-time ops consoles for products that have to grow with you.",
    date: "2026-08-20",
    category: "SaaS",
    keywords: [
      "SaaS development",
      "multi-tenant SaaS",
      "dashboard engineering",
      "role-based access",
      "Postgres row-level security",
    ],
    body: [
      "SaaS is not a UI kit. It is tenancy, permissions, billing-shaped data, and a dashboard operators will live in eight hours a day. We build those systems with explicit tenant isolation — often Postgres row-level security — and role-based access from day one.",
      "Vellay is a multi-venue sports booking SaaS. ManpowerHub is a multi-tenant ERP. Hostel operations products need live bed maps and staff consoles. The pattern is the same: one codebase, many tenants, no leaked rows.",
      "Dashboards we ship include finance, CRM, ERP, HRM, inventory, and lab information surfaces. Charts are not decoration; they are the operating loop. We keep them fast, dark-mode native when the brand calls for it, and honest about empty states.",
      "If you are past the no-code prototype and need a real multi-tenant platform, we take you from schema to production incrementally — not a six-month rewrite with nothing to click.",
    ],
  },
  {
    slug: "ai-n8n-workflow-automation",
    title: "AI Assistants and n8n Workflows That Remove Operational Drag",
    description:
      "Custom AI chat, lead routing, and n8n orchestration connected to your APIs — automation that runs in production, not a demo chatbot.",
    date: "2026-08-12",
    category: "AI",
    keywords: [
      "AI automation",
      "n8n workflows",
      "LLM APIs",
      "AI receptionist",
      "workflow orchestration",
    ],
    body: [
      "AI is useful when it is wired to your actual systems: CRM, inbox, inventory, booking. We build assistants and n8n workflows that call real APIs, with guardrails, logging, and a human fallback — not an unbounded chat toy.",
      "That includes AI receptionist products (site, CRM, staff app), nutrition assistants inside gym platforms, and lead routing that does not drop at 2 a.m. LLM APIs (OpenAI, Claude) sit behind your business rules. n8n handles the glue when ops teams need to see and edit the graph.",
      "We do not sell ‘an AI strategy deck.’ We ship a workflow that moves a ticket, a quote, or a booking from A to B and tell you what it costs per run.",
      "If your team is copy-pasting between tools, that is an automation brief. We will map it, then put it in production.",
    ],
  },
  {
    slug: "react-native-booking-and-ops-apps",
    title: "React Native Apps for Booking, Chat, and Field Ops",
    description:
      "Cross-platform mobile with React Native and Expo: court booking, real-time chat, and staff apps that share a backend with your web console.",
    date: "2026-08-04",
    category: "Mobile",
    keywords: [
      "React Native apps",
      "Expo",
      "mobile app development",
      "booking app",
      "real-time chat",
    ],
    body: [
      "When the customer is on a phone — players booking a court, staff on a hostel floor, drivers on a pickup — we ship React Native with Expo so iOS and Android stay one codebase.",
      "Court Chuno is a futsal booking and live chat app. Vellay’s player client sits next to the owner web console on the same API. AI receptionist staff apps need the same pattern: mobile for the floor, web for HQ.",
      "We keep auth, push, and offline-tolerant lists boring and reliable. Fancy animation is fine after the reservation actually writes.",
      "Need a staff or consumer app that is not a wrapped website? That is a native-feeling React Native build with your existing Node or Nest backend.",
    ],
  },
  {
    slug: "marketplace-and-booking-platforms",
    title: "Marketplaces and Booking Platforms: Airports, Courts, and Inventory",
    description:
      "Lessons from Southampton Port Taxi, sports booking, and circular phone commerce — fixed fares, live inventory, and ops that survive peak hours.",
    date: "2026-07-22",
    category: "Products",
    keywords: [
      "booking platform",
      "marketplace development",
      "airport transfer",
      "inventory system",
      "operations dashboard",
    ],
    body: [
      "Marketplaces fail on operations, not on the landing page. Southampton Port Taxi is a UK cruise-terminal transfer product: book online, know the fare, get to the port. The hard part is the fare graph and the exception path when a ship is late.",
      "Sports booking is the same shape: availability, payments, no-shows, and a console for the venue owner. Phone wholesale adds IMEI, grading, and dual-currency invoices. We treat those as inventory systems with a public face, not as pretty catalogues.",
      "If your product is ‘Uber for X’ or ‘Airbnb for Y,’ come with the operating rules. We will encode them in Postgres, expose them on Next.js, and give ops a dashboard they will actually use.",
    ],
  },
  {
    slug: "founder-led-product-studio",
    title: "A Founder-Led Studio: You Talk to the People Who Ship",
    description:
      "Veltrix Labs is two builders in Lahore serving US, UK, and global clients — no account-manager layer between you and the codebase.",
    date: "2026-07-14",
    category: "Studio",
    keywords: [
      "founder-led studio",
      "full-stack engineers",
      "Lahore software agency",
      "remote product team",
      "hire Next.js developers",
    ],
    body: [
      "Veltrix Labs is Haseeb Gulraiz Khan (Founder) and Hamza Azeem (Co-Founder). We are full-stack. You do not get a relay of PMs translating your product into tickets we never see.",
      "We work remotely from Lahore with clients in the US, UK, and worldwide. Time zones are a calendar problem, not a quality problem. Slack, weekly demos, production URLs.",
      "Start a conversation when you have a real constraint: a date, a stack preference, a broken ops workflow. We will answer with architecture and a timeline — usually within a business day — not a 40-page proposal.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
