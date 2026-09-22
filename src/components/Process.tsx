"use client";

import Image from "next/image";
import { Lottie } from "lottie-react";
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

export default function Process() {
  return (
    <section
      id="process"
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

        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((item) => (
            <article
              key={item.step}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-slate-card"
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
                  <Lottie
                    src={item.animation}
                    loop={false}
                    autoplay
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <p className="font-mono text-sm text-cyan-electric">{item.step}</p>
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
