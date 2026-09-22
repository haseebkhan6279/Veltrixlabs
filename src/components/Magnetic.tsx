"use client";

import {
  type ReactNode,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strength?: number;
};

export default function Magnetic({
  children,
  strength = 0.28,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left - box.width / 2) * strength;
    const y = (event.clientY - box.top - box.height / 2) * strength;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`will-change-transform transition-transform duration-200 ease-out ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
