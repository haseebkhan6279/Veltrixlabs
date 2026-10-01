import { NextResponse } from "next/server";
import {
  DASHBOARD_COOKIE,
  dashboardCookieOptions,
  dashboardPasswordConfigured,
  expectedDashboardToken,
  passwordMatches,
} from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!dashboardPasswordConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Dashboard password is not configured." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!passwordMatches(password)) {
    return NextResponse.json(
      { ok: false, error: "Wrong password." },
      { status: 401 },
    );
  }

  const token = expectedDashboardToken();
  if (!token) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(DASHBOARD_COOKIE, token, dashboardCookieOptions());
  return response;
}
