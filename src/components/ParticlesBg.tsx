"use client";

import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBg() {
  const options = useMemo<ISourceOptions>(() => {
    // Phones get fewer particles, no link lines (the costly part), and a
    // lower frame cap, so the hero stays smooth on mid-range devices.
    const small = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return {
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: small ? 30 : 60,
      detectRetina: !small,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        color: { value: ["#c6ff3d", "#ff6a3d", "#ffb547", "#e4e4e7"] },
        links: {
          color: "#c6ff3d",
          distance: 130,
          enable: !small,
          opacity: 0.14,
          width: 1,
        },
        move: {
          enable: !reduced,
          speed: 0.55,
          outModes: { default: "out" },
        },
        number: { density: { enable: true }, value: small ? 22 : 52 },
        opacity: {
          value: { min: 0.15, max: 0.5 },
        },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.6 } },
      },
      interactivity: {
        events: {
          onHover: { enable: !small, mode: "grab" },
        },
        modes: {
          grab: { distance: 150, links: { opacity: 0.35, color: "#ff6a3d" } },
        },
      },
    };
  }, []);

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
