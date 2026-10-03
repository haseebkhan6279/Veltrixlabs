"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, utils } from "animejs";
import { Bot, CalendarCheck, PhoneMissed, Workflow } from "lucide-react";
import SplitReveal from "@/components/SplitReveal";

const STEPS = [
  {
    icon: PhoneMissed,
    title: "Missed inbound",
    copy: "After-hours calls, web leads, and WhatsApp sit in a queue instead of dying in voicemail.",
  },
  {
    icon: Bot,
    title: "Voice AI",
    copy: "Zallo-class receptionist answers, qualifies intent, and captures the booking window.",
  },
  {
    icon: Workflow,
    title: "n8n + CRM",
    copy: "A workflow writes the ticket, routes the owner, and logs the transcript against the tenant.",
  },
  {
    icon: CalendarCheck,
    title: "Staff + calendar",
    copy: "The console and Expo staff app get the appointment. A human only steps in on exceptions.",
  },
];

const STEP_MS = 2400;

export default function AiWorkflow() {
  const root = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

  // Entrance: steps stagger out from the first cell of the 2x2 grid and the
  // recording wipes open. Hidden only once JS is running, so no-JS still reads.
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = node.querySelectorAll(".flow-step");
    const video = node.querySelector(".flow-video");

    if (!reduced) {
      utils.set(steps, { opacity: 0, translateY: 40, scale: 0.94 });
      if (video) utils.set(video, { clipPath: "inset(0% 100% 0% 0% round 26px)" });
    }

    let played = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
        if (!entry?.isIntersecting || played || reduced) return;
        played = true;
        animate(steps, {
          opacity: 1,
          translateY: 0,
          scale: 1,
          delay: stagger(110, { grid: [2, 2], from: "first" }),
          duration: 900,
          ease: "outExpo",
        });
        if (video) {
          animate(video, {
            clipPath: "inset(0% 0% 0% 0% round 26px)",
            duration: 1300,
            delay: 250,
            ease: "inOutQuart",
          });
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Walk the pipeline while the section is on screen.
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section id="ai" ref={root} className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28 md:py-28">
      <div className="aurora-blob pointer-events-none absolute right-[-10%] top-10 h-72 w-72 rounded-full [--blob:rgba(168,85,247,0.26)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
            AI operations
          </p>
          <SplitReveal className="mt-3 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Voice in. Ticket out. Calendar booked.
          </SplitReveal>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            The same pipeline we ship for Zallo.ai and n8n ops: a real API
            behind the model, not a demo chatbot. Hover the Ostello and Zallo
            cards in Work for live product recordings.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <ol className="grid gap-3 sm:grid-cols-2">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const on = index === active;
              return (
                <li
                  key={step.title}
                  onMouseEnter={() => setActive(index)}
                  className={`flow-step relative overflow-hidden rounded-2xl border p-5 transition-[border-color,background-color,box-shadow] duration-500 ${
                    on
                      ? "border-cyan-electric/40 bg-cyan-electric/[0.06] shadow-[0_0_40px_rgba(34,211,238,0.12)]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cyan-electric">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full border transition-all duration-500 ${
                        on
                          ? "scale-110 border-cyan-electric/50 bg-cyan-electric text-obsidian"
                          : "border-white/10 bg-black/40 text-cyan-electric"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-50">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.copy}</p>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
                    {on && inView ? (
                      <span
                        key={active}
                        className="flow-progress block h-full origin-left bg-gradient-to-r from-cyan-electric to-purple-neon"
                        style={{ animationDuration: `${STEP_MS}ms` }}
                      />
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="flow-video spin-border overflow-hidden rounded-[1.6rem] border border-white/10 bg-charcoal">
            <video
              src="/videos/zallo.webm"
              muted
              loop
              autoPlay
              playsInline
              className="aspect-video w-full object-cover object-top"
            />
            <div className="border-t border-white/8 px-5 py-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-neon opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-neon" />
                </span>
                Zallo.ai pipeline
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Site, multi-tenant CRM, and staff app — the recording is from the
                live product, not a mock.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
