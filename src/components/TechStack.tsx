"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, utils } from "animejs";
import { TECH_STACK } from "@/lib/constants";

export default function TechStack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const chips = root.current?.querySelectorAll(".tech-chip");
    if (!chips?.length) return;

    const animation = animate(chips, {
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.92, 1],
      delay: stagger(55, { start: 120 }),
      duration: 720,
      ease: "outExpo",
      autoplay: false,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          animation.play();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loopers = root.current?.querySelectorAll(".orbit-dot");
    if (!loopers?.length) return;

    animate(loopers, {
      translateY: () => utils.random(-10, 10),
      opacity: [0.35, 1],
      duration: 1800,
      ease: "inOutSine",
      loop: true,
      alternate: true,
      delay: stagger(140),
    });
  }, []);

  const doubled = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      id="stack"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
            Tech Stack &amp; Integrations
          </p>
          <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            The ecosystem we ship with.
          </h2>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="tech-chip rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 opacity-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-obsidian to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-obsidian to-transparent md:w-24" />
        <div className="flex overflow-hidden">
          <div className="tech-track flex min-w-full shrink-0 gap-4 pr-4">
            {doubled.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="orbit-dot inline-flex items-center gap-2 rounded-2xl border border-cyan-electric/20 bg-gradient-to-r from-cyan-electric/10 to-purple-neon/10 px-6 py-3 text-sm font-medium text-zinc-100"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-electric" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
