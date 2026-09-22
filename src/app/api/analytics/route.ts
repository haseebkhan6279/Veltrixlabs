import { NextResponse } from "next/server";
import { getAnalyticsSummary, recordEvent } from "@/lib/analytics";

function isBot(ua: string) {
  return /bot|crawl|spider|slurp|facebook|preview/i.test(ua);
}

export async function POST(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  if (isBot(ua)) return NextResponse.json({ ok: true });

  let body: { path?: string; referrer?: string; session?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const pagePath = typeof body.path === "string" ? body.path.slice(0, 180) : "";
  if (!pagePath.startsWith("/") || pagePath.startsWith("/dashboard") || pagePath.startsWith("/api")) {
    return NextResponse.json({ ok: true });
  }

  await recordEvent({
    t: Date.now(),
    path: pagePath,
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 300) : "",
    ua: ua.slice(0, 180),
    session: typeof body.session === "string" ? body.session.slice(0, 80) : "anon",
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const summary = await getAnalyticsSummary();
  return NextResponse.json(summary);
}
