import { loadList, persistenceMode, pushItem } from "@/lib/json-store";

export type AnalyticsEvent = {
  t: number;
  path: string;
  referrer: string;
  ua: string;
  session: string;
};

const FILE = "analytics.json";
const KEY = "veltrix:analytics";
const MAX_EVENTS = 8000;

export async function recordEvent(event: AnalyticsEvent) {
  await pushItem(KEY, FILE, event, MAX_EVENTS);
}

export async function getAnalyticsSummary() {
  const events = await loadList<AnalyticsEvent>(KEY, FILE);
  const now = Date.now();
  const day = 86_400_000;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const today = events.filter((e) => e.t >= todayStart.getTime()).length;
  const last7 = events.filter((e) => e.t >= now - 7 * day).length;
  const sessions = new Set(events.map((e) => e.session)).size;

  const pages = new Map<string, number>();
  const referrers = new Map<string, number>();
  for (const event of events) {
    pages.set(event.path, (pages.get(event.path) ?? 0) + 1);
    const ref = event.referrer || "(direct)";
    referrers.set(ref, (referrers.get(ref) ?? 0) + 1);
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
      count: events.filter((e) => e.t >= start.getTime() && e.t < end).length,
    };
  });

  const topPages = [...pages.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }));

  const topReferrers = [...referrers.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([source, count]) => ({ source, count }));

  const recent = [...events].slice(-12).reverse();

  return {
    persist: persistenceMode(),
    total: events.length,
    today,
    last7,
    sessions,
    days,
    topPages,
    topReferrers,
    recent,
  };
}

export { persistenceMode };
