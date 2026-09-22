import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64" fill="none">
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
      </div>
    ),
    size,
  );
}
