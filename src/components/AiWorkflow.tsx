"use client";

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

export default function AiWorkflow() {
  return (
    <section id="ai" className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28 md:py-28">
      <div className="pointer-events-none absolute right-[-10%] top-10 h-72 w-72 rounded-full bg-purple-neon/15 blur-[110px]" />
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
              return (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cyan-electric">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/40 text-cyan-electric">
                      <Icon className="h-4 w-4" />
                    </span>
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-50">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.copy}</p>
                </li>
              );
            })}
          </ol>

          <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-charcoal">
            <video
              src="/videos/zallo.webm"
              muted
              loop
              autoPlay
              playsInline
              className="aspect-video w-full object-cover object-top"
            />
            <div className="border-t border-white/8 px-5 py-4">
              <p className="text-sm font-semibold text-zinc-100">Zallo.ai pipeline</p>
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
