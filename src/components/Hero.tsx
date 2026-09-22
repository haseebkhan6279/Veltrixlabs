"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import CountUp from "react-countup";
import { ArrowRight, Play } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import SplitReveal from "@/components/SplitReveal";
import { PROJECTS } from "@/lib/projects";

const ParticlesBg = dynamic(() => import("@/components/ParticlesBg"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden pt-24 sm:pt-28"
    >
      <div className="radial-glow absolute inset-0 -z-20" />
      <div className="grid-overlay absolute inset-0 -z-10 opacity-60" />
      <ParticlesBg />
      <div className="pointer-events-none absolute left-[-30%] top-16 h-64 w-64 rounded-full bg-cyan-electric/15 blur-[90px] animate-pulse-glow md:left-[-10%] md:top-24 md:h-[420px] md:w-[420px] md:blur-[120px]" />
      <div className="pointer-events-none absolute right-[-28%] top-32 h-56 w-56 rounded-full bg-purple-neon/20 blur-[90px] md:right-[-8%] md:top-40 md:h-[380px] md:w-[380px] md:blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 sm:px-6 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-8">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-zinc-300 backdrop-blur sm:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-electric shadow-[0_0_12px_#22d3ee]" />
            Founder-led studio · {PROJECTS.length} systems shipped
          </motion.div>

          <h1 className="max-w-3xl text-[2.05rem] font-semibold leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl sm:leading-tight lg:text-6xl xl:text-[4.05rem] xl:leading-[1.06]">
            <SplitReveal as="span" className="block" delay={0.05}>
              From Concept to
            </SplitReveal>
            <motion.span
              className="gradient-text mt-1 block"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.7, ease }}
            >
              Production-Grade Software
            </motion.span>
            <SplitReveal as="span" className="mt-1 block" delay={0.32}>
              in Weeks.
            </SplitReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            We design, build, and automate web apps, mobile solutions, Shopify
            stores, and AI workflows for high-growth businesses globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.65, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-obsidian sm:w-auto"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2} className="w-full sm:w-auto">
              <a
                href="#work"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur transition hover:border-cyan-electric/40 hover:bg-white/10 sm:w-auto"
              >
                <Play className="h-4 w-4 fill-cyan-electric text-cyan-electric" />
                View Our Work
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <HeroSculpture />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease }}
        className="relative z-10 mx-auto mt-4 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20"
      >
        <div className="glass grid gap-6 rounded-3xl px-6 py-6 sm:grid-cols-3">
          <Metric end={PROJECTS.length} suffix="+" label="Production apps & systems" />
          <Metric end={4000} suffix="+" label="Routes automated" separator="," />
          <div className="text-center sm:text-left">
            <p className="text-3xl font-semibold tracking-tight text-zinc-50">
              US, UK &amp; Global
            </p>
            <p className="mt-1 text-sm text-zinc-400">Clients worldwide</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroSculpture() {
  const card = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springX = useSpring(rotateX, { stiffness: 140, damping: 16, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 16, mass: 0.5 });
  const springShiftX = useSpring(shiftX, { stiffness: 90, damping: 18 });
  const springShiftY = useSpring(shiftY, { stiffness: 90, damping: 18 });
  const springGx = useSpring(glareX, { stiffness: 90, damping: 18 });
  const springGy = useSpring(glareY, { stiffness: 90, damping: 18 });
  const glare = useMotionTemplate`radial-gradient(420px circle at ${springGx}% ${springGy}%, rgba(34,211,238,0.38), transparent 58%)`;

  const tiltTo = (clientX: number, clientY: number) => {
    const node = card.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const px = (clientX - box.left) / box.width - 0.5;
    const py = (clientY - box.top) / box.height - 0.5;
    rotateX.set(-py * 34);
    rotateY.set(px * 40);
    shiftX.set(px * 28);
    shiftY.set(py * 22);
    glareX.set((px + 0.5) * 100);
    glareY.set((py + 0.5) * 100);
  };

  useEffect(() => {
    let frame = 0;
    let t = 0;
    const loop = () => {
      t += 0.016;
      if (!hovering.current) {
        rotateX.set(Math.sin(t * 0.65) * 10);
        rotateY.set(Math.cos(t * 0.5) * 14);
        shiftX.set(Math.cos(t * 0.45) * 10);
        shiftY.set(Math.sin(t * 0.4) * 8);
        glareX.set(50 + Math.sin(t * 0.4) * 18);
        glareY.set(50 + Math.cos(t * 0.5) * 14);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [rotateX, rotateY, shiftX, shiftY, glareX, glareY]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-8 rounded-[2.4rem] bg-gradient-to-br from-cyan-electric/30 to-purple-neon/30 blur-3xl" />
      <div
        ref={card}
        onPointerEnter={() => {
          hovering.current = true;
        }}
        onPointerMove={(event) => {
          hovering.current = true;
          tiltTo(event.clientX, event.clientY);
        }}
        onPointerLeave={() => {
          hovering.current = false;
        }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian/80 shadow-[0_40px_90px_rgba(0,0,0,0.5)] [perspective:1400px]"
      >
        <motion.div
          className="relative h-[420px] w-full sm:h-[480px] lg:h-[520px]"
          style={{
            rotateX: springX,
            rotateY: springY,
            x: springShiftX,
            y: springShiftY,
            transformPerspective: 1400,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/images/hero-visual.png"
            alt="Veltrix Labs abstract product sculpture"
            width={1200}
            height={1600}
            priority
            className="h-[120%] w-[120%] max-w-none -translate-x-[8%] -translate-y-[8%] object-cover"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ background: glare }}
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-obsidian/10" />
        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] text-cyan-electric backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-electric shadow-[0_0_10px_#22d3ee]" />
          Shipping now
        </div>
      </div>
    </div>
  );
}

function Metric({
  end,
  suffix,
  label,
  separator,
}: {
  end: number;
  suffix: string;
  label: string;
  separator?: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-3xl font-semibold tracking-tight text-zinc-50">
        <CountUp end={end} duration={2.4} separator={separator} />
        {suffix}
      </p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </div>
  );
}
