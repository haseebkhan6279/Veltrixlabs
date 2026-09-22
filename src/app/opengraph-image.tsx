import { ImageResponse } from "next/og";

export const alt =
  "Veltrix Labs — We Build & Automate Digital Products That Scale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Mark({ box }: { box: number }) {
  return (
        <svg
          width={box}
          height={box}
          viewBox="0 0 64 64"
          fill="none"
        >
          <defs>
            <linearGradient
              id="veltrix-v"
              x1="16"
              y1="12"
              x2="48"
              y2="12"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.5" stopColor="#22D3EE" />
              <stop offset="0.5" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          <path
            d="M16 12 L32 46 L48 12"
            stroke="url(#veltrix-v)"
            strokeWidth="10"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="12"
          />
        </svg>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Mark box={56} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Veltrix Labs</div>
            <div style={{ fontSize: 16, color: "#a1a1aa" }}>
              Build. Automate. Scale.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            From Concept to Production-Grade Software in Weeks.
          </div>
          <div style={{ fontSize: 24, color: "#22d3ee", fontWeight: 600 }}>
            Web · Mobile · SaaS · Shopify · AI Automation
          </div>
        </div>
      </div>
    ),
    size,
  );
}
