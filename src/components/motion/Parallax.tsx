"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { onScrollFrame, useReducedMotion, viewportProgress } from "@/lib/motion";

/**
 * Drifts its children vertically as the page scrolls.
 *
 * Deliberately gentle — `strength` is the total travel in pixels across the
 * whole viewport pass. Anything above about 60 starts to feel like a gimmick
 * rather than depth.
 *
 * Only `transform` is touched, so this never triggers layout.
 */
export default function Parallax({
  children,
  strength = 40,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    return onScrollFrame(() => {
      const p = viewportProgress(el);
      /* -0.5 → 0.5 so the element sits at its natural position mid-screen */
      el.style.transform = `translate3d(0, ${(p - 0.5) * -strength}px, 0)`;
    });
  }, [strength, reduced]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/**
 * Slowly scales its children up as they pass through the viewport — the
 * "Ken Burns" drift that makes a still photograph feel alive.
 */
export function SlowZoom({
  children,
  from = 1,
  to = 1.09,
  className = "",
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    return onScrollFrame(() => {
      const p = viewportProgress(el);
      el.style.transform = `scale(${from + (to - from) * p})`;
    });
  }, [from, to, reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", transform: `scale(${from})` }}
    >
      {children}
    </div>
  );
}
