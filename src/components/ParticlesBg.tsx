"use client";

import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBg() {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        color: { value: ["#22d3ee", "#a855f7", "#e4e4e7"] },
        links: {
          color: "#22d3ee",
          distance: 130,
          enable: true,
          opacity: 0.16,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.55,
          outModes: { default: "out" },
        },
        number: { density: { enable: true }, value: 52 },
        opacity: { value: 0.38 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.6 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          repulse: { distance: 90, duration: 0.35 },
        },
      },
    }),
    [],
  );

  return (
    <div className="absolute inset-0 z-0">
      <ParticlesProvider init={loadSlim}>
        <Particles
          id="veltrix-particles"
          className="h-full w-full"
          options={options}
        />
      </ParticlesProvider>
    </div>
  );
}
