import { loadList, persistenceMode, pushItem } from "@/lib/json-store";
import { classifySource, deviceFromUa, sectionLabel } from "@/lib/traffic";

export type EventType = "page" | "section" | "click" | "contact" | "leave";

export type AnalyticsEvent = {
  t: number;
  type: EventType;
  path: string;
  hash?: string;
  session: string;
  visitor?: string;
  referrer: string;
  source: string;
  medium?: string;
  campaign?: string;
  landing?: string;
  action?: string;
  href?: string;
  country?: string;
  ua?: string;
};

export type SessionAudit = {
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

const FILE = "analytics.json";
const KEY = "veltrix:analytics";
const MAX_EVENTS = 12000;

export async function recordEvent(event: AnalyticsEvent) {
  await pushItem(KEY, FILE, event, MAX_EVENTS);
}

function eventType(event: AnalyticsEvent): EventType {
  return event.type ?? "page";
}

function sourceOf(event: AnalyticsEvent) {
  return event.source || classifySource(event.referrer, "");
}

function clickLabel(event: AnalyticsEvent) {
  const action = event.action?.trim();
  if (action && action !== "link" && action !== "email") return action;
  const href = event.href ?? "";
  if (href.startsWith("mailto:")) return "Opened email";
  if (href.startsWith("#") || href.startsWith("/#")) {
    return `Jumped to ${sectionLabel(href.split("#")[1] ?? "")}`;
  }
  if (!href) return "Clicked a link";
  try {
    const url = new URL(href, "https://veltrixlabs.live");
    const host = url.hostname.replace(/^www\./, "");
    if (host === "veltrixlabs.live") {
      return url.pathname === "/" ? "Opened home" : `Opened ${url.pathname}`;
    }
    return `Opened ${host}`;
  } catch {
    return "Clicked a link";
  }
}

function journeyStep(event: AnalyticsEvent) {
  const type = eventType(event);
  if (type === "section") return sectionLabel(event.hash ?? "");
  if (type === "click") return clickLabel(event);
  if (type === "contact") return "Submitted contact form";
  if (type === "leave") return "Left site";
  if (event.hash) return `${event.path}${event.hash}`;
  return event.path || "/";
}

function buildSessions(events: AnalyticsEvent[]): SessionAudit[] {
  const grouped = new Map<string, AnalyticsEvent[]>();
  for (const event of events) {
    const id = event.session || "anon";
    const list = grouped.get(id) ?? [];
    list.push(event);
    grouped.set(id, list);
  }

  const sessions: SessionAudit[] = [];
  for (const [id, list] of grouped) {
    const ordered = [...list].sort((a, b) => a.t - b.t);
    const first = ordered[0];
    const last = ordered[ordered.length - 1];
    const pages = ordered
      .filter((event) => eventType(event) === "page")
      .map((event) => event.path);
    const uniquePages = [...new Set(pages)];
    const journey = ordered
      .filter((event) => eventType(event) !== "leave")
      .map(journeyStep)
      .filter((step, index, all) => step && step !== all[index - 1]);
    const actions = ordered
      .filter(
        (event) =>
          eventType(event) === "click" || eventType(event) === "contact",
      )
      .map(journeyStep);
    const ua = ordered.find((event) => event.ua)?.ua ?? "";

    sessions.push({
      id,
      start: first.t,
      end: last.t,
      durationMs: Math.max(0, last.t - first.t),
      country: ordered.find((event) => event.country)?.country || "Unknown",
      device: deviceFromUa(ua),
      source: sourceOf(first),
      medium: first.medium || "",
      campaign: first.campaign || "",
      landing: first.landing || first.path || "/",
      referrer: first.referrer || "",
      pages: uniquePages,
      journey,
      actions,
      contacted: ordered.some((event) => eventType(event) === "contact"),
    });
  }

  return sessions.sort((a, b) => b.start - a.start);
}

export async function getAnalyticsSummary() {
  const events = await loadList<AnalyticsEvent>(KEY, FILE);
  const now = Date.now();
  const day = 86_400_000;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const pageViews = events.filter((event) => eventType(event) === "page");
  const today = pageViews.filter((e) => e.t >= todayStart.getTime()).length;
  const last7 = pageViews.filter((e) => e.t >= now - 7 * day).length;
  const sessions = buildSessions(events);

  const pages = new Map<string, number>();
  const sources = new Map<string, number>();
  const devices = new Map<string, number>();
  const countries = new Map<string, number>();

  for (const event of pageViews) {
    pages.set(event.path, (pages.get(event.path) ?? 0) + 1);
  }
  for (const session of sessions) {
    sources.set(session.source, (sources.get(session.source) ?? 0) + 1);
    devices.set(session.device, (devices.get(session.device) ?? 0) + 1);
    countries.set(session.country, (countries.get(session.country) ?? 0) + 1);
  }

  const days = Array.from({ length: 14 }, (_, i) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (13 - i));
    const end = start.getTime() + day;
    return {
      label: start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      count: pageViews.filter((e) => e.t >= start.getTime() && e.t < end)
        .length,
    };
  });

  const topPages = [...pages.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }));

  const topReferrers = [...sources.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([source, count]) => ({ source, count }));

  const topDevices = [...devices.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({ source, count }));

  const topCountries = [...countries.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([source, count]) => ({ source, count }));

  const recent = [...pageViews]
    .slice(-12)
    .reverse()
    .map((event) => ({
      t: event.t,
      path: event.path,
      referrer: event.referrer,
      source: sourceOf(event),
    }));

  return {
    persist: persistenceMode(),
    total: pageViews.length,
    today,
    last7,
    sessions: sessions.length,
    contactedSessions: sessions.filter((session) => session.contacted).length,
    days,
    topPages,
    topReferrers,
    topDevices,
    topCountries,
    recent,
    sessionAudits: sessions.slice(0, 60),
  };
}

export { persistenceMode };
