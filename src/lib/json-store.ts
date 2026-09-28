import { promises as fs } from "fs";
import path from "path";

function redisEnv() {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ??
    process.env.KV_REST_API_READ_WRITE_TOKEN ??
    process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

export function persistenceMode(): "redis" | "file" | "ephemeral" {
  if (redisEnv()) return "redis";
  if (process.env.VERCEL) return "ephemeral";
  return "file";
}

function filePath(name: string) {
  const dir = process.env.VERCEL
    ? "/tmp"
    : path.join(process.cwd(), "data");
  return path.join(dir, name);
}

async function redisCommand(
  command: (string | number)[],
): Promise<unknown> {
  const env = redisEnv();
  if (!env) throw new Error("Redis is not configured");
  const res = await fetch(env.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Store ${res.status}`);
  }
  const json = (await res.json()) as { result: unknown };
  return json.result;
}

async function redisPipeline(commands: (string | number)[][]) {
  const env = redisEnv();
  if (!env) throw new Error("Redis is not configured");
  const res = await fetch(`${env.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Store ${res.status}`);
  }
}

async function readFileList<T>(name: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath(name), "utf8");
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileList<T>(name: string, items: T[]) {
  const dest = filePath(name);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, JSON.stringify(items), "utf8");
}

export async function loadList<T>(key: string, file: string): Promise<T[]> {
  if (redisEnv()) {
    const result = await redisCommand(["LRANGE", key, "0", "-1"]);
    if (!Array.isArray(result)) return [];
    return result
      .map((row) => {
        try {
          return JSON.parse(String(row)) as T;
        } catch {
          return null;
        }
      })
      .filter((row): row is T => row !== null);
  }
  return readFileList<T>(file);
}

export async function pushItem<T>(
  key: string,
  file: string,
  item: T,
  max: number,
): Promise<void> {
  if (redisEnv()) {
    await redisPipeline([
      ["RPUSH", key, JSON.stringify(item)],
      ["LTRIM", key, `-${max}`, "-1"],
    ]);
    return;
  }
  const items = await readFileList<T>(file);
  items.push(item);
  await writeFileList(file, items.length > max ? items.slice(-max) : items);
}
