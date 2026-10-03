"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type TargetAndTransition,
} from "motion/react";
import CountUp from "react-countup";
import { ArrowRight, Play } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import SplitReveal from "@/components/SplitReveal";
import { PROJECTS } from "@/lib/projects";
import { useIntroReady } from "@/lib/intro";

const ParticlesBg = dynamic(() => import("@/components/ParticlesBg"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const show = (target: TargetAndTransition) => (ready ? target : undefined);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sculptureY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const sculptureScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      id="top"
      ref={section}
      className="relative isolate min-h-[100svh] overflow-hidden pt-24 sm:pt-28"
    >
      <div className="radial-glow absolute inset-0 -z-20" />
      <div className="grid-overlay absolute inset-0 -z-10 opacity-60" />
      <ParticlesBg />
      <div className="aurora-blob pointer-events-none absolute left-[-30%] top-16 h-64 w-64 rounded-full [--blob:rgba(34,211,238,0.22)] md:left-[-10%] md:top-24 md:h-[420px] md:w-[420px]" />
      <div
        className="aurora-blob pointer-events-none absolute right-[-28%] top-32 h-56 w-56 rounded-full [--blob:rgba(168,85,247,0.26)] md:right-[-8%] md:top-40 md:h-[380px] md:w-[380px]"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 sm:px-6 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-8">
        <motion.div className="relative z-10" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-zinc-300 backdrop-blur sm:text-xs"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-electric opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-electric shadow-[0_0_12px_#22d3ee]" />
            </span>
            Founder-led studio · {PROJECTS.length} systems shipped
          </motion.div>

          <h1 className="max-w-3xl text-[2.05rem] font-semibold leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl sm:leading-tight lg:text-6xl xl:text-[4.05rem] xl:leading-[1.06]">
            <SplitReveal as="span" className="block" delay={0.05} play={ready}>
              From Concept to
            </SplitReveal>
            <motion.span
              className="gradient-text mt-1 block"
              initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
              animate={show({ opacity: 1, y: 0, filter: "blur(0px)" })}
              transition={{ delay: 0.32, duration: 0.8, ease }}
            >
              Production-Grade Software
            </motion.span>
            <SplitReveal as="span" className="mt-1 block" delay={0.32} play={ready}>
              in Weeks.
            </SplitReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ delay: 0.7, duration: 0.7, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            We design, build, and automate web apps, mobile solutions, Shopify
            stores, and AI workflows for high-growth businesses globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={show({ opacity: 1, y: 0 })}
            transition={{ delay: 0.85, duration: 0.65, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                data-track="Hero start project"
                className="glow-btn group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-obsidian sm:w-auto"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2} className="w-full sm:w-auto">
              <a
                href="#work"
                data-track="Hero view work"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur transition hover:border-cyan-electric/40 hover:bg-white/10 sm:w-auto"
              >
                <Play className="h-4 w-4 fill-cyan-electric text-cyan-electric transition-transform duration-300 group-hover:scale-125" />
                View Our Work
              </a>
            </Magnetic>
          </motion.div>

          <ProofBar ready={ready} />
        </motion.div>

        <motion.div style={{ y: sculptureY, scale: sculptureScale }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={show({ opacity: 1, scale: 1, rotate: 0 })}
            transition={{ delay: 0.2, duration: 1.1, ease }}
          >
            <HeroSculpture />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={show({ opacity: 1, y: 0 })}
        transition={{ delay: 1, duration: 0.7, ease }}
        className="relative z-10 mx-auto mt-4 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20"
      >
        <div className="glass spin-border grid gap-6 rounded-3xl px-6 py-6 sm:grid-cols-3">
          <Metric ready={ready} end={PROJECTS.length} suffix="+" label="Production apps & systems" />
          <Metric ready={ready} end={4000} suffix="+" label="Routes automated" separator="," />
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

const ORBIT_CHIPS = [
  { label: "Next.js", className: "left-3 top-16 sm:-left-6 sm:top-24", duration: 5.5 },
  { label: "n8n + AI", className: "right-3 top-1/2 sm:-right-8", duration: 6.5 },
  { label: "Shopify", className: "bottom-20 left-5 sm:-left-4 sm:bottom-24", duration: 7.2 },
];

function HeroSculpture() {
  const card = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const visible = useInView(card, { margin: "10% 0px" });

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
  const glare = useMotionTemplate`radial-gradient(420px circle at ${springGx}% ${springGy}%, rgba(34,211,238,0.32), transparent 58%)`;

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

  // Idle drift. Paused offscreen and for reduced motion so it never burns
  // frames the visitor cannot see. Touch devices get a CSS float instead
  // (see the wrapper below), which runs on the compositor, not in JS.
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let last = performance.now();
    let t = 0;
    const loop = (now: number) => {
      t += Math.min(now - last, 50) / 1000;
      last = now;
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
  }, [visible, rotateX, rotateY, shiftX, shiftY, glareX, glareY]);

  return (
    <div className="relative mx-auto w-full max-w-md [@media(pointer:coarse)]:animate-float">
      <div className="absolute -inset-8 rounded-[2.4rem] bg-gradient-to-br from-cyan-electric/25 via-indigo-glow/15 to-purple-neon/30 blur-3xl" />
      <div
        ref={card}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") hovering.current = true;
        }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          hovering.current = true;
          tiltTo(event.clientX, event.clientY);
        }}
        onPointerLeave={() => {
          hovering.current = false;
        }}
        className="spin-border relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian/80 shadow-[0_40px_90px_rgba(0,0,0,0.5)] [perspective:1400px]"
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

      {ORBIT_CHIPS.map((chip, i) => (
        <motion.span
          key={chip.label}
          aria-hidden
          className={`pointer-events-none absolute z-10 ${chip.className}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { delay: 1.2 + i * 0.15, duration: 0.5 },
            scale: { delay: 1.2 + i * 0.15, type: "spring", stiffness: 260, damping: 18 },
          }}
        >
          {/* The bob is a CSS animation so it runs on the compositor. */}
          <span
            className="animate-float inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[#11110f]/95 px-3 py-1.5 text-[11px] font-medium text-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            style={{ animationDuration: `${chip.duration}s` }}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-purple-neon" : "bg-cyan-electric"}`} />
            {chip.label}
          </span>
        </motion.span>
      ))}
    </div>
  );
}

const MARKS = [
  "Velay",
  "Buy4Low",
  "GT Estate",
  "OSTELLO",
  "Zallo.ai",
  "Atlantic Devices",
  "Southampton Port Taxi",
];

function ProofBar({ ready }: { ready: boolean }) {
  const velay = PROJECTS.find((project) => project.slug === "vellay");

  return (
    <motion.div
      initial="hidden"
      animate={ready ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { delay: 1, duration: 0.65, ease, staggerChildren: 0.06, delayChildren: 1.1 },
        },
      }}
      className="mt-10"
    >
      <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
        Shipped in production
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        {MARKS.map((name) => (
          <motion.span
            key={name}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-[13px] font-semibold tracking-wide text-zinc-500 transition-colors hover:text-cyan-electric"
          >
            {name}
          </motion.span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {velay?.appStoreUrl ? (
          <a
            href={velay.appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-zinc-300 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-zinc-50"
          >
            <AppleMark />
            App Store
          </a>
        ) : null}
        {velay?.playStoreUrl ? (
          <a
            href={velay.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-zinc-300 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-zinc-50"
          >
            <PlayMark />
            Google Play
          </a>
        ) : null}
        <span className="text-[11px] text-zinc-500">
          Apps published on the Apple App Store &amp; Google Play
        </span>
      </div>
    </motion.div>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M16.7 12.6c0-2.4 2-3.3 2.1-3.4-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-3.9 2.5-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8s1.8.8 3.2.8c1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.6-3.8ZM14.9 6.3c.7-.8 1.1-1.9 1-3-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.1-.5 2.8-1.5Z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M4.5 3.6v16.8c0 .7.8 1.1 1.4.7l14-8.4c.6-.4.6-1.3 0-1.7l-14-8.4c-.6-.4-1.4 0-1.4.7Z" />
    </svg>
  );
}

function Metric({
  ready,
  end,
  suffix,
  label,
  separator,
}: {
  ready: boolean;
  end: number;
  suffix: string;
  label: string;
  separator?: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-3xl font-semibold tracking-tight text-zinc-50 tabular-nums">
        {ready ? <CountUp end={end} duration={2.2} delay={0.5} separator={separator} /> : 0}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </div>
  );
}
