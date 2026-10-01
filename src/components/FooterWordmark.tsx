"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_NAME } from "@/lib/seo";

// Oversized wordmark whose letters rise and fill in as the footer scrolls in.
export default function FooterWordmark() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const node = root.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-letter]",
        { yPercent: 70, opacity: 0.15 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        },
      );
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none mt-12 select-none overflow-hidden sm:mt-16"
    >
      <p className="flex justify-between text-[12vw] font-bold uppercase leading-[0.8] tracking-tighter xl:text-[10.5rem]">
        {SITE_NAME.replace(/\s+/g, "").split("").map((letter, i) => (
          <span key={`${letter}-${i}`} data-letter className="gradient-text inline-block">
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
