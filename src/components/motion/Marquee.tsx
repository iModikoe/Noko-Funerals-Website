"use client";

import { useReducedMotion } from "@/lib/motion";

/**
 * A slow, continuous band of the towns the business serves.
 *
 * Paused on hover, and replaced with a plain wrapped list for reduced-motion
 * visitors, who get exactly the same words without the movement.
 */
export default function Marquee({
  items,
  className = "",
  /** Seconds for one full pass. Slow on purpose. */
  speed = 48,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul
        className={`flex flex-wrap justify-center gap-x-7 gap-y-2 ${className}`}
      >
        {items.map((item) => (
          <li key={item} className="text-ivory-200/75">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  /* Two identical runs sit side by side; translating by exactly -50% of the
     pair puts run two where run one started, so the seam never shows. */
  const run = [...items, ...items];

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      /* The list is announced once; the duplicate run is decorative. */
      role="list"
      aria-label="Towns we serve"
    >
      <div
        className="flex w-max gap-x-10 will-change-transform group-hover:[animation-play-state:paused]"
        style={{ animation: `noko-marquee ${speed}s linear infinite` }}
      >
        {run.map((item, i) => (
          <span
            key={`${item}-${i}`}
            role={i < items.length ? "listitem" : undefined}
            aria-hidden={i >= items.length ? true : undefined}
            className="flex shrink-0 items-center gap-10 whitespace-nowrap text-ivory-200/70"
          >
            {item}
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-gold-400/70"
            />
          </span>
        ))}
      </div>

      {/* Fade the band out at both edges so it reads as continuous */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink-900 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink-900 to-transparent"
      />
    </div>
  );
}
