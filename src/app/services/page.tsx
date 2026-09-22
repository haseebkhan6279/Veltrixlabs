import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  INDUSTRIES,
  SERVICES,
  SERVICE_PAGES,
  TECHS,
  toServiceSlug,
  type IndustryName,
} from "@/lib/service-pages";
import {
  SERVICES_DESCRIPTION,
  SERVICES_TITLE,
  buildMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  path: "/services",
  keywords: [
    "software development services",
    "Next.js agency",
    "SaaS development",
    "custom APIs",
    "industry software",
    "Veltrix Labs",
  ],
});

const INDUSTRY_NAMES = Object.keys(INDUSTRIES) as IndustryName[];

function techAnchor(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function ServicesIndexPage() {
  return (
    <main id="top" className="min-h-screen bg-obsidian">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
          Services
        </p>
        <h1 className="mt-3 max-w-3xl text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Software by stack, industry, and who is buying.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          {SERVICE_PAGES.length.toLocaleString()} focused briefs from the full
          keyword matrix — 20 stacks × 12 services × 12 industries × Company,
          Agency, and Services. Every URL has a canonical, unique copy, and
          related studio projects. Agency and Services variants sit on each
          brief.
        </p>

        <nav className="mt-8 flex flex-wrap gap-2">
          {TECHS.map((tech) => (
            <a
              key={tech.name}
              href={`#${techAnchor(tech.name)}`}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300 hover:border-cyan-electric/40 hover:text-cyan-electric"
            >
              {tech.name}
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {TECHS.map((tech) => (
            <section key={tech.name} id={techAnchor(tech.name)}>
              <h2 className="text-2xl font-semibold text-zinc-50">{tech.name}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
                {tech.copy}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {INDUSTRY_NAMES.map((industry) => (
                  <div
                    key={`${tech.name}-${industry}`}
                    className="rounded-2xl border border-white/10 bg-slate-card p-4"
                  >
                    <h3 className="text-sm font-semibold text-cyan-electric">
                      {industry}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                      {SERVICES.map((service) => {
                        const slug = toServiceSlug(
                          tech.name,
                          service.name,
                          industry,
                          "Company",
                        );
                        return (
                          <li key={slug}>
                            <a
                              href={`/services/${slug}`}
                              className="text-xs text-zinc-400 hover:text-cyan-electric"
                            >
                              {service.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
