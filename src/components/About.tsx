"use client";

import Image from "next/image";
import { animated, useInView, useSpring, useTrail } from "@react-spring/web";
import { Gauge, ShieldCheck, Workflow } from "lucide-react";

const pillars = [
  {
    title: "High-Speed Delivery",
    copy: "Weeks, not quarters. Architecture that is opinionated enough to ship and flexible enough to scale.",
    icon: Gauge,
  },
  {
    title: "End-to-End Ownership",
    copy: "Database, frontend polish, APIs, automation, and deployment. One studio. Zero finger-pointing.",
    icon: ShieldCheck,
  },
  {
    title: "Battle-Tested Tech Stack",
    copy: "Tools we run in production daily — Next.js, Shopify, n8n, Postgres, and AI APIs that actually hold load.",
    icon: Workflow,
  },
];

export default function About() {
  const [ref, inView] = useInView({ once: true, amount: 0.28 });

  const imageSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0px) scale(1)" : "translateX(-48px) scale(0.96)",
    config: { tension: 160, friction: 22 },
  });

  const copySpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(36px)",
    delay: 120,
    config: { tension: 170, friction: 24 },
  });

  const trail = useTrail(pillars.length, {
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 28,
    delay: 280,
    config: { tension: 190, friction: 20 },
  });

  return (
    <section id="about" className="relative scroll-mt-24 py-16 md:scroll-mt-28 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <animated.div style={imageSpring} className="relative">
          <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-br from-cyan-electric/25 to-purple-neon/25 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="/images/about-studio.png"
              alt="Veltrix Labs workspace"
              width={1600}
              height={1200}
              className="h-56 w-full object-cover object-center sm:h-[420px] md:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-3 sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-electric">
                Engineering ethos
              </p>
              <p className="mt-1 text-sm text-zinc-200">
                Founded by full-stack engineers who ship, not slide decks.
              </p>
            </div>
          </div>
        </animated.div>

        <div ref={ref}>
          <animated.div style={copySpring}>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
              About Veltrix
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              Engineered with Speed. Built to Own the Stack.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              We don&apos;t sell fluff or endless discovery cycles. Founded by
              full-stack engineers who build by shipping real, production-ready
              systems, Veltrix Labs brings speed, precision, and ownership to
              every project. From database design to frontend polish and
              automated deployment, we own the full stack—so your product
              launches on time, every time.
            </p>
          </animated.div>

          <div className="mt-8 grid gap-4">
            {trail.map((style, index) => {
              const pillar = pillars[index];
              const Icon = pillar.icon;
              return (
                <animated.div
                  key={pillar.title}
                  style={{
                    opacity: style.opacity,
                    transform: style.y.to((v) => `translateY(${v}px)`),
                  }}
                  className="glass flex gap-3 rounded-2xl p-4 sm:gap-4 sm:p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-electric/20 to-purple-neon/20 text-cyan-electric">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-zinc-50">{pillar.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{pillar.copy}</p>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
