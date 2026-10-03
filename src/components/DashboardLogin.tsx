"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function DashboardLogin({
  configured,
}: {
  configured: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!configured) return;
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "Wrong password.");
        return;
      }
      router.refresh();
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-[1.6rem] border border-white/10 bg-slate-card p-6 sm:p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-electric/20 bg-cyan-electric/10 text-cyan-electric">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-50">
          Dashboard login
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Enter the internal password to view traffic sessions and contact
          briefs.
        </p>

        {!configured ? (
          <p className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
            Set <span className="font-mono">DASHBOARD_PASSWORD</span> in
            Vercel Environment Variables (and locally in{" "}
            <span className="font-mono">.env.local</span>), then redeploy.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-zinc-300">
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition focus:border-cyan-electric/60"
              />
            </label>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <button
              type="submit"
              disabled={sending}
              className="glow-btn mt-1 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-obsidian disabled:opacity-70"
            >
              {sending ? "Checking…" : "Unlock dashboard"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
