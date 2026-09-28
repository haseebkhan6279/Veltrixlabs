import { NextResponse } from "next/server";
import {
  listQueries,
  parseContactQuery,
  persistenceMode,
  recordQuery,
} from "@/lib/queries";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = parseContactQuery(body);
  if (!parsed) {
    return NextResponse.json({ ok: false, error: "Invalid brief" }, { status: 400 });
  }

  try {
    const query = await recordQuery(parsed);
    return NextResponse.json({ ok: true, id: query.id, persist: persistenceMode() });
  } catch (error) {
    console.error("contact POST", error);
    return NextResponse.json(
      { ok: false, error: "Could not save brief" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const queries = await listQueries();
    return NextResponse.json({
      persist: persistenceMode(),
      total: queries.length,
      queries,
    });
  } catch (error) {
    console.error("contact GET", error);
    return NextResponse.json(
      { persist: persistenceMode(), total: 0, queries: [] },
      { status: 200 },
    );
  }
}
