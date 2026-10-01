"use client";

import { useSyncExternalStore } from "react";

// The first-visit preloader covers the hero; hero entrance animations wait for
// it to lift so they play in view instead of underneath the curtain.

const listeners = new Set<() => void>();
let done = false;

function readInitial() {
  if (typeof document === "undefined") return false;
  const root = document.documentElement;
  return root.dataset.intro === "skip" || !document.getElementById("preloader");
}

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

function getSnapshot() {
  if (!done && readInitial()) done = true;
  return done;
}

export function useIntroReady() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

