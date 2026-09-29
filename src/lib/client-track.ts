"use client";

import { classifySource } from "@/lib/traffic";

const VISITOR_KEY = "vl_vid";
const SESSION_KEY = "vl_sid";
const ATTR_KEY = "vl_attr";
const START_KEY = "vl_start";
const SEEN_KEY = "vl_seen";
const IDLE_MS = 30 * 60 * 1000;

type Attr = {
  source: string;
  medium: string;
  campaign: string;
  landing: string;
  referrer: string;
};

function visitorId() {
  let id = window.localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function sessionId() {
  const now = Date.now();
  const seen = Number(window.sessionStorage.getItem(SEEN_KEY) || 0);
  let id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id || (seen && now - seen > IDLE_MS)) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, id);
    window.sessionStorage.removeItem(ATTR_KEY);
    window.sessionStorage.setItem(START_KEY, String(now));
  }
  window.sessionStorage.setItem(SEEN_KEY, String(now));
  return id;
}

function attribution(): Attr {
  const raw = window.sessionStorage.getItem(ATTR_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Attr;
    } catch {
      // Fall through and capture a fresh attribution.
    }
  }

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  const attr: Attr = {
    source: classifySource(referrer, params.get("utm_source") ?? ""),
    medium: (params.get("utm_medium") ?? "").slice(0, 80),
    campaign: (params.get("utm_campaign") ?? "").slice(0, 120),
    landing: `${window.location.pathname}${window.location.search}${window.location.hash}`.slice(
      0,
      220,
    ),
    referrer,
  };
  window.sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
  return attr;
}

export function sessionStartedAt() {
  return Number(window.sessionStorage.getItem(START_KEY) || Date.now());
}

export function trackEvent(extra: Record<string, string>) {
  if (window.location.pathname.startsWith("/dashboard")) return;
  const attr = attribution();
  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session: sessionId(),
      visitor: visitorId(),
      path: window.location.pathname,
      hash: window.location.hash,
      referrer: attr.referrer,
      source: attr.source,
      medium: attr.medium,
      campaign: attr.campaign,
      landing: attr.landing,
      ...extra,
    }),
    keepalive: true,
  }).catch(() => {
    // Analytics should never break the site.
  });
}
