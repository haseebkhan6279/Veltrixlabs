"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bot,
  LayoutDashboard,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import TiltCard from "@/components/TiltCard";
import SplitReveal from "@/components/SplitReveal";
import { IMAGES } from "@/lib/constants";

const services = [
  {
    title: "Web & Mobile Development",
    copy: "Full-stack applications with Next.js, React Native, and Node.js — real-time features, database architecture, and production-grade DX.",
    icon: Smartphone,
    image: IMAGES.webDev,
    imageAlt: "Full-stack web development on a code editor",
  },
  {
    title: "SaaS & Dashboard Engineering",
    copy: "Scalable multi-tenant SaaS platforms with role-based access, analytics engines, and real-time scheduling tools built to grow with you.",
    icon: LayoutDashboard,
    image: IMAGES.saas,
    imageAlt: "Analytics dashboard for a multi-tenant SaaS product",
  },
  {
    title: "E-commerce & Shopify Solutions",
    copy: "High-converting storefronts, programmatic SEO engines (3,000+ targeted landing pages), custom Shopify setups, and payment integration.",
    icon: ShoppingBag,
    image: IMAGES.shopify,
    imageAlt: "Premium retail and e-commerce storefront",
  },
  {
    title: "AI & n8n Workflow Automation",
    copy: "Custom AI chat assistants, automated lead routing, n8n workflow orchestration, and API-driven automation that removes operational drag.",
    icon: Bot,
    image: IMAGES.ai,
    imageAlt: "Artificial intelligence and automation systems",
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: mobile ? 36 : 120,
        opacity: 0,
        rotateX: mobile ? 0 : 18,
        filter: mobile ? "none" : "blur(12px)",
        duration: mobile ? 0.7 : 1.1,
        stagger: 0.16,
        ease: "power4.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 82%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
            Core Services
          </p>
          <SplitReveal className="mt-3 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Capabilities engineered for speed and scale.
          </SplitReveal>
        </div>

        <div className="services-grid grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <TiltCard key={service.title} className="service-card rounded-[1.75rem]">
                <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-slate-card/80">
                  <div className="relative h-40 overflow-hidden sm:h-52">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-card via-slate-card/20 to-transparent" />
                  </div>
                  <div className="relative p-5 sm:p-7">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-electric transition group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(34,211,238,0.35)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-50">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {service.copy}
                    </p>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>
        <p className="mt-10 text-sm text-zinc-400">
          Need a stack-and-industry brief?{" "}
          <Link href="/services" className="text-cyan-electric hover:underline">
            Browse all 8,640 niche services by stack and vertical
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
