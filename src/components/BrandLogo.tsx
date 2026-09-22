import { useId } from "react";
import { SITE_NAME } from "@/lib/seo";

export default function BrandLogo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  const gradientId = `veltrix-v-${useId().replace(/:/g, "")}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={SITE_NAME}
    >
      <defs>
        <linearGradient
          id={gradientId}
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
        stroke={`url(#${gradientId})`}
        strokeWidth="10"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={12}
        fill="none"
      />
    </svg>
  );
}
