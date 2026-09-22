import type { Metadata } from "next";
import DashboardClient from "@/components/DashboardClient";
import BrandLogo from "@/components/BrandLogo";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Analytics dashboard",
  description: "Internal Veltrix Labs analytics and contact queries. Not indexed.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: "/dashboard" },
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <div className="border-b border-white/8 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <BrandLogo size={36} />
          <div>
            <p className="text-sm font-semibold text-zinc-100">{SITE_NAME}</p>
            <p className="text-[11px] text-zinc-500">Internal analytics & queries</p>
          </div>
        </div>
      </div>
      <DashboardClient />
    </main>
  );
}
