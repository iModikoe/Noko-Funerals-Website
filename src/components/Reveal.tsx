"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Reveals its children once they scroll into view.
 *
 * Motion is a progressive enhancement only:
 *   • prefers-reduced-motion is honoured in CSS (globals.css) — the element
 *     is simply visible with no animation.
 *   • If IntersectionObserver is unavailable, content is shown immediately.
 *   • If JavaScript never runs, the `.no-js` rule in globals.css shows it.
 */
export default function Reveal({
  children,
  as: As = "div",
  delay = 0,
  variant = "rise",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger, in milliseconds. */
  delay?: number;
  variant?: "rise" | "fade";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Tells the failsafe in <head> that the app is alive, so it leaves the
       reveals armed. See the inline script in layout.tsx. */
    document.documentElement.dataset.revealHydrated = "1";

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <As
      ref={ref}
      data-reveal={variant === "fade" ? "fade" : ""}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </As>
  );
}
