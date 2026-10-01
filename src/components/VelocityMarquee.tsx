"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

type Props = {
  items: string[];
  baseVelocity?: number;
  outline?: boolean;
};

// A band of oversized words that drifts on its own and speeds up (or reverses)
// with scroll velocity. Only transforms are touched, and it idles offscreen.
export default function VelocityMarquee({
  items,
  baseVelocity = -2.5,
  outline = false,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "20% 0px" });
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    base.set(base.get() + move);
  });

  const row = [...items, ...items];

  return (
    <div ref={root} className="relative overflow-hidden py-4 sm:py-6" aria-hidden>
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className={`flex items-center text-[2.6rem] font-semibold uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl ${
                  outline ? "stroke-text" : i % 2 ? "gradient-text" : "text-zinc-100"
                }`}
              >
                {item}
                <span className="mx-5 inline-block h-3 w-3 rotate-45 bg-gradient-to-br from-volt to-ember sm:mx-8 sm:h-4 sm:w-4" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
