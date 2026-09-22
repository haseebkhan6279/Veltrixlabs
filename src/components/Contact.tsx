"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ArrowUpRight, CircleCheck, Mail } from "lucide-react";
import { IMAGES } from "@/lib/constants";
import { SITE_EMAIL } from "@/lib/seo";

const projectTypes = [
  "Web App",
  "SaaS",
  "Shopify",
  "AI Automation",
  "Mobile App",
];

export default function Contact() {
  const [parent] = useAutoAnimate({ duration: 380 });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          type: data.get("type"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Could not send brief");
      form.reset();
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
          <div className="relative grid gap-8 p-5 sm:gap-10 sm:p-8 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
            <div>
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
                className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-200 hover:text-cyan-electric"
              >
                <Mail className="h-4 w-4" />
                {SITE_EMAIL}
              </a>
            </div>

            <div
              ref={parent}
              className="glass rounded-[1.6rem] p-4 sm:p-6 md:p-8"
            >
              {submitted ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <CircleCheck className="h-14 w-14 text-cyan-electric" />
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
                      className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition focus:border-cyan-electric/60"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-zinc-300">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="alex@company.com"
                      className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition focus:border-cyan-electric/60"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-zinc-300">
                    Project Type
                    <select
                      required
                      name="type"
                      defaultValue=""
                      className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition focus:border-cyan-electric/60"
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm text-zinc-300">
                    Message
                    <textarea
                      required
                      name="message"
                      rows={4}
                      placeholder="What are we building, and by when?"
                      className="resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition focus:border-cyan-electric/60"
                    />
                  </label>
                  {error ? (
                    <p className="text-sm text-red-400">{error}</p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={sending}
                    className="glow-btn mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-obsidian disabled:opacity-70"
                  >
                    {sending ? "Sending brief…" : "Book a Strategy Call"}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
