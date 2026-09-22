"use client";

import {
  type ReactNode,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
} from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  maxTilt?: number;
};

export default function TiltCard({
  children,
  className = "",
  maxTilt = 11,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    rest.onMouseMove?.(event);
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    const rx = (0.5 - py) * maxTilt;
    const ry = (px - 0.5) * maxTilt;
    node.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03, 1.03, 1.03)`;
    node.style.setProperty("--spot-x", `${px * 100}%`);
    node.style.setProperty("--spot-y", `${py * 100}%`);
  };

  const onLeave = (event: MouseEvent<HTMLDivElement>) => {
    rest.onMouseLeave?.(event);
    const node = ref.current;
    if (!node) return;
    node.style.transform =
      "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const { onMouseMove: _om, onMouseLeave: _ol, ...safe } = rest;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-spot transform-gpu transition-transform duration-300 ease-out ${className}`}
      {...safe}
    >
      {children}
    </div>
  );
}
