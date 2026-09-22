import { PROJECTS, type Project } from "@/lib/projects";
import { SITE_NAME } from "@/lib/seo";

export type TechName =
  | "Next.js"
  | "React"
  | "React Native"
  | "Vue.js"
  | "Angular"
  | "TypeScript"
  | "Tailwind CSS"
  | "Node.js"
  | "Python"
  | "Django"
  | "Laravel"
  | "GraphQL"
  | "PostgreSQL"
  | "MongoDB"
  | "Prisma"
  | "Firebase"
  | "AWS"
  | "Azure"
  | "Docker"
  | "Kubernetes";

export type ServiceName =
  | "Custom Software Development"
  | "Mobile App Development"
  | "Web Application Development"
  | "SaaS Platform Development"
  | "Full-Stack Development"
  | "UI/UX Design & Architecture"
  | "Cloud Migration Services"
  | "API Integration Services"
  | "DevOps Consulting"
  | "Enterprise Software Solutions"
  | "MVP Development for Startups"
  | "Software Refactoring & Maintenance";

export type IndustryName =
  | "E-commerce & Retail"
  | "FinTech & Banking"
  | "Healthcare & HealthTech"
  | "Real Estate & PropTech"
  | "Logistics & Supply Chain"
  | "EdTech & E-Learning"
  | "Sports & Venue Booking"
  | "Automotive & Mobility"
  | "Hospitality & Tourism"
  | "Media & Entertainment"
  | "Manufacturing & Industrial"
  | "On-Demand Services";

export type AudienceName = "Company" | "Agency" | "Services";

export type ServicePage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  tech: TechName;
  service: ServiceName;
  industry: IndustryName;
  audience: AudienceName;
  intro: string;
  industryCopy: string;
  serviceCopy: string;
  techCopy: string;
  audienceCopy: string;
  pains: string[];
  deliverables: string[];
  outcomes: string[];
};

type CopyBlock = {
  pains: string[];
  copy: string;
  deliverables: string[];
};

function slugPart(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toServiceSlug(
  tech: TechName,
  service: ServiceName,
  industry: IndustryName,
  audience: AudienceName,
) {
  return `${slugPart(tech)}-${slugPart(service)}-for-${slugPart(industry)}-${slugPart(audience)}`;
}

export const TECHS: {
  name: TechName;
  copy: string;
  strengths: string[];
}[] = [
  {
    name: "Next.js",
    copy: "We use Next.js for App Router products that need SSR, ISR, edge caching, and programmatic SEO without a separate frontend/backend split. Server Components keep the first paint honest; Route Handlers and server actions keep writes close to the data.",
    strengths: [
      "Server-rendered storefronts and dashboards that rank",
      "Edge-friendly APIs and revalidation for catalog-scale pages",
      "Typed full-stack delivery in one TypeScript codebase",
    ],
  },
  {
    name: "React",
    copy: "React is how we ship dense, interactive UIs — admin consoles, configurators, and real-time boards — without locking you into a single meta-framework. We pair it with a typed API layer and a design system so the product can grow past the first release.",
    strengths: [
      "Component systems that stay maintainable past v1",
      "Real-time and form-heavy interfaces with predictable state",
      "Works as a SPA, microfrontend, or embedded widget",
    ],
  },
  {
    name: "React Native",
    copy: "React Native (and Expo when it fits) lets us ship iOS and Android from one codebase without a second product team. We keep native modules isolated, so camera, maps, payments, and push stay reliable while the product UI iterates weekly.",
    strengths: [
      "One team for iOS, Android, and often a web companion",
      "OTA-friendly release cadence for marketplace and booking apps",
      "Shared TypeScript types with the API you already run",
    ],
  },
  {
    name: "Vue.js",
    copy: "Vue.js is the right call when the team wants a lighter mental model, progressive adoption, or Nuxt-class SEO without React. We use it for storefronts, ops tools, and marketing apps that still need a serious API and auth story.",
    strengths: [
      "Progressive upgrades on existing Vue or Laravel stacks",
      "Nuxt when you need SSR and content at scale",
      "Clear composition-API architecture for growing teams",
    ],
  },
  {
    name: "Angular",
    copy: "Angular is how we build enterprise-grade consoles: opinionated modules, strict typing, and long-lived teams that need guardrails. We use it for banking ops, industrial dashboards, and internal platforms where structure beats novelty.",
    strengths: [
      "Opinionated architecture for large internal products",
      "RxJS-friendly streams for live ops and trading UIs",
      "Easier onboarding for enterprise engineering orgs",
    ],
  },
  {
    name: "TypeScript",
    copy: "TypeScript is the contract layer across our web, mobile, and API work. Shared types between UI and server catch the bugs that would otherwise show up in checkout, booking, and payouts — and they make handover to your team actually possible.",
    strengths: [
      "End-to-end types from database to UI",
      "Safer refactors when the fifth engineer joins",
      "Fewer production surprises in money and inventory flows",
    ],
  },
  {
    name: "Tailwind CSS",
    copy: "Tailwind CSS is how we ship dense product UI without a three-month design-system detour. Tokens, components, and dark-mode rules live in the codebase, so marketing pages and ops consoles stay consistent when the product grows.",
    strengths: [
      "Design tokens that survive a second squad",
      "Fast, consistent UI across marketing and product",
      "No leftover CSS graveyard after six months",
    ],
  },
  {
    name: "Node.js",
    copy: "Node.js is our default for APIs, webhooks, queues, and realtime — the same language as the UI, so one team owns the loop. We use it for booking engines, storefronts, and the glue between payments and ops.",
    strengths: [
      "APIs and realtime on the same runtime as the frontend",
      "Webhook and queue workers that retry instead of dropping events",
      "A stack a product team can hire for",
    ],
  },
  {
    name: "Python",
    copy: "Python is how we add the unglamorous backbone: data jobs, automation, ML-adjacent scoring, and admin tools that operators actually run. We do not dump a notebook into production — we wrap it in an API, logs, and a deploy path.",
    strengths: [
      "Automation and data jobs with real scheduling and alerts",
      "APIs around models instead of a research folder",
      "Fits beside a Node or Django product without a rewrite",
    ],
  },
  {
    name: "Django",
    copy: "Django is the right call when you need a battle-tested admin, auth, and ORM on day one — especially for internal platforms and content-heavy products. We keep it modern (async where it helps, typed where it counts) and do not pretend the built-in admin is the product.",
    strengths: [
      "Auth, admin, and migrations that are already solved",
      "A relational model you can explain to finance",
      "Room for a Vue or React front without fighting the backend",
    ],
  },
  {
    name: "Laravel",
    copy: "Laravel is how we move fast on PHP estates and new products that want queues, policies, and a sane ORM. We use it for portals, booking, and ops tools — then put a real frontend on top when the UI deserves it.",
    strengths: [
      "Queues, mail, and policies without inventing a framework",
      "Clean upgrades on existing PHP products",
      "API resources your React or Vue app can consume",
    ],
  },
  {
    name: "GraphQL",
    copy: "GraphQL is for products with many clients — web, mobile, partner — that cannot keep growing REST variants. We design the schema around the domain, add persisted queries and rate limits, and do not let the graph become a dumping ground.",
    strengths: [
      "One schema for web, mobile, and partners",
      "Typed clients that fail in CI instead of in production",
      "Persisted queries and auth on every field that needs it",
    ],
  },
  {
    name: "PostgreSQL",
    copy: "PostgreSQL is the source of truth for anything with money, inventory, or audit. We design schemas, indexes, and row-level rules before the UI — because a pretty dashboard on a mushy data model is still a liability.",
    strengths: [
      "Schemas that match how the business actually books and bills",
      "Indexes and constraints instead of app-level hope",
      "Backups, replicas, and migrations you can run without us",
    ],
  },
  {
    name: "MongoDB",
    copy: "MongoDB fits catalogs, event logs, and product-shaped documents that would fight a rigid schema in week one. We still add the indexes, validations, and backup story that keep a document store from becoming a junk drawer.",
    strengths: [
      "Flexible documents for catalogs and activity feeds",
      "Indexes and schema validation before the collection explodes",
      "Clear rules for what belongs here versus Postgres",
    ],
  },
  {
    name: "Prisma",
    copy: "Prisma is how we keep TypeScript honest against the database. Migrations, typed queries, and a schema your team can read — so the API does not drift from the tables six weeks after launch.",
    strengths: [
      "Typed queries that match the actual schema",
      "Migrations in git instead of tribal knowledge",
      "Faster feature work once the model is stable",
    ],
  },
  {
    name: "Firebase",
    copy: "Firebase (Auth, Firestore, Cloud Functions, hosting) is how we ship MVPs and realtime apps without standing up a cluster first. We treat security rules as product code, and we plan the exit to a dedicated API when the data model outgrows it.",
    strengths: [
      "Auth, realtime, and push without an ops team on day one",
      "Security rules reviewed like application code",
      "A path off Firestore when you actually need one",
    ],
  },
  {
    name: "AWS",
    copy: "AWS is where production actually lives for most of the products we ship: compute, object storage, queues, and the IAM that keeps keys off laptops. We size it to the product — not a landing-page architecture diagram.",
    strengths: [
      "Environments, IAM, and secrets that match how you ship",
      "Queues and object storage for the jobs a web server should not do",
      "Cost and alarm baselines so launch week is not a surprise",
    ],
  },
  {
    name: "Azure",
    copy: "Azure is the cloud we use when the buyer already lives in Microsoft 365, Entra ID, and enterprise procurement. We map the app to App Service or containers, wire SSO, and keep the resource group something your IT team can own.",
    strengths: [
      "Entra ID / SSO that matches the org chart",
      "Deployments that survive an enterprise security review",
      "A resource layout your internal IT can actually support",
    ],
  },
  {
    name: "Docker",
    copy: "Docker is how we stop the 'works on my machine' tax. Local, preview, and production run the same image — so migrations, workers, and the web process do not diverge the night before launch.",
    strengths: [
      "One image from laptop to production",
      "Workers and cron as first-class containers",
      "Handover that does not require our laptop",
    ],
  },
  {
    name: "Kubernetes",
    copy: "Kubernetes is for products that have earned it: multiple services, rolling deploys, and a team that will actually operate the cluster. We do not put an MVP on k8s to look serious — we put it there when uptime and scale are already the bottleneck.",
    strengths: [
      "Rolling deploys and health checks that mean something",
      "Workloads split so a worker crash does not take the API",
      "Manifests and docs your platform team can take over",
    ],
  },
];

export const SERVICES: {
  name: ServiceName;
  copy: string;
  outcomes: string[];
}[] = [
  {
    name: "Custom Software Development",
    copy: "Bespoke product engineering — not a theme with plugins. We design the data model, the workflows, and the interfaces around how your operation actually runs, then ship in weekly increments you can demo to stakeholders.",
    outcomes: [
      "A system that matches your process instead of forcing a generic CRM",
      "Clear ownership of code, hosting, and the backlog after handover",
      "Room to add modules without rewriting the foundation",
    ],
  },
  {
    name: "Mobile App Development",
    copy: "Mobile products that handle bookings, field ops, wallets, and live status — not brochure apps. We cover store listing, push, offline-tolerant flows, and the API those screens depend on.",
    outcomes: [
      "iOS and Android in one release train",
      "Auth, payments, and notifications wired to production backends",
      "A web admin so ops is not stuck inside the app",
    ],
  },
  {
    name: "Web Application Development",
    copy: "Browser-first products: multi-role dashboards, customer portals, and workflow apps that stay fast on real devices. We treat performance, access control, and audit trails as product features.",
    outcomes: [
      "Role-based portals that non-technical staff can use daily",
      "Search, filters, and exports that hold up past a few hundred records",
      "A stack your team can deploy without a mystery vendor lock-in",
    ],
  },
  {
    name: "SaaS Platform Development",
    copy: "Multi-tenant SaaS with billing, invitations, feature flags, and isolation that will survive a security review. We have shipped venue booking, marketplaces, and ops platforms that onboard tenants without a custom deploy each time.",
    outcomes: [
      "Tenant isolation, roles, and audit logs from day one",
      "Subscription and usage billing hooks instead of spreadsheet invoices",
      "An architecture that can add regions or white-label later",
    ],
  },
  {
    name: "Full-Stack Development",
    copy: "One studio owning UI, API, data, and deploy. That is how we ship storefronts, booking platforms, and internal systems in weeks instead of handing tickets between three vendors.",
    outcomes: [
      "Frontend and backend shipped on the same cadence",
      "Typed contracts so the UI does not drift from the API",
      "CI, staging, and production that a founder can actually run",
    ],
  },
  {
    name: "UI/UX Design & Architecture",
    copy: "Information architecture and interface design for products people use under pressure — checkout, booking, clinical ops, logistics. We prototype flows, not moodboards, then hand engineers a system they can implement without guessing.",
    outcomes: [
      "Flows validated against the real job-to-be-done",
      "A component language that survives the second squad joining",
      "Handoff that includes states, empty screens, and errors — not just happy paths",
    ],
  },
  {
    name: "Cloud Migration Services",
    copy: "Move a legacy app or a brittle VPS setup onto a modern host without a surprise outage. We inventory jobs, sessions, files, and cron, then cut over with a rollback path.",
    outcomes: [
      "A mapped inventory of jobs, files, and third-party keys before cutover",
      "HTTPS, backups, and environments that match how you actually ship",
      "Lower ops toil after the move — not just a new logo on the invoice",
    ],
  },
  {
    name: "API Integration Services",
    copy: "Payments, ERPs, CRMs, maps, shipping, identity, and industry-specific rails. We wrap flaky third parties behind your own contracts so a vendor outage does not take the product down with it.",
    outcomes: [
      "Idempotent webhooks and retries instead of silent missed events",
      "A single internal API your UI and mobile apps can share",
      "Observability when a provider starts 500-ing at 2am",
    ],
  },
  {
    name: "DevOps Consulting",
    copy: "Pipelines, preview environments, secrets, and the boring production hygiene that keeps a product from melting on launch week. We set this up for studios and in-house teams that already write code but ship by SSH.",
    outcomes: [
      "Preview deploys for every meaningful pull request",
      "Secrets and environments that are not living in a Slack thread",
      "A runbook your team can follow without us on the call",
    ],
  },
  {
    name: "Enterprise Software Solutions",
    copy: "Internal platforms with SSO, permissions, audit, and integrations into the tools the business already bought. We build for the operators who live in the product eight hours a day.",
    outcomes: [
      "SSO and role models that match how the org is actually structured",
      "Audit trails that finance and compliance can export",
      "A rollout plan that does not require a big-bang training week",
    ],
  },
  {
    name: "MVP Development for Startups",
    copy: "A first version that can take money, users, or both — without fake scaffolding you throw away in month two. We cut scope to the loop that proves the business, then leave a codebase you can raise on.",
    outcomes: [
      "A shippable product in weeks, not a slide deck with a Figma file",
      "Instrumentation so you know what to build next",
      "Founder-accessible hosting and a backlog that is honest",
    ],
  },
  {
    name: "Software Refactoring & Maintenance",
    copy: "Stabilize a product that works until it does not: tangled React trees, missing tests, a database that grew sideways. We add seams, tests, and a release path so you can keep selling while the internals get safer.",
    outcomes: [
      "A triage of what is risky versus what is merely ugly",
      "Incremental refactors that do not freeze the roadmap",
      "A retainer option for production support after the cleanup",
    ],
  },
];

export const INDUSTRIES: Record<IndustryName, CopyBlock> = {
  "E-commerce & Retail": {
    copy: "Retail software lives or dies on catalog speed, merchandising, checkout reliability, and the unglamorous ops behind inventory, returns, and marketplace feeds. We have shipped storefronts, wholesale portals, and programmatic SEO engines that generate thousands of location pages — including Buy4Low.",
    pains: [
      "Theme-locked storefronts that cannot express how you actually sell",
      "Catalog and inventory living in three spreadsheets and a Shopify admin",
      "SEO pages that never get generated beyond a handful of collections",
    ],
    deliverables: [
      "Storefronts and merchandising tools with real search and filtering",
      "Admin for SKUs, variants, promotions, and fulfillment status",
      "Payment, tax, and shipping integrations that fail loudly, not silently",
      "Programmatic landing pages when the catalog or locations justify them",
    ],
  },
  "FinTech & Banking": {
    copy: "Money products need ledgers you can explain, permissions you can audit, and UI that does not hide a dangerous action behind a cute button. We treat balances, payouts, and KYC as first-class domain — not a Stripe modal dropped on a marketing site.",
    pains: [
      "Spreadsheets standing in for a ledger nobody trusts",
      "Role chaos: every staff member is effectively an admin",
      "Reconciliation that only one person in the company understands",
    ],
    deliverables: [
      "Account, transaction, and audit models with immutable history",
      "Maker-checker flows for payouts and sensitive changes",
      "KYC/AML and payment-provider integrations behind your own API",
      "Ops consoles for support without sharing production database access",
    ],
  },
  "Healthcare & HealthTech": {
    copy: "Health products fail on consent, identity, and messy real-world workflows — not on missing animations. We have built lab and hostel-adjacent ops tools and we design for staff who are already overloaded, not for a demo day.",
    pains: [
      "Paper or WhatsApp still carrying the real patient or sample trail",
      "Identity and consent bolted on after the first release",
      "Clinician UI that looks fine in Figma and collapses on a clinic laptop",
    ],
    deliverables: [
      "Role-separated portals for staff, patients, and partners",
      "Audit logs and access policies you can show a reviewer",
      "Integrations with labs, calendars, and messaging that already exist",
      "Offline-tolerant capture for field or ward-side use where needed",
    ],
  },
  "Real Estate & PropTech": {
    copy: "Listings, inquiries, viewings, and the back-office of units, owners, and commissions. We have shipped estate and ops products where the inventory is physical — so availability cannot be a guess.",
    pains: [
      "Portals that show stale availability and burn agent reputation",
      "Lead intake that dies in a shared inbox",
      "No single view of a unit from listing through handover",
    ],
    deliverables: [
      "Listing sites with honest availability and inquiry routing",
      "Agent and owner consoles with documents and commission trails",
      "Map, CRM, and messaging integrations",
      "Internal ops for units, tenants, and maintenance tickets",
    ],
  },
  "Logistics & Supply Chain": {
    copy: "If the system cannot answer where a unit is, who touched it, and what is late, it is not a logistics product. We build tracking, inventory, and partner portals that survive messy warehouse reality.",
    pains: [
      "Status living in phone calls and a whiteboard",
      "Partners uploading CSVs that nobody validates",
      "No exception queue when a scan or ETA breaks",
    ],
    deliverables: [
      "Scan-friendly inventory and shipment status",
      "Carrier and warehouse partner APIs with retries",
      "Exception dashboards for late, damaged, and missing units",
      "Customer-facing tracking that does not leak internal notes",
    ],
  },
  "EdTech & E-Learning": {
    copy: "Learning products need cohorts, content, progress, and the unglamorous billing of seats. We design for teachers and ops staff first — students will not stay if the admin side is chaos.",
    pains: [
      "Content and progress split across Drive, Zoom, and a forgotten LMS",
      "No clean way to sell seats, cohorts, or certifications",
      "Mobile learners stuck on a desktop-only portal",
    ],
    deliverables: [
      "Cohort, lesson, and progress models with real completion rules",
      "Instructor and student apps that work on phones",
      "Payments, coupons, and access windows",
      "Reporting that a school or academy can actually export",
    ],
  },
  "Sports & Venue Booking": {
    copy: "Courts, slots, no-shows, and the politics of peak hours. We shipped Vellay (multi-venue sports SaaS) and Court Chuno — so we already know the inventory is time, not SKUs, and that owners need a console as much as players need an app.",
    pains: [
      "Double-bookings because WhatsApp is the reservation system",
      "Owners who cannot see utilization across venues",
      "Players bouncing because payment and slot confirmation are separate steps",
    ],
    deliverables: [
      "Slot inventory with holds, payments, and no-show rules",
      "Owner consoles, player web, and mobile clients",
      "Memberships, peak pricing, and coach or referee assignment",
      "Realtime chat or status where the sport actually needs it",
    ],
  },
  "Automotive & Mobility": {
    copy: "Fleets, service bays, parts, and riders who will not wait for a spinner. Mobility products mix maps, dispatch, and payments — we keep those as explicit domains so a map outage does not take billing with it.",
    pains: [
      "Dispatch happening in a group chat",
      "Vehicle or bay status that is never in sync with the customer view",
      "Pricing rules nobody can change without an engineer",
    ],
    deliverables: [
      "Dispatch and tracking with a fallback when GPS is noisy",
      "Driver, rider, and ops roles with separate apps or portals",
      "Service-bay and parts inventory when the business is workshops",
      "Fare, toll, and payout calculations you can audit",
    ],
  },
  "Hospitality & Tourism": {
    copy: "Rooms, transfers, and guest messaging have brutal peak days. We have built hostel ops (Hostelos) and Southampton cruise-port taxi booking — inventory, rates, and exception handling for travelers who will not read your FAQ.",
    pains: [
      "Overbooking because the channel manager and the front desk disagree",
      "Airport and hotel add-ons sold in email threads",
      "Guests who cannot self-serve a change without calling",
    ],
    deliverables: [
      "Booking engines with rates, extras, and cancellation policy",
      "Ops boards for check-in, vehicles, or rooms",
      "Flight or calendar integrations where they actually reduce work",
      "Guest portals that work on a phone in a taxi queue",
    ],
  },
  "Media & Entertainment": {
    copy: "Catalogs, rights, publishing calendars, and fans who bounce if playback or checkout stutters. We build the CMS, the consumer surface, and the billing around how the catalog is actually licensed.",
    pains: [
      "A CMS that cannot express seasons, rights windows, or talent",
      "Consumer apps that stall on media and kill conversion",
      "No shared truth between editorial and ads or merch",
    ],
    deliverables: [
      "Editorial CMS with roles and scheduled publishing",
      "Consumer web or app experiences with real performance budgets",
      "Entitlements, paywalls, or ticketing as first-class flows",
      "Analytics that editorial will actually open",
    ],
  },
  "Manufacturing & Industrial": {
    copy: "Shop-floor software has to respect shift change, scanners, and the ERP you are not replacing on day one. We build the operator UI and the integration layer — not another dashboard nobody walks to.",
    pains: [
      "Work orders living on paper next to an unused SAP screen",
      "Quality and inventory updates that lag the physical line",
      "A vendor portal that is just a shared mailbox",
    ],
    deliverables: [
      "Work-order and quality capture that works with gloves and scanners",
      "ERP and MES integrations with explicit failure queues",
      "Supplier portals for POs and ASNs",
      "Shift-level reporting without exporting to Excel first",
    ],
  },
  "On-Demand Services": {
    copy: "Matching supply to a request in minutes: jobs, providers, SLAs, and payouts. We have shipped marketplace and booking products where the unit of inventory is a person or a vehicle, not a warehouse bin.",
    pains: [
      "Providers managed in spreadsheets and group chats",
      "Customers who cannot see ETA or status after they pay",
      "Payouts that require a founder to run payroll by hand",
    ],
    deliverables: [
      "Request, dispatch, and completion flows with SLA clocks",
      "Provider apps with jobs, navigation, and earnings",
      "Customer tracking and support tools",
      "Payout and commission rules that finance can change",
    ],
  },
};

export const AUDIENCES: Record<
  AudienceName,
  { noun: string; copy: string; cta: string }
> = {
  Company: {
    noun: "companies",
    copy: "You are the operator or product owner. You need a studio that will own the build, say no to fake scope, and hand you a system your team can run — not a slide deck and a retainer trap.",
    cta: "Talk through the first release with the founders who will actually build it.",
  },
  Agency: {
    noun: "agencies",
    copy: "You already have the client. You need overflow engineering that can sit inside your process, match your quality bar, and stay invisible to the brand when that is the deal — without disappearing when the first production bug hits.",
    cta: "Bring the brief. We will tell you what we can white-label and what we will not pretend to own.",
  },
  Services: {
    noun: "service businesses",
    copy: "You sell a service, not a download. The software is how you take bookings, dispatch people, and get paid. We build that operational layer so the business is not trapped in WhatsApp and a shared inbox.",
    cta: "Show us how a job moves today. We will map the first system that replaces the chat thread.",
  },
};

const INDUSTRY_PROJECTS: Record<IndustryName, string[]> = {
  "E-commerce & Retail": [
    "buy4low",
    "atlantic-devices",
    "shes-trends",
    "splendid",
    "hajar",
    "reworrked",
    "juice-company",
  ],
  "FinTech & Banking": [
    "accounting-system",
    "auto-trading-bot",
    "crm-system",
    "erp-saas",
  ],
  "Healthcare & HealthTech": ["aureon-lims", "ostello", "hostelos"],
  "Real Estate & PropTech": ["gt-estate", "real-estate-ops"],
  "Logistics & Supply Chain": [
    "inventory-management",
    "erp-saas",
    "dongsung",
    "s-oil",
  ],
  "EdTech & E-Learning": ["ostello", "mern-cms", "manpowerhub"],
  "Sports & Venue Booking": ["vellay", "vellay-app", "court-chuno", "table-tennis-backend"],
  "Automotive & Mobility": ["flex-fuel", "southampton-port-taxi", "inventory-management"],
  "Hospitality & Tourism": ["hostelos", "southampton-port-taxi", "ostello"],
  "Media & Entertainment": ["voxdesk", "degn", "zallo"],
  "Manufacturing & Industrial": [
    "inventory-management",
    "erp-saas",
    "hrm-system",
    "dongsung",
  ],
  "On-Demand Services": ["southampton-port-taxi", "vellay", "manpowerhub", "zallo", "court-chuno"],
};

function buildPages(): ServicePage[] {
  const pages: ServicePage[] = [];

  for (const tech of TECHS) {
    for (const service of SERVICES) {
      for (const industryName of Object.keys(INDUSTRIES) as IndustryName[]) {
        for (const audienceName of Object.keys(AUDIENCES) as AudienceName[]) {
          const industry = INDUSTRIES[industryName];
          const audience = AUDIENCES[audienceName];
          const slug = toServiceSlug(
            tech.name,
            service.name,
            industryName,
            audienceName,
          );
          const title = `${tech.name} ${service.name} for ${industryName} ${audienceName}`;
          const description = `${SITE_NAME} builds ${tech.name} ${service.name.toLowerCase()} for ${industryName.toLowerCase()} ${audience.noun}. Founder-led studio, weekly production releases, US · UK · global.`;

          pages.push({
            slug,
            path: `/services/${slug}`,
            title,
            description:
              description.length > 158
                ? `${description.slice(0, 155).trim()}…`
                : description,
            keywords: [
              tech.name,
              service.name,
              industryName,
              `${tech.name} ${service.name}`,
              `${industryName} software`,
              `${tech.name} ${audienceName.toLowerCase()}`,
              SITE_NAME,
            ],
            tech: tech.name,
            service: service.name,
            industry: industryName,
            audience: audienceName,
            intro: `${SITE_NAME} builds ${service.name.toLowerCase()} in ${tech.name} for ${industryName} ${audience.noun}. ${audience.copy}`,
            industryCopy: industry.copy,
            serviceCopy: service.copy,
            techCopy: tech.copy,
            audienceCopy: audience.copy,
            pains: industry.pains,
            deliverables: industry.deliverables,
            outcomes: service.outcomes,
          });
        }
      }
    }
  }

  return pages;
}

export const SERVICE_PAGES = buildPages();

const PAGE_BY_SLUG = new Map(SERVICE_PAGES.map((page) => [page.slug, page]));

const SERVICE_NAMES = SERVICES.map((item) => item.name);
const INDUSTRY_NAMES = Object.keys(INDUSTRIES) as IndustryName[];
const TECH_NAMES = TECHS.map((item) => item.name);
const AUDIENCE_NAMES = Object.keys(AUDIENCES) as AudienceName[];

export function getServicePage(slug: string) {
  return PAGE_BY_SLUG.get(slug);
}

export function relatedProjectsFor(page: ServicePage, limit = 3): Project[] {
  const preferred = INDUSTRY_PROJECTS[page.industry] ?? [];
  const picked: Project[] = [];

  for (const slug of preferred) {
    const project = PROJECTS.find((item) => item.slug === slug);
    if (project) picked.push(project);
    if (picked.length >= limit) return picked;
  }

  const mobileBias =
    page.service === "Mobile App Development" || page.tech === "React Native";
  const saasBias =
    page.service === "SaaS Platform Development" ||
    page.service === "Enterprise Software Solutions";

  for (const project of PROJECTS) {
    if (picked.some((item) => item.slug === project.slug)) continue;
    if (mobileBias && project.category === "Mobile") picked.push(project);
    else if (saasBias && project.category === "SaaS & Dashboards")
      picked.push(project);
    else if (
      page.industry.includes("E-commerce") &&
      project.category === "E-commerce"
    )
      picked.push(project);
    if (picked.length >= limit) return picked;
  }

  for (const project of PROJECTS) {
    if (picked.some((item) => item.slug === project.slug)) continue;
    picked.push(project);
    if (picked.length >= limit) return picked;
  }

  return picked;
}

export function relatedPagesFor(page: ServicePage, limit = 6): ServicePage[] {
  const slugs: string[] = [];

  const add = (
    tech: TechName,
    service: ServiceName,
    industry: IndustryName,
    audience: AudienceName,
  ) => {
    if (slugs.length >= limit) return;
    const slug = toServiceSlug(tech, service, industry, audience);
    if (slug === page.slug || slugs.includes(slug)) return;
    if (PAGE_BY_SLUG.has(slug)) slugs.push(slug);
  };

  const pickNth = <T,>(items: readonly T[], current: T, n: number) => {
    let seen = 0;
    for (const item of items) {
      if (item === current) continue;
      seen += 1;
      if (seen === n) return item;
    }
    return undefined;
  };

  const otherService = pickNth(SERVICE_NAMES, page.service, 1);
  if (otherService) add(page.tech, otherService, page.industry, page.audience);

  const otherIndustry = pickNth(INDUSTRY_NAMES, page.industry, 1);
  if (otherIndustry) add(page.tech, page.service, otherIndustry, page.audience);

  const otherTech = pickNth(TECH_NAMES, page.tech, 1);
  if (otherTech) add(otherTech, page.service, page.industry, page.audience);

  const otherAudience = pickNth(AUDIENCE_NAMES, page.audience, 1);
  if (otherAudience) add(page.tech, page.service, page.industry, otherAudience);

  const secondService = pickNth(SERVICE_NAMES, page.service, 2);
  if (secondService) add(page.tech, secondService, page.industry, page.audience);

  const secondIndustry = pickNth(INDUSTRY_NAMES, page.industry, 2);
  if (secondIndustry) add(page.tech, page.service, secondIndustry, page.audience);

  return slugs
    .map((slug) => PAGE_BY_SLUG.get(slug))
    .filter((item): item is ServicePage => Boolean(item));
}

export function pagesByIndustry() {
  const grouped = new Map<IndustryName, ServicePage[]>();
  for (const page of SERVICE_PAGES) {
    const list = grouped.get(page.industry) ?? [];
    list.push(page);
    grouped.set(page.industry, list);
  }
  return grouped;
}
