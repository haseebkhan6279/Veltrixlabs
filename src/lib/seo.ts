import type { Metadata } from "next";

export const SITE_NAME = "Veltrix Labs";
export const SITE_SHORT = "Veltrix";
export const SITE_TAGLINE =
  "We Build & Automate Digital Products That Scale — Fast.";
export const SITE_DESCRIPTION =
  "Veltrix Labs is a founder-led studio that builds and automates web apps, mobile, Shopify, SaaS, and AI workflows for clients in the US, UK, and worldwide.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://veltrixlabs.live";

export const SITE_KEYWORDS = [
  "Veltrix Labs",
  "software agency",
  "Next.js development",
  "SaaS development",
  "Shopify development",
  "React Native apps",
  "AI automation",
  "n8n workflows",
  "full-stack agency",
  "web app development",
  "custom software Lahore",
  "product studio",
  "hire software developers",
  "multi-tenant SaaS",
];

export const SITE_EMAIL = "hello@veltrixlabs.live";
export const SITE_LOCATION = "Lahore, Pakistan";

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
} as const;

export const HOME_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const HOME_DESCRIPTION = SITE_DESCRIPTION;

export const BLOG_TITLE = "Studio blog";
export const BLOG_DESCRIPTION =
  "Notes from Veltrix Labs on Next.js, Shopify, SaaS, React Native, and AI automation — how a founder-led studio ships production software in weeks.";

export const SERVICES_TITLE = "Software services by stack and industry";
export const SERVICES_DESCRIPTION =
  "Custom web apps, APIs, cloud, mobile, and SaaS by stack and industry. Next.js, React, Node, Python, AWS, and more for e-commerce, FinTech, healthcare, and logistics.";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  index?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  index = true,
  ogType = "website",
  publishedTime,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const socialTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords.length > 0 ? keywords : SITE_KEYWORDS,
    robots: index
      ? undefined
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      locale: "en_US",
      images: [OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
