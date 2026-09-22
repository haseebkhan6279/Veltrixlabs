"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import SplitReveal from "@/components/SplitReveal";
import TiltCard from "@/components/TiltCard";
import { TEAM } from "@/lib/team";

export default function Team() {
  return (
    <section id="team" className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28 md:py-32">
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-electric/10 blur-[110px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
            The studio
          </p>
          <SplitReveal className="mt-3 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Founder and co-founder. One stack. No handoffs.
          </SplitReveal>
          <p className="mt-4 max-w-xl text-zinc-400">
            Veltrix Labs is a two-person product studio. You talk to the people who
            actually write the code.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {TEAM.map((person, index) => (
            <TiltCard key={person.name} className="rounded-[1.8rem]">
              <article className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-card p-5 sm:p-7 md:p-9">
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${person.accent} opacity-20 blur-3xl`}
                />
                <div className="relative flex items-start gap-4 sm:gap-5">
                  <div
                    className={`grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-gradient-to-br ${person.accent} font-mono text-xl font-bold text-obsidian shadow-[0_12px_40px_rgba(34,211,238,0.22)] sm:h-20 sm:w-20 sm:text-2xl`}
                  >
                    {person.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-electric">
                      0{index + 1} · {person.role.split(" & ")[0]}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">{person.role}</p>
                  </div>
                </div>

                <p className="relative mt-6 text-sm leading-relaxed text-zinc-400">
                  {person.bio}
                </p>

                <p className="relative mt-4 flex items-center gap-2 text-xs text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 text-cyan-electric" />
                  {person.location}
                </p>
                <p className="relative mt-1 text-xs text-zinc-500">
                  {person.education}
                </p>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {person.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="relative mt-7 flex flex-wrap gap-3">
                  <a
                    href={person.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 transition hover:border-cyan-electric/40 hover:text-cyan-electric"
                  >
                    <LinkedinIcon />
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  {person.github ? (
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 transition hover:border-cyan-electric/40 hover:text-cyan-electric"
                    >
                      <GithubIcon />
                      GitHub
                    </a>
                  ) : null}
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex max-w-full items-center gap-2 break-all rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 transition hover:border-cyan-electric/40 hover:text-cyan-electric"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {person.email}
                  </a>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 transition hover:border-cyan-electric/40 hover:text-cyan-electric"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {person.phone}
                  </a>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M6.5 9H3.8v11.2H6.5V9ZM5.15 3.8A1.58 1.58 0 1 0 5.16 7a1.58 1.58 0 0 0 0-3.2ZM20.2 13.05c0-3.08-1.64-4.52-3.83-4.52-1.76 0-2.55 1-3 1.7V9H10.7c.04.86 0 11.2 0 11.2h2.68v-6.26c0-.33.02-.67.12-.91.27-.67.88-1.37 1.91-1.37 1.35 0 1.89 1.03 1.89 2.54v6H20.2v-6.2Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 1.64.83a2 2 0 0 1 .6-1.25c-2.22-.25-4.55-1.11-4.55-4.95A3.87 3.87 0 0 1 6.7 7.1a3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1.02a9.47 9.47 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.4.1 2.65a3.87 3.87 0 0 1 1.03 2.69c0 3.85-2.34 4.7-4.57 4.95a2.4 2.4 0 0 1 .68 1.86v2.76c0 .10.0.1.4.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
