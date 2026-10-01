"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * The looping procession clip in the hero.
 *
 * Behaviour, in order of who it protects:
 *   • Reduced motion   → the poster frame only, never any playback.
 *   • Save-Data / 2G   → the poster frame only. Data costs money here.
 *   • Off screen       → paused, so it burns no battery while you read on.
 *   • Autoplay blocked → poster frame plus a visible play control.
 *
 * The clip is silent by design: there is no audio track in the file at all,
 * so nothing can ever start making noise in a quiet room.
 */
export default function HeroVideo({
  className = "",
  poster = "/video/procession-poster.webp",
  src = "/video/procession.mp4",
  label = "A Noko Funerals procession: an usher in uniform beside the line of cars.",
}: {
  className?: string;
  poster?: string;
  src?: string;
  label?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  /* Decide whether to load the clip at all. */
  useEffect(() => {
    if (reduced) {
      setAllowed(false);
      return;
    }
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const thrifty =
      conn?.saveData === true ||
      (conn?.effectiveType ? /2g/.test(conn.effectiveType) : false);

    setAllowed(!thrifty);
  }, [reduced]);

  /* Pause whenever it is not on screen. */
  useEffect(() => {
    const el = wrapRef.current;
    const v = videoRef.current;
    if (!allowed || !el || !v || typeof IntersectionObserver === "undefined")
      return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().then(
            () => setPlaying(true),
            () => setPlaying(false), // autoplay refused — show the control
          );
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [allowed]);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {/* Soft gold bloom behind the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-gold-500/[0.09] blur-3xl"
      />

      <figure className="relative overflow-hidden rounded-2xl ring-1 ring-ivory-100/15">
        {allowed ? (
          <video
            ref={videoRef}
            className="block h-full w-full object-cover"
            style={{
              opacity: ready ? 1 : 0,
              transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1)",
            }}
            width={436}
            height={696}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
            onLoadedData={() => setReady(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          /* Reduced motion or a metered connection: the still frame only. */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={label}
            width={436}
            height={696}
            className="block h-full w-full object-cover"
          />
        )}

        {/* The still sits underneath until the first frame has decoded */}
        {allowed && !ready ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        {/* Cinematic vignette, keeps the panel sitting into the dark page */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/15"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold-400/25"
        />

        {allowed ? (
          <button
            type="button"
            onClick={toggle}
            className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full bg-ink-950/80 px-3.5 py-2 text-[0.75rem] font-medium text-ivory-100 backdrop-blur-sm transition-colors duration-300 hover:bg-ink-950/95"
          >
            <span aria-hidden="true">
              {playing ? (
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              )}
            </span>
            {playing ? "Pause" : "Play"}
            <span className="sr-only"> the procession clip</span>
          </button>
        ) : null}

        <figcaption className="sr-only">{label}</figcaption>
      </figure>
    </div>
  );
}
