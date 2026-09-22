export const CONTACT_PROJECT_TYPES = [
  "Web App",
  "Website",
  "SaaS",
  "Shopify",
  "Mobile App",
  "AI Automation",
  "Web3",
  "Other",
] as const;

export type ContactProjectType = (typeof CONTACT_PROJECT_TYPES)[number];
