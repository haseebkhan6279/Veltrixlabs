"use client";

import { useEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
};

export default function SplitReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const split = new SplitText(node, {
      type: "words,chars",
      charsClass: "split-char",
      wordsClass: "split-word",
    });

    const tween = gsap.from(split.chars, {
      yPercent: 110,
      opacity: 0,
      rotateX: 50,
      stagger: 0.016,
      duration: 0.85,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: node,
        start: "top 88%",
        once,
      },
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [children, delay, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
