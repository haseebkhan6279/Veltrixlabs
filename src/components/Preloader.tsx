"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { markIntroDone } from "@/lib/intro";
import { INTRO_SEEN_KEY } from "@/lib/intro-key";

// Rendered on the server so it covers the first paint. An inline script in the
// layout marks returning visitors with data-intro="skip" before paint, and CSS
// hides it for them, for reduced motion, and (as a failsafe) if JS never runs.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    const skip =
      !node ||
      document.documentElement.dataset.intro === "skip" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skip) {
      if (node) node.style.display = "none";
      markIntroDone();
      return;
    }

    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Private mode; the intro simply plays again next visit.
    }

    const counter = { value: 0 };
    const count = node.querySelector<HTMLElement>("[data-count]");

    const tl = gsap.timeline({
      onComplete: () => {
        node.style.display = "none";
      },
    });

    tl.fromTo(
      node.querySelector("[data-logo]"),
      { strokeDashoffset: 120 },
      { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
    )
      .to(
        counter,
        {
          value: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count) count.textContent = String(Math.round(counter.value));
          },
        },
        0,
      )
      .from(
        node.querySelectorAll("[data-word]"),
        { yPercent: 110, duration: 0.6, stagger: 0.06, ease: "power4.out" },
        0.15,
      )
      .to(node.querySelector("[data-bar]"), { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0)
      .add(() => markIntroDone(), 1.05)
      .to(node.querySelector("[data-inner]"), { opacity: 0, y: -24, duration: 0.35, ease: "power2.in" }, 0.95)
      .to(node.querySelectorAll("[data-panel]"), {
        yPercent: -100,
        duration: 0.75,
        stagger: 0.07,
        ease: "power4.inOut",
      }, 1.0);

    return () => {
      tl.kill();
      markIntroDone();
    };
  }, []);

  return (
    <div
      id="preloader"
      ref={root}
      aria-hidden
      className="preloader pointer-events-none fixed inset-0 z-[120]"
    >
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            data-panel
            className={`h-full flex-1 ${i % 2 ? "bg-[#10100e]" : "bg-obsidian"}`}
          />
        ))}
      </div>
      <div
        data-inner
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
      >
        <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
          <defs>
            <linearGradient id="preloader-v" x1="16" y1="12" x2="48" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0.5" stopColor="#c6ff3d" />
              <stop offset="0.5" stopColor="#ff6a3d" />
            </linearGradient>
          </defs>
          <path
            data-logo
            d="M16 12 L32 46 L48 12"
            stroke="url(#preloader-v)"
            strokeWidth="10"
            strokeDasharray="120"
            strokeDashoffset="120"
          />
        </svg>
        <div className="flex gap-2 overflow-hidden text-sm font-semibold uppercase tracking-[0.4em] text-zinc-200">
          {["Build.", "Automate.", "Scale."].map((word) => (
            <span key={word} data-word className="inline-block">
              {word}
            </span>
          ))}
        </div>
        <div className="w-44 sm:w-56">
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              data-bar
              className="h-full origin-left scale-x-0 bg-gradient-to-r from-volt via-sun to-ember"
            />
          </div>
          <p className="mt-3 text-right font-mono text-xs text-zinc-500">
            <span data-count>0</span>%
          </p>
        </div>
      </div>
    </div>
  );
}
