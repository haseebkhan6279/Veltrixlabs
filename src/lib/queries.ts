import {
  CONTACT_PROJECT_TYPES,
  type ContactProjectType,
} from "@/lib/contact-types";
import { loadList, persistenceMode, pushItem } from "@/lib/json-store";

export type ContactQuery = {
  id: string;
  t: number;
  name: string;
  email: string;
  type: string;
  message: string;
};

const FILE = "queries.json";
const KEY = "veltrix:queries";
const MAX_QUERIES = 2000;

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseContactQuery(
  body: unknown,
): Omit<ContactQuery, "id" | "t"> | null {
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

export async function recordQuery(input: Omit<ContactQuery, "id" | "t">) {
  const query: ContactQuery = {
    id: crypto.randomUUID(),
    t: Date.now(),
    ...input,
  };
  await pushItem(KEY, FILE, query, MAX_QUERIES);
  return query;
}

export async function listQueries() {
  const queries = await loadList<ContactQuery>(KEY, FILE);
  return [...queries].reverse();
}

export { persistenceMode };
