"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Mail } from "lucide-react";

type Summary = {
  total: number;
  today: number;
  last7: number;
  sessions: number;
  days: { label: string; count: number }[];
  topPages: { path: string; count: number }[];
  topReferrers: { source: string; count: number }[];
  recent: { t: number; path: string; referrer: string }[];
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
  days: [],
  topPages: [],
  topReferrers: [],
  recent: [],
};

export default function DashboardClient() {
  const [data, setData] = useState<Summary>(empty);
  const [queries, setQueries] = useState<ContactQuery[]>([]);

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
            Live on this server. Open{" "}
            <span className="font-mono text-cyan-electric">
              localhost:3000/dashboard
            </span>
          </p>
        </div>
        <a
          href="/"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:border-cyan-electric/40 hover:text-cyan-electric"
        >
          Back to site
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Views today" value={data.today} />
        <Kpi label="Last 7 days" value={data.last7} />
        <Kpi label="All views" value={data.total} />
        <Kpi label="Sessions" value={data.sessions} />
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
        <Panel title="Referrers">
          {data.topReferrers.length === 0 ? (
            <Empty />
          ) : (
            data.topReferrers.map((row) => (
              <Row key={row.source} label={row.source} value={row.count} />
            ))
          )}
        </Panel>
      </div>

      <section className="mt-8 rounded-[1.6rem] border border-white/10 bg-slate-card p-6">
        <h2 className="text-sm font-semibold text-zinc-200">Recent visits</h2>
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
                  {new Date(hit.t).toLocaleTimeString()} · {hit.referrer || "direct"}
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

function Kpi({ label, value }: { label: string; value: number }) {
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
      <span className="truncate text-zinc-300">{label}</span>
      <span className="font-mono text-cyan-electric">{value}</span>
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
