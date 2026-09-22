import { NextResponse } from "next/server";
import { listQueries, parseContactQuery, recordQuery } from "@/lib/queries";

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

  const query = await recordQuery(parsed);
  return NextResponse.json({ ok: true, id: query.id });
}

export async function GET() {
  const queries = await listQueries();
  return NextResponse.json({
    total: queries.length,
    queries,
  });
}
