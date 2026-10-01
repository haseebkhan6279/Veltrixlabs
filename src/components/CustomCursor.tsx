"use client";

import { useEffect, useRef } from "react";

// Desktop-only cursor. The ring grows over anything clickable and shows a
// label over elements marked with data-cursor="<text>".
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const clickable = target?.closest("a, button, [role='tab'], input, textarea, select, label");
      if (labelled) {
        targetScale = 2.6;
        if (label.current) label.current.textContent = labelled.dataset.cursor ?? "";
      } else {
        targetScale = clickable ? 1.7 : 1;
        if (label.current) label.current.textContent = "";
      }
      ring.current?.classList.toggle("cursor-active", Boolean(labelled || clickable));
      dot.current?.classList.toggle("opacity-0", Boolean(labelled));
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      scale += (targetScale - scale) * 0.2;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:md:block">
      <div
        ref={ring}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        className="cursor-ring absolute grid h-9 w-9 place-items-center rounded-full border border-volt/60 shadow-[0_0_24px_rgba(198,255,61,0.25)] transition-[background-color,border-color] duration-300"
      >
        <span
          ref={label}
          className="text-[5px] font-bold uppercase tracking-[0.12em] text-obsidian"
        />
      </div>
      <div
        ref={dot}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        className="absolute h-1.5 w-1.5 rounded-full bg-volt transition-opacity duration-200"
      />
    </div>
  );
}
