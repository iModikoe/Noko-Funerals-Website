"use client";

import { useEffect, useState } from "react";

/**
 * Shared motion helpers.
 *
 * Every animation on this site is built on these, and every one of them is
 * switched off when the visitor has asked for reduced motion. On a funeral
 * website that is not a nicety: someone with vestibular sensitivity should not
 * be made unwell while arranging a burial.
 */

/** Slow, weighted easing. Nothing here should feel springy or playful. */
export const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";
export const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * True when the visitor prefers reduced motion.
 *
 * Returns false during SSR and on the first client render so that markup
 * matches, then updates immediately on mount. Components should render their
 * *resting* (finished) state when this is true.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Runs a callback on scroll, throttled to one animation frame.
 * Returns a cleanup function.
 */
export function onScrollFrame(fn: () => void) {
  let ticking = false;
  const handler = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      fn();
      ticking = false;
    });
  };
  window.addEventListener("scroll", handler, { passive: true });
  window.addEventListener("resize", handler, { passive: true });
  fn();
  return () => {
    window.removeEventListener("scroll", handler);
    window.removeEventListener("resize", handler);
  };
}

/** Clamps n into [min, max]. */
export const clamp = (n: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, n));

/**
 * How far an element has travelled through the viewport, 0 → 1.
 * 0 when its top edge is at the bottom of the screen, 1 when its bottom edge
 * has reached the top.
 */
export function viewportProgress(el: Element): number {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return clamp((vh - r.top) / (vh + r.height));
}
