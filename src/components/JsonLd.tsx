import { SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/seo";
import { TEAM } from "@/lib/team";
import { PROJECTS } from "@/lib/projects";

export default function JsonLd() {
  const founder = TEAM[0];
  const coFounder = TEAM[1];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        email: SITE_EMAIL,
        description: SITE_DESCRIPTION,
        slogan: "We Build & Automate Digital Products That Scale — Fast.",
        areaServed: ["US", "GB", "PK", "Worldwide"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        sameAs: [
          founder.linkedIn,
          founder.github,
          coFounder.linkedIn,
        ].filter(Boolean),
        founder: {
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.role,
          email: founder.email,
          url: founder.linkedIn,
        },
        employee: TEAM.map((person) => ({
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
          email: person.email,
          url: person.linkedIn,
        })),
        knowsAbout: [
          "Next.js",
          "SaaS",
          "Shopify",
          "React Native",
          "AI automation",
          "n8n",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web & Mobile Development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SaaS & Dashboard Engineering",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-commerce & Shopify Solutions",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI & n8n Workflow Automation",
            },
          },
        ],
        numberOfEmployees: TEAM.length,
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#work`,
        name: `${SITE_NAME} case studies`,
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.slice(0, 12).map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.name,
          description: project.tagline,
          url: project.url ?? `${SITE_URL}/#work`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
