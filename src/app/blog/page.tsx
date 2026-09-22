import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog";
import { BLOG_DESCRIPTION, BLOG_TITLE, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  path: "/blog",
  keywords: [
    "Veltrix Labs blog",
    "Next.js agency",
    "Shopify development",
    "SaaS dashboards",
    "AI automation",
    "React Native",
  ],
});

export default function BlogIndexPage() {
  return (
    <main id="top" className="min-h-screen bg-obsidian">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">Journal</p>
        <h1 className="mt-3 max-w-2xl text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Notes from the studio.
        </h1>
        <p className="mt-4 max-w-xl text-zinc-400">
          Real delivery notes — not keyword dumps. Each piece maps to work we
          actually ship.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[1.6rem] border border-white/10 bg-slate-card p-6 transition hover:border-cyan-electric/40"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-electric">
                {post.category} · {post.date}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-zinc-50 group-hover:text-cyan-electric">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
