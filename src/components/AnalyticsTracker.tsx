"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function sessionId() {
  const key = "kx_sid";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/dashboard")) return;

    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
        session: sessionId(),
      }),
      keepalive: true,
    }).catch(() => {
      // Analytics should never break the site.
    });
  }, [pathname]);

  return null;
}
