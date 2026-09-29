export function classifySource(referrer: string, utmSource: string) {
  const utm = utmSource.trim().toLowerCase();
  if (utm) return utm;

  if (!referrer) return "direct";

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    if (host.includes("google")) return "google";
    if (host.includes("bing") || host.includes("yahoo")) return "bing";
    if (host.includes("linkedin")) return "linkedin";
    if (host.includes("facebook") || host.includes("fb.com")) return "facebook";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("t.co") || host === "x.com" || host.includes("twitter")) {
      return "x";
    }
    if (host.includes("youtube")) return "youtube";
    if (host.includes("whatsapp")) return "whatsapp";
    if (host.includes("github")) return "github";
    if (host.includes("vercel.app") || host.includes("veltrixlabs.live")) {
      return "internal";
    }
    return host;
  } catch {
    return "direct";
  }
}

export function deviceFromUa(ua: string) {
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

export function sectionLabel(hash: string) {
  const key = hash.replace("#", "").toLowerCase();
  const labels: Record<string, string> = {
    top: "Home",
    services: "Services",
    ai: "AI workflow",
    work: "Case studies",
    reviews: "Reviews",
    about: "About",
    stack: "Stack",
    process: "Process",
    contact: "Contact",
    queries: "Queries",
  };
  return labels[key] ?? (key ? key : "Home");
}
