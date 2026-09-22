"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import SplitReveal from "@/components/SplitReveal";
import {
  PROJECT_FILTERS,
  PROJECTS,
  projectInCategory,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";

const PREVIEW_COUNT = 9;

const FILTER_LABEL: Record<(typeof PROJECT_FILTERS)[number], string> = {
  All: "All",
  "E-commerce": "E-commerce",
  "SaaS & Dashboards": "SaaS",
  Booking: "Booking",
  Mobile: "Mobile",
  Web3: "Web3",
  AI: "AI",
  Websites: "Websites",
};

export default function CaseStudies() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const [visibleCount, setVisibleCount] = useState(PREVIEW_COUNT);

  const visible = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) =>
            projectInCategory(p, filter as ProjectCategory),
          ),
    [filter],
  );

  useEffect(() => {
    setVisibleCount(PREVIEW_COUNT);
  }, [filter]);

  const shown = visible.slice(0, visibleCount);
  const showLoadMore = visible.length > visibleCount;

  useEffect(() => {
    let cancelled = false;
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, [shown.length]);

  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-purple-neon/10 blur-[100px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-purple-neon">
              Case Studies
            </p>
            <SplitReveal className="mt-3 max-w-xl text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              {`${PROJECTS.length} products. One studio.`}
            </SplitReveal>
          </div>
          <p className="max-w-md text-sm text-zinc-400">
            Every card is a real system from the D: drive — hover to watch a live
            recording where we have one.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter case studies"
          className="mb-8 flex flex-nowrap gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] md:mb-12 md:flex-wrap [&::-webkit-scrollbar]:hidden"
        >
          {PROJECT_FILTERS.map((item) => {
            const active = item === filter;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-xl px-3.5 py-2.5 text-sm font-medium transition sm:px-4 ${
                  active
                    ? "bg-gradient-to-r from-cyan-electric to-purple-neon text-obsidian shadow-[0_0_22px_rgba(34,211,238,0.28)]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                {FILTER_LABEL[item]}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((project, index) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.04 }}
              >
                <ProjectCard project={project} filter={filter} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {showLoadMore ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              aria-expanded={!showLoadMore}
              onClick={() => setVisibleCount((count) => count + PREVIEW_COUNT)}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pl-6 pr-2 text-sm font-semibold text-zinc-100 transition hover:border-cyan-electric/40 hover:bg-white/10"
            >
              Load more projects
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-cyan-electric to-purple-neon text-obsidian">
                <ArrowDown className="h-4 w-4" />
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function playPreview(video: HTMLVideoElement | null) {
  if (!video) return;
  const attempt = video.play();
  if (attempt) {
    attempt.catch(() => {
      // Fast hover in/out aborts play(); that is expected.
    });
  }
}

function stopPreview(video: HTMLVideoElement | null) {
  if (!video) return;
  video.pause();
  if (video.readyState >= 1) {
    try {
      video.currentTime = 0;
    } catch {
      // Ignore seeks before the media is ready.
    }
  }
}

function ProjectCard({
  project,
  filter,
}: {
  project: Project;
  filter: (typeof PROJECT_FILTERS)[number];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hot, setHot] = useState(false);

  const onEnter = () => {
    setHot(true);
    playPreview(videoRef.current);
  };
  const onLeave = () => {
    setHot(false);
    stopPreview(videoRef.current);
  };

  const dashboardHref = project.dashboardUrl;
  const siteHref =
    project.url && project.url !== project.dashboardUrl ? project.url : undefined;
  const primaryHref = dashboardHref ?? project.url;
  const badge =
    filter === "SaaS & Dashboards" &&
    projectInCategory(project, "SaaS & Dashboards")
      ? "SaaS & Dashboards"
      : project.category;

  return (
    <TiltCard
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-charcoal"
    >
      <div className="relative h-44 overflow-hidden sm:h-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={encodeURI(project.image)}
          alt={project.name}
          className={`h-full w-full object-cover object-top transition duration-700 ${hot ? "scale-105" : "scale-100"}`}
        />
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${hot ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 max-w-[58%] truncate rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-cyan-electric backdrop-blur sm:left-4 sm:top-4 sm:max-w-none sm:px-3">
          {badge}
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-zinc-200 backdrop-blur sm:right-4 sm:top-4 sm:px-3">
          {project.status}
        </span>
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-zinc-50 md:text-2xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm font-semibold leading-snug text-cyan-electric/95">
              {project.outcome ?? project.tagline}
            </p>
          </div>
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name}`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:bg-white hover:text-obsidian"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-300">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>
        {dashboardHref ? (
          <a
            href={dashboardHref}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-electric to-purple-neon px-3.5 py-1.5 text-[12px] font-semibold text-obsidian"
          >
            Open dashboard
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {project.stack.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300"
            >
              {item}
            </span>
          ))}
          {siteHref ? (
            <a
              href={siteHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-100 transition hover:border-cyan-electric/40 hover:text-cyan-electric"
            >
              Website
            </a>
          ) : null}
          {project.appStoreUrl ? (
            <a
              href={project.appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-100 transition hover:border-cyan-electric/40 hover:text-cyan-electric"
            >
              App Store
            </a>
          ) : null}
          {project.playStoreUrl ? (
            <a
              href={project.playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-100 transition hover:border-cyan-electric/40 hover:text-cyan-electric"
            >
              Play Store
            </a>
          ) : null}
        </div>
      </div>
    </TiltCard>
  );
}

