"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Reveals a line of text word by word, each word rising from behind a mask.
 *
 * This is the "expensive" typographic reveal — it reads as deliberate and
 * composed rather than as a web page loading. Used sparingly: the hero
 * headline and the closing line, not every heading on the site.
 *
 * Accessibility: the full string is always present as real text. Words are
 * wrapped in spans for animation only, and the wrapper is marked as a single
 * text block so screen readers read it as one sentence, not a word list.
 */
export default function SplitText({
  text,
  as: As = "span",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 70,
  duration = 900,
  /** Begins on mount (hero) rather than waiting to be scrolled into view. */
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (immediate) {
      setPlay(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const words = text.split(" ");

  /* Reduced motion, or before hydration: render plain, finished text. */
  if (reduced) {
    return <As className={className}>{text}</As>;
  }

  return (
    <As ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          /* The mask: overflow-hidden so the word can rise from nothing. */
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          <span
            className={`inline-block will-change-transform ${wordClassName}`}
            style={{
              transform: play ? "translateY(0)" : "translateY(105%)",
              opacity: play ? 1 : 0,
              transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${
                delay + i * stagger
              }ms, opacity ${duration}ms ease ${delay + i * stagger}ms`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </As>
  );
}

/** Renders children behind the same rising mask, for non-text elements. */
export function MaskRise({
  children,
  delay = 0,
  duration = 900,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        style={{
          transform: play ? "translateY(0)" : "translateY(100%)",
          opacity: play ? 1 : 0,
          transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity ${duration}ms ease ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
