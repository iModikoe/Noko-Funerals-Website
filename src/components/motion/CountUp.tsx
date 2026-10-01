"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Counts a number up when it scrolls into view.
 *
 * Only ever used for figures the business actually supplied — the number of
 * branches, the provinces served, the package prices. No invented statistics
 * are animated here, or anywhere else on this site.
 */
export default function CountUp({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setValue(to);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          /* ease-out cubic: quick to settle, no overshoot */
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {/* The true value stays available to assistive tech throughout */}
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
    </span>
  );
}
