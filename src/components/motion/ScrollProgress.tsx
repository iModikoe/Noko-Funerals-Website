"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame, useReducedMotion } from "@/lib/motion";

/**
 * A hairline gold bar across the very top of the page showing reading
 * progress. Small, quiet, and it makes long pages feel navigable.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return onScrollFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? doc.scrollTop / max : 0;
      el.style.transform = `scaleX(${p})`;
    });
  }, []);

  /* The bar itself is not motion in the vestibular sense, but there is no
     reason to run a scroll listener for someone who does not want it. */
  if (reduced) return null;

  return (
    <div
      data-no-print
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px"
    >
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
