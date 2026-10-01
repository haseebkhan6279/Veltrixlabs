import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const DASHBOARD_COOKIE = "vl_dash";
export const DASHBOARD_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export function dashboardPasswordConfigured() {
  return Boolean(process.env.DASHBOARD_PASSWORD?.trim());
}

function tokenFor(password: string) {
  return createHmac("sha256", password).update("veltrix-dashboard-v1").digest("hex");
}

export function expectedDashboardToken() {
  const password = process.env.DASHBOARD_PASSWORD?.trim();
  if (!password) return null;
  return tokenFor(password);
}

export function isValidDashboardToken(token: string | undefined | null) {
  const expected = expectedDashboardToken();
  if (!expected || !token) return false;
  try {
    const left = Buffer.from(token);
    const right = Buffer.from(expected);
    return left.length === right.length && timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function passwordMatches(password: string) {
  const expected = process.env.DASHBOARD_PASSWORD?.trim();
  if (!expected || !password) return false;
  try {
    const left = Buffer.from(password);
    const right = Buffer.from(expected);
    return left.length === right.length && timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function dashboardCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: DASHBOARD_COOKIE_MAX_AGE,
  };
}

export async function isDashboardAuthed() {
  const jar = await cookies();
  return isValidDashboardToken(jar.get(DASHBOARD_COOKIE)?.value);
}
