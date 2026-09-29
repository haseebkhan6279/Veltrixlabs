"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sessionStartedAt, trackEvent } from "@/lib/client-track";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/dashboard")) return;
    trackEvent({ type: "page" });
    if (window.location.hash) {
      trackEvent({ type: "section", hash: window.location.hash });
    }
  }, [pathname]);

  useEffect(() => {
    const onHash = () => {
      if (!window.location.hash) return;
      trackEvent({ type: "section", hash: window.location.hash });
    };
    const onClick = (event: MouseEvent) => {
      const node = (event.target as HTMLElement | null)?.closest(
        "a, button, [data-track]",
      );
      if (!(node instanceof HTMLElement)) return;
      const track = node.getAttribute("data-track") ?? "";
      const href = node.getAttribute("href") ?? "";
      if (!track && !href) return;
      if (href.startsWith("#") && !track) return;
      trackEvent({
        type: "click",
        action: track || (href.startsWith("mailto:") ? "email" : "link"),
        href: href.slice(0, 220),
      });
    };
    const onLeave = () => {
      const start = sessionStartedAt();
      trackEvent({
        type: "leave",
        action: `duration:${Math.round((Date.now() - start) / 1000)}s`,
      });
    };

    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    window.addEventListener("pagehide", onLeave);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", onLeave);
    };
  }, []);

  return null;
}
