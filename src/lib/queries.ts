import { promises as fs } from "fs";
import path from "path";
import {
  CONTACT_PROJECT_TYPES,
  type ContactProjectType,
} from "@/lib/contact-types";

export type ContactQuery = {
  id: string;
  t: number;
  name: string;
  email: string;
  type: string;
  message: string;
};

const FILE = path.join(process.cwd(), "data", "queries.json");
const MAX_QUERIES = 2000;

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseContactQuery(body: unknown): Omit<ContactQuery, "id" | "t"> | null {
  if (!body || typeof body !== "object") return null;
  const input = body as Record<string, unknown>;
  const name = clip(input.name, 80);
  const email = clip(input.email, 120).toLowerCase();
  const type = clip(input.type, 40);
  const message = clip(input.message, 4000);

  if (!name || !email || !type || !message) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (!CONTACT_PROJECT_TYPES.includes(type as ContactProjectType)) return null;

  return { name, email, type, message };
}

async function readQueries(): Promise<ContactQuery[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as ContactQuery[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeQueries(queries: ContactQuery[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(queries, null, 2), "utf8");
}

export async function recordQuery(input: Omit<ContactQuery, "id" | "t">) {
  const queries = await readQueries();
  const query: ContactQuery = {
    id: crypto.randomUUID(),
    t: Date.now(),
    ...input,
  };
  queries.push(query);
  const trimmed = queries.length > MAX_QUERIES ? queries.slice(-MAX_QUERIES) : queries;
  await writeQueries(trimmed);
  return query;
}

export async function listQueries() {
  const queries = await readQueries();
  return [...queries].reverse();
}
