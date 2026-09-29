"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Mail } from "lucide-react";

type SessionAudit = {
  id: string;
  start: number;
  end: number;
  durationMs: number;
  country: string;
  device: string;
  source: string;
  medium: string;
  campaign: string;
  landing: string;
  referrer: string;
  pages: string[];
  journey: string[];
  actions: string[];
  contacted: boolean;
};

type Summary = {
  persist?: "redis" | "file" | "ephemeral";
  total: number;
  today: number;
  last7: number;
  sessions: number;
  contactedSessions?: number;
  days: { label: string; count: number }[];
  topPages: { path: string; count: number }[];
  topReferrers: { source: string; count: number }[];
  topDevices?: { source: string; count: number }[];
  topCountries?: { source: string; count: number }[];
  recent: { t: number; path: string; referrer: string; source?: string }[];
  sessionAudits?: SessionAudit[];
};

type ContactQuery = {
  id: string;
  t: number;
  name: string;
  email: string;
  type: string;
  message: string;
};

const empty: Summary = {
  total: 0,
  today: 0,
  last7: 0,
  sessions: 0,
  contactedSessions: 0,
  days: [],
  topPages: [],
  topReferrers: [],
  topDevices: [],
  topCountries: [],
  recent: [],
  sessionAudits: [],
};

export default function DashboardClient() {
  const [data, setData] = useState<Summary>(empty);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [sessionFilter, setSessionFilter] = useState("all");
  const [openSession, setOpenSession] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () => {
      void fetch("/api/analytics")
        .then((res) => res.json())
        .then((json: Summary) => {
          if (alive) setData(json);
        })
        .catch(() => undefined);

      void fetch("/api/contact")
        .then((res) => res.json())
        .then((json: { queries?: ContactQuery[] }) => {
          if (alive) setQueries(Array.isArray(json.queries) ? json.queries : []);
        })
        .catch(() => undefined);
    };
    load();
    const id = window.setInterval(load, 12000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  const maxDay = Math.max(1, ...data.days.map((d) => d.count));
  const queriesToday = queries.filter((q) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return q.t >= start.getTime();
  }).length;
  const contacted = data.contactedSessions ?? 0;
  const conversion =
    data.sessions > 0 ? Math.round((contacted / data.sessions) * 100) : 0;
  const sessions = data.sessionAudits ?? [];
  const filteredSessions = useMemo(() => {
    if (sessionFilter === "contacted") {
      return sessions.filter((session) => session.contacted);
    }
    if (sessionFilter !== "all") {
      return sessions.filter((session) => session.source === sessionFilter);
    }
    return sessions;
  }, [sessions, sessionFilter]);
  const sourceFilters = [
    "all",
    "contacted",
    ...[...new Set(sessions.map((session) => session.source))].slice(0, 8),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
            Analytics
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Traffic dashboard
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Where each visitor came from, what they opened, and whether they
            sent a brief.
          </p>
        </div>
        <a
          href="/"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:border-cyan-electric/40 hover:text-cyan-electric"
        >
          Back to site
        </a>
      </div>

      {data.persist === "ephemeral" ? (
        <p className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          Production cannot save files on Vercel. In the Vercel project go to
          Storage → Create KV → connect this project, then Redeploy. After that,
          queries and views persist.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <Kpi label="Views today" value={data.today} />
        <Kpi label="Last 7 days" value={data.last7} />
        <Kpi label="All views" value={data.total} />
        <Kpi label="Sessions" value={data.sessions} />
        <Kpi label="Contacted" value={contacted} />
        <Kpi label="Contact rate" value={`${conversion}%`} />
      </div>

      <section className="mt-8 rounded-[1.6rem] border border-white/10 bg-slate-card p-6">
        <h2 className="text-sm font-semibold text-zinc-200">Last 14 days</h2>
        <div className="mt-6 flex h-40 items-end gap-2">
          {data.days.map((day) => (
            <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-purple-neon to-cyan-electric"
                style={{ height: `${Math.max(6, (day.count / maxDay) * 100)}%` }}
                title={`${day.label}: ${day.count}`}
              />
              <span className="hidden text-[9px] text-zinc-500 sm:block">
                {day.label.replace(/^[A-Za-z]+ /, "")}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[1.6rem] border border-white/10 bg-slate-card p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-electric">
              Sessions
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-50">
              Visitor audit
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Source, device, landing page, and the path they took on the site.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sourceFilters.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSessionFilter(key)}
                className={`rounded-full border px-3 py-1 text-[11px] capitalize transition ${
                  sessionFilter === key
                    ? "border-cyan-electric/50 bg-cyan-electric/10 text-cyan-electric"
                    : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {filteredSessions.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No sessions yet. Open the public site, click around, then refresh
              this page.
            </p>
          ) : (
            filteredSessions.map((session) => {
              const open = openSession === session.id;
              return (
                <article
                  key={session.id}
                  className={`rounded-2xl border px-4 py-3 sm:px-5 ${
                    session.contacted
                      ? "border-cyan-electric/25 bg-cyan-electric/5"
                      : "border-white/8 bg-black/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenSession(open ? null : session.id)
                    }
                    className="flex w-full flex-wrap items-start justify-between gap-3 text-left"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] capitalize text-zinc-100">
                          {session.source}
                        </span>
                        <span className="text-[11px] capitalize text-zinc-400">
                          {session.device}
                          {session.country && session.country !== "Unknown"
                            ? ` · ${session.country}`
                            : ""}
                        </span>
                        {session.contacted ? (
                          <span className="rounded-full border border-cyan-electric/30 bg-cyan-electric/10 px-2 py-0.5 text-[11px] text-cyan-electric">
                            Sent brief
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 truncate text-sm text-zinc-200">
                        Landed on {session.landing || "/"}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                        {(session.journey.length
                          ? session.journey
                          : session.pages
                        ).join(" → ") || "Opened the site"}
                      </p>
                    </div>
                    <div className="shrink-0 text-right text-[11px] text-zinc-500">
                      <p>{new Date(session.start).toLocaleString()}</p>
                      <p className="mt-1">{formatDuration(session.durationMs)}</p>
                    </div>
                  </button>

                  {open ? (
                    <div className="mt-4 border-t border-white/8 pt-4 text-sm">
                      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <Meta label="Source" value={session.source} />
                        <Meta
                          label="Campaign"
                          value={
                            [session.medium, session.campaign]
                              .filter(Boolean)
                              .join(" / ") || "none"
                          }
                        />
                        <Meta
                          label="Referrer"
                          value={hostOf(session.referrer) || "direct"}
                        />
                        <Meta
                          label="Pages"
                          value={`${session.pages.length || 1}`}
                        />
                      </dl>
                      <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                        Journey
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(session.journey.length
                          ? session.journey
                          : session.pages
                        ).map((step, index) => (
                          <span
                            key={`${session.id}-${step}-${index}`}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-zinc-200"
                          >
                            {index + 1}. {step}
                          </span>
                        ))}
                      </div>
                      {session.actions.length ? (
                        <>
                          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                            Actions
                          </p>
                          <ul className="mt-2 space-y-1 text-xs text-zinc-300">
                            {session.actions.map((action, index) => (
                              <li key={`${session.id}-a-${index}`}>· {action}</li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })
          )}
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Top pages">
          {data.topPages.length === 0 ? (
            <Empty />
          ) : (
            data.topPages.map((row) => (
              <Row key={row.path} label={row.path} value={row.count} />
            ))
          )}
        </Panel>
        <Panel title="Where they came from">
          {data.topReferrers.length === 0 ? (
            <Empty />
          ) : (
            data.topReferrers.map((row) => (
              <Row key={row.source} label={row.source} value={row.count} />
            ))
          )}
        </Panel>
        <Panel title="Devices">
          {(data.topDevices ?? []).length === 0 ? (
            <Empty />
          ) : (
            (data.topDevices ?? []).map((row) => (
              <Row key={row.source} label={row.source} value={row.count} />
            ))
          )}
        </Panel>
        <Panel title="Countries">
          {(data.topCountries ?? []).length === 0 ? (
            <Empty />
          ) : (
            (data.topCountries ?? []).map((row) => (
              <Row key={row.source} label={row.source} value={row.count} />
            ))
          )}
        </Panel>
      </div>

      <section className="mt-8 rounded-[1.6rem] border border-white/10 bg-slate-card p-6">
        <h2 className="text-sm font-semibold text-zinc-200">Recent page views</h2>
        <div className="mt-4 space-y-2">
          {data.recent.length === 0 ? (
            <Empty />
          ) : (
            data.recent.map((hit, i) => (
              <div
                key={`${hit.t}-${i}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 px-3 py-2 text-sm"
              >
                <span className="font-mono text-cyan-electric">{hit.path}</span>
                <span className="text-xs text-zinc-500">
                  {new Date(hit.t).toLocaleTimeString()} ·{" "}
                  {hit.source || hostOf(hit.referrer) || "direct"}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="queries" className="mt-10 scroll-mt-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-purple-neon">
              Queries
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              Contact form briefs
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Every strategy-call form lands here with name, email, project type,
              and message.
            </p>
          </div>
          <div className="flex gap-3">
            <Kpi label="Queries today" value={queriesToday} />
            <Kpi label="All queries" value={queries.length} />
          </div>
        </div>

        {queries.length === 0 ? (
          <div className="rounded-[1.6rem] border border-white/10 bg-slate-card p-8">
            <p className="text-sm text-zinc-500">
              No queries yet. Submit the contact form on the site, then refresh
              this page.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {queries.map((query) => (
              <article
                key={query.id}
                className="rounded-[1.6rem] border border-white/10 bg-slate-card p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-zinc-50">{query.name}</p>
                    <a
                      href={`mailto:${query.email}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-sm text-cyan-electric hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {query.email}
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-cyan-electric/20 bg-cyan-electric/5 px-3 py-1 text-[11px] text-cyan-electric">
                      {query.type}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(query.t).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                  {query.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-slate-card p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-50">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.6rem] border border-white/10 bg-slate-card p-6">
      <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
      <div className="mt-4 space-y-2">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="truncate capitalize text-zinc-300">{label}</span>
      <span className="font-mono text-cyan-electric">{value}</span>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 truncate text-zinc-200">{value}</dd>
    </div>
  );
}

function Empty() {
  return (
    <p className="text-sm text-zinc-500">
      No visits yet. Browse the site, then refresh this page.
    </p>
  );
}

function formatDuration(ms: number) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s on site`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest ? `${minutes}m ${rest}s on site` : `${minutes}m on site`;
}

function hostOf(value: string) {
  if (!value) return "";
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value.slice(0, 40);
  }
}
