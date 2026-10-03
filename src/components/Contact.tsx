"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ArrowUpRight, Check, ChevronDown, Mail } from "lucide-react";
import { IMAGES } from "@/lib/constants";
import { CONTACT_PROJECT_TYPES } from "@/lib/contact-types";
import { trackEvent } from "@/lib/client-track";
import { SITE_EMAIL } from "@/lib/seo";
import { TEAM } from "@/lib/team";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition focus:-translate-y-0.5 focus:border-cyan-electric/60 focus:shadow-[0_10px_30px_-12px_rgba(34,211,238,0.45)]";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const [parent] = useAutoAnimate({ duration: 380 });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [projectType, setProjectType] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!projectType) {
      setError("Select a project type.");
      return;
    }
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          type: projectType,
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Could not send brief");
      trackEvent({
        type: "contact",
        action: "Submitted contact form",
        hash: "#contact",
      });
      form.reset();
      setProjectType("");
      setSubmitted(true);
    } catch {
      setError("Could not send the brief. Try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src={IMAGES.cta}
            alt="Abstract gradient used for the strategy-call banner"
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian/80 to-purple-neon/30" />
          <div className="aurora-blob pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full [--blob:rgba(34,211,238,0.22)]" />
          <div className="relative grid gap-8 p-5 sm:gap-10 sm:p-8 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
                Start a conversation
              </p>
              <h2 className="mt-4 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                Ready to Build Something Remarkable?
              </h2>
              <p className="mt-4 max-w-md text-zinc-400">
                Tell us what you&apos;re shipping. We&apos;ll reply with a
                tight architecture take and a realistic timeline — usually
                within one business day.
              </p>
              <a
                href={`mailto:${SITE_EMAIL}`}
                data-track="Opened email"
                className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-200 hover:text-cyan-electric"
              >
                <Mail className="h-4 w-4" />
                {SITE_EMAIL}
              </a>
              <FounderDirect />
            </motion.div>

            <motion.div
              ref={parent}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
              className="glass spin-border rounded-[1.6rem] p-4 sm:p-6 md:p-8"
            >
              {submitted ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <SuccessMark />
                  <h3 className="mt-4 text-2xl font-semibold text-zinc-50">
                    Strategy call requested.
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-zinc-400">
                    We&apos;ve captured your brief. A Veltrix engineer will
                    follow up with next steps and a proposed working session.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-cyan-electric underline-offset-4 hover:underline"
                  >
                    Send another brief
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-4">
                  <label className="grid gap-2 text-sm text-zinc-300">
                    Name
                    <input
                      required
                      name="name"
                      placeholder="Alex Rivera"
                      className={fieldClass}
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-zinc-300">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="alex@company.com"
                      className={fieldClass}
                    />
                  </label>
                  <ProjectTypeSelect value={projectType} onChange={setProjectType} />
                  <label className="grid gap-2 text-sm text-zinc-300">
                    Message
                    <textarea
                      required
                      name="message"
                      rows={4}
                      placeholder="What are we building, and by when?"
                      className={`resize-none ${fieldClass}`}
                    />
                  </label>
                  {error ? (
                    <p className="text-sm text-red-400">{error}</p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={sending}
                    data-track="Clicked submit brief"
                    className="glow-btn mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-obsidian disabled:opacity-70"
                  >
                    {sending ? "Sending brief…" : "Book a Strategy Call"}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessMark() {
  return (
    <motion.svg
      viewBox="0 0 56 56"
      className="h-16 w-16 text-cyan-electric"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0.6, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      aria-hidden
    >
      <motion.circle
        cx="28"
        cy="28"
        r="25"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease }}
      />
      <motion.path
        d="M17 29 L25 37 L40 20"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay: 0.5, ease }}
      />
    </motion.svg>
  );
}

function FounderDirect() {
  const founder = TEAM[0];
  const coFounder = TEAM[1];

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-black/35 p-4">
      <div className="flex items-center gap-3">
        <Image
          src="/team/haseeb.jpg"
          alt={founder.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-zinc-50">{founder.name}</p>
          <p className="text-[11px] text-zinc-500">
            {founder.role} · with {coFounder.name}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Engineered by Haseeb Khan &amp; the Veltrix Labs engineering team.
        Direct line for technical discovery:
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <a
          href={`mailto:${SITE_EMAIL}`}
          data-track="Opened founder email"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-zinc-200 hover:text-cyan-electric"
        >
          <Mail className="h-3.5 w-3.5" />
          {SITE_EMAIL}
        </a>
        <a
          href={founder.linkedIn}
          target="_blank"
          rel="noreferrer"
          data-track="Opened founder LinkedIn"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-zinc-200 hover:text-cyan-electric"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

function ProjectTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="grid gap-2 text-sm text-zinc-300">
      <span>Project Type</span>
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Project type"
          onClick={() => setOpen((current) => !current)}
          className={`${fieldClass} flex items-center justify-between gap-3 text-left ${
            value ? "text-zinc-50" : "text-zinc-500"
          }`}
        >
          {value || "Select a project type"}
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-zinc-400 transition ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open ? (
          <ul
            role="listbox"
            className="absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-64 overflow-auto rounded-xl border border-white/10 bg-[#18181b] p-1 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
          >
            {CONTACT_PROJECT_TYPES.map((type) => {
              const selected = type === value;
              return (
                <li key={type}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(type);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      selected
                        ? "bg-white/10 text-cyan-electric"
                        : "text-zinc-100 hover:bg-white/10"
                    }`}
                  >
                    {type}
                    {selected ? <Check className="h-4 w-4" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
