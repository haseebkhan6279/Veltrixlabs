import { NextResponse } from "next/server";
import {
  getAnalyticsSummary,
  recordEvent,
  type EventType,
} from "@/lib/analytics";
import { isDashboardAuthed } from "@/lib/dashboard-auth";
import { classifySource } from "@/lib/traffic";

export const runtime = "nodejs";

const EVENT_TYPES = new Set<EventType>([
  "page",
  "section",
  "click",
  "contact",
  "leave",
]);

function isBot(ua: string) {
  return /bot|crawl|spider|slurp|facebook|preview/i.test(ua);
}

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  if (isBot(ua)) return NextResponse.json({ ok: true });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const type = EVENT_TYPES.has(body.type as EventType)
    ? (body.type as EventType)
    : "page";
  const pagePath = clip(body.path, 180) || "/";
  if (
    !pagePath.startsWith("/") ||
    pagePath.startsWith("/dashboard") ||
    pagePath.startsWith("/api")
  ) {
    return NextResponse.json({ ok: true });
  }

  const referrer = clip(body.referrer, 300);
  const utmSource = clip(body.source, 80);

  try {
    await recordEvent({
      t: Date.now(),
      type,
      path: pagePath,
      hash: clip(body.hash, 80),
      session: clip(body.session, 80) || "anon",
      visitor: clip(body.visitor, 80),
      referrer,
      source: classifySource(referrer, utmSource),
      medium: clip(body.medium, 80),
      campaign: clip(body.campaign, 120),
      landing: clip(body.landing, 220),
      action: clip(body.action, 120),
      href: clip(body.href, 220),
      country:
        request.headers.get("x-vercel-ip-country") ??
        request.headers.get("cf-ipcountry") ??
        "",
      ua: ua.slice(0, 180),
    });
  } catch (error) {
    console.error("analytics POST", error);
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  if (!(await isDashboardAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await getAnalyticsSummary());
  } catch (error) {
    console.error("analytics GET", error);
    return NextResponse.json({
      persist: "ephemeral",
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
    });
  }
}
