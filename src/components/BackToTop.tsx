"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.08);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="fixed bottom-4 right-4 z-[60] grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-obsidian/80 text-cyan-electric backdrop-blur sm:bottom-6 sm:right-6"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="url(#back-to-top-ring)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
            <defs>
              <linearGradient id="back-to-top-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="relative h-4 w-4" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
