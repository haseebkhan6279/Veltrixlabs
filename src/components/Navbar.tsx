"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import Magnetic from "@/components/Magnetic";
import BrandLogo from "@/components/BrandLogo";
import { SITE_NAME } from "@/lib/seo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
        <a href="/" className="group flex items-center gap-3">
          <BrandLogo size={40} priority />
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-wide text-zinc-50">
              {SITE_NAME}
            </span>
            <span className="block text-[11px] text-zinc-500">
              Build. Automate. Scale.
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.href} strength={0.35} className="inline-flex">
              <a
                href={link.href}
                className="relative text-sm text-zinc-400 transition-colors hover:text-zinc-50 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-electric after:to-purple-neon after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Magnetic>
            <motion.a
              href="/#contact"
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
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-100 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-obsidian lg:hidden"
          >
            <div className="flex h-full flex-col px-5 pb-8 pt-24">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 text-lg font-medium text-zinc-100 hover:bg-white/5"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="glow-btn mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-obsidian"
              >
                Book a Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
