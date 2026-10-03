"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lottie, LottieInteractions, lottieInView } from "lottie-react";
import SplitReveal from "@/components/SplitReveal";
import { IMAGES } from "@/lib/constants";
import blueprint from "../../public/lottie/blueprint.json";
import build from "../../public/lottie/build.json";
import scale from "../../public/lottie/scale.json";

const steps = [
  {
    step: "01",
    title: "Discovery & Architecture Blueprint",
    copy: "Mapping requirements, stack selection, and workflow design. We leave with a build plan — not a 40-page deck.",
    image: IMAGES.processDiscovery,
    imageAlt: "Architecture blueprints and system mapping",
    animation: blueprint,
  },
  {
    step: "02",
    title: "Rapid Build & Integration",
    copy: "Shipping clean code, custom dashboards, and AI/n8n automation. Progress is visible weekly, in production-shaped increments.",
    image: IMAGES.processBuild,
    imageAlt: "Engineer writing production application code",
    animation: build,
  },
  {
    step: "03",
    title: "Deployment & Scale",
    copy: "CI/CD setups, performance optimization, and monitoring. The product launches ready to take load — then we keep tightening.",
    image: IMAGES.processScale,
    imageAlt: "Global infrastructure and scale visualization",
    animation: scale,
  },
];

// Each icon plays once, when its card is actually on screen.
const PLAY_IN_VIEW = [lottieInView({ once: true, amount: 0.6 })];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const node = root.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");

      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          once: true,
          onEnter: () => {
            card.classList.add("is-live");
          },
        });
      });

      if (reduced) return;

      gsap.from(cards, {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-grid", start: "top 80%" },
      });

      gsap.fromTo(
        ".process-line",
        { scaleX: 0, scaleY: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        },
      );
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={root}
      className="relative isolate z-10 scroll-mt-24 overflow-hidden bg-obsidian py-16 md:scroll-mt-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl md:mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-purple-neon">
            3-Step Process
          </p>
          <SplitReveal className="mt-3 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            A path from brief to production.
          </SplitReveal>
        </div>

        <div className="process-grid relative grid gap-6 lg:grid-cols-3">
          {/* Connector: vertical on stacked layouts, horizontal on desktop. */}
          <div className="pointer-events-none absolute bottom-6 left-7 top-6 w-px bg-white/8 lg:hidden">
            <div className="process-line h-full w-full origin-top bg-gradient-to-b from-cyan-electric via-indigo-glow to-purple-neon" />
          </div>
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[11.75rem] hidden h-px bg-white/8 lg:block">
            <div className="process-line h-full w-full origin-left bg-gradient-to-r from-cyan-electric via-indigo-glow to-purple-neon" />
          </div>

          {steps.map((item) => (
            <article
              key={item.step}
              className="process-card group relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-slate-card transition-colors duration-500 hover:border-cyan-electric/30"
            >
              <div className="relative h-44">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-card to-transparent" />
                <div className="absolute bottom-4 right-4 h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-obsidian/80 p-1 backdrop-blur">
                  <LottieInteractions interactions={PLAY_IN_VIEW}>
                    <Lottie
                      src={item.animation}
                      loop={false}
                      autoplay={false}
                      className="h-full w-full"
                    />
                  </LottieInteractions>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <p className="process-step inline-flex items-center gap-2 font-mono text-sm text-cyan-electric">
                  <span className="process-dot h-2 w-2 rounded-full bg-white/20 transition-all duration-700" />
                  {item.step}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
