import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { NAV_LINKS } from "@/lib/constants";
import { SITE_EMAIL, SITE_LOCATION, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";
import { TEAM } from "@/lib/team";

const founder = TEAM[0];

const socials = [
  {
    href: founder.linkedIn,
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M6.5 9H3.8v11.2H6.5V9ZM5.15 3.8A1.58 1.58 0 1 0 5.16 7a1.58 1.58 0 0 0 0-3.2ZM20.2 13.05c0-3.08-1.64-4.52-3.83-4.52-1.76 0-2.55 1-3 1.7V9H10.7c.04.86 0 11.2 0 11.2h2.68v-6.26c0-.33.02-.67.12-.91.27-.67.88-1.37 1.91-1.37 1.35 0 1.89 1.03 1.89 2.54v6H20.2v-6.2Z" />
      </svg>
    ),
  },
  {
    href: founder.github ?? "https://github.com/haseebkhan6279",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 1.64.83a2 2 0 0 1 .6-1.25c-2.22-.25-4.55-1.11-4.55-4.95A3.87 3.87 0 0 1 6.7 7.1a3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1.02a9.47 9.47 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.4.1 2.65a3.87 3.87 0 0 1 1.03 2.69c0 3.85-2.34 4.7-4.57 4.95a2.4 2.4 0 0 1 .68 1.86v2.76c0 .10.0.1.4.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    href: `mailto:${SITE_EMAIL}`,
    label: "Email",
    icon: <Mail className="h-4 w-4" />,
  },
];

const builds = [
  { href: "/#services", label: "Web & Mobile" },
  { href: "/#services", label: "SaaS & Dashboards" },
  { href: "/#services", label: "Shopify & Commerce" },
  { href: "/#services", label: "AI Automation" },
  { href: "/services", label: "All 8,640 niches" },
];

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-50"
    >
      <span className="bg-gradient-to-r from-cyan-electric to-purple-neon bg-[length:0_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-electric/70 to-purple-neon/70" />
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-electric/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-neon/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.85fr] lg:gap-16">
          <div className="max-w-md">
            <a href="/" className="inline-flex items-center gap-3">
              <BrandLogo size={44} />
              <span>
                <span className="block text-base font-semibold tracking-wide text-zinc-50">
                  {SITE_NAME}
                </span>
                <span className="block text-[11px] text-zinc-500">
                  Build. Automate. Scale.
                </span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-zinc-400">
              {SITE_TAGLINE} Founder-led product studio in {SITE_LOCATION} —
              shipping for the US, UK, and globally.
            </p>
            <a
              href="/#contact"
              className="glow-btn mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-obsidian"
            >
              Book a Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="mt-8 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-zinc-400 transition hover:-translate-y-1 hover:border-cyan-electric/40 hover:text-cyan-electric"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-electric">
                Studio
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-electric">
                Build
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {builds.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-electric">
                Contact
              </p>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
                <li>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="inline-flex items-center gap-2 transition hover:text-zinc-50"
                  >
                    <Mail className="h-3.5 w-3.5 text-cyan-electric" />
                    {SITE_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${founder.email}`}
                    className="transition hover:text-zinc-50"
                  >
                    {founder.email}
                  </a>
                </li>
                <li className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-electric" />
                  <span>
                    {SITE_LOCATION}
                    <br />
                    US, UK &amp; Global
                  </span>
                </li>
                <li>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-electric/20 bg-cyan-electric/5 px-3 py-1 text-[11px] text-cyan-electric">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-electric shadow-[0_0_10px_#22d3ee]" />
                    Booking new builds
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/8 py-6 text-xs text-zinc-500 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="sm:text-right">
            Founder-led · No account-manager layer · Production in weeks
          </p>
        </div>
      </div>
    </footer>
  );
}
