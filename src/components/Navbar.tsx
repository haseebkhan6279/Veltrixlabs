"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import Magnetic from "@/components/Magnetic";
import BrandLogo from "@/components/BrandLogo";
import { SITE_NAME } from "@/lib/seo";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 12);
      setHidden(current > last && current > 90);
      last = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-6"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${
          open
            ? "border border-white/10 bg-obsidian"
            : scrolled
              ? "glass glow-ring shadow-[0_12px_50px_rgba(0,0,0,0.35)]"
              : "border border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="transition-transform duration-500 group-hover:rotate-[360deg]">
            <BrandLogo size={40} priority />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-wide text-zinc-50">
              {SITE_NAME}
            </span>
            <span className="block text-[11px] text-zinc-500">
              Build. Automate. Scale.
            </span>
          </span>
        </Link>

        <div
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.href} strength={0.25} className="inline-flex">
              <a
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative isolate rounded-full px-3.5 py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-50"
              >
                {hovered === link.href ? (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                {link.label}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Magnetic>
            <motion.a
              href="/#contact"
              data-track="Nav strategy call"
              whileTap={{ scale: 0.98 }}
              className="glow-btn hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-obsidian md:inline-flex"
            >
              Book a Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </Magnetic>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5 text-zinc-100 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 overflow-hidden bg-obsidian lg:hidden"
          >
            <div className="aurora-blob pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full [--blob:rgba(34,211,238,0.22)]" />
            <div className="aurora-blob pointer-events-none absolute -left-16 bottom-24 h-56 w-56 rounded-full [--blob:rgba(168,85,247,0.26)]" />
            <div className="relative flex h-full flex-col px-5 pb-8 pt-24">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ delay: 0.12 + i * 0.045, duration: 0.5, ease }}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 rounded-xl px-4 py-3 text-2xl font-semibold tracking-tight text-zinc-100 active:bg-white/5"
                    >
                      <span className="font-mono text-xs text-cyan-electric">0{i + 1}</span>
                      {link.label}
                    </motion.a>
                  </div>
                ))}
              </div>
              <motion.a
                href="/#contact"
                data-track="Mobile nav strategy call"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.45, ease }}
                className="glow-btn mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-obsidian"
              >
                Book a Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
