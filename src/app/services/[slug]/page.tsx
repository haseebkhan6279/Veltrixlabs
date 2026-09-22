import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getServicePage,
  relatedPagesFor,
  relatedProjectsFor,
  SERVICE_PAGES,
  AUDIENCES,
} from "@/lib/service-pages";
import { SITE_NAME, SITE_URL, buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) {
    return { title: "Service not found", robots: { index: false, follow: false } };
  }
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: page.keywords,
  });
}

export default async function ServiceLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const projects = relatedProjectsFor(page);
  const related = relatedPagesFor(page);
  const audience = AUDIENCES[page.audience];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.description,
    url: `${SITE_URL}${page.path}`,
    areaServed: ["US", "GB", "Worldwide"],
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: page.service,
    audience: {
      "@type": "Audience",
      audienceType: `${page.industry} ${page.audience}`,
    },
  };

  return (
    <main id="top" className="min-h-screen bg-obsidian">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <article className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          <Link href="/services" className="text-cyan-electric hover:underline">
            Services
          </Link>
          <span aria-hidden>/</span>
          <span>{page.tech}</span>
          <span aria-hidden>/</span>
          <span>{page.industry}</span>
        </nav>

        <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-cyan-electric">
          {page.tech} · {page.service} · {page.audience}
        </p>
        <h1 className="mt-3 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-400">{page.intro}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Stack", value: page.tech },
            { label: "Focus", value: page.industry },
            { label: "Built for", value: page.audience },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-slate-card px-4 py-3"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-100">{item.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-zinc-50">
            What {page.industry} teams actually need
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-300">{page.industryCopy}</p>
          <ul className="mt-6 space-y-3">
            {page.pains.map((pain) => (
              <li
                key={pain}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300"
              >
                {pain}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-zinc-50">
            {page.service} with {page.tech}
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-300">{page.serviceCopy}</p>
          <p className="mt-4 leading-relaxed text-zinc-300">{page.techCopy}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {page.deliverables.map((item) => (
              <p
                key={item}
                className="rounded-2xl border border-cyan-electric/15 bg-cyan-electric/5 px-4 py-3 text-sm text-zinc-200"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-zinc-50">What you walk away with</h2>
          <ul className="mt-5 space-y-3 text-zinc-300">
            {page.outcomes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-electric" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {projects.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold text-zinc-50">Related work from the studio</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Adjacent products we have already shipped — not stock case studies.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {projects.map((project) => (
                <a
                  key={project.slug}
                  href={project.url ?? "/#work"}
                  className="rounded-2xl border border-white/10 bg-slate-card p-4 transition hover:border-cyan-electric/40"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-electric">
                    {project.category}
                  </p>
                  <p className="mt-2 font-semibold text-zinc-50">{project.name}</p>
                  <p className="mt-2 text-sm text-zinc-400">{project.tagline}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold text-zinc-50">Nearby briefs</h2>
            <ul className="mt-5 space-y-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.path}
                    className="text-sm text-zinc-300 transition hover:text-cyan-electric"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-16 rounded-[1.75rem] border border-white/10 bg-slate-card p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-electric">
            Next step
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-50">{audience.cta}</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {page.audienceCopy}
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-cyan-electric to-purple-neon px-5 py-2.5 text-sm font-semibold text-obsidian"
          >
            Start a project
          </Link>
        </section>
      </article>
      <Footer />
    </main>
  );
}
