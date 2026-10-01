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

    // Record how far visitors scroll: each section once per page view.
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (!entry.isIntersecting || seen.has(id)) continue;
          seen.add(id);
          trackEvent({ type: "section", hash: `#${id}`, action: "view" });
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    const timer = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("main section[id]")
        .forEach((node) => observer.observe(node));
    }, 1500);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
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
