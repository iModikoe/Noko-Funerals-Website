import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./icons";

/* ─── Layout ──────────────────────────────────────────────────────────────── */

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${
        wide ? "max-w-[88rem]" : "max-w-6xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Section heading ─────────────────────────────────────────────────────── */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: As = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const centred = align === "center";
  return (
    <div
      className={`${centred ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <p className="eyebrow mb-4 flex items-center gap-3">
          {!centred && (
            <span
              aria-hidden="true"
              className="inline-block h-px w-8 bg-current opacity-60"
            />
          )}
          {eyebrow}
        </p>
      ) : null}
      <As className="text-3xl sm:text-4xl lg:text-[2.75rem] text-ink-900">
        {title}
      </As>
      {lead ? (
        <p className="mt-5 text-lg leading-relaxed text-ink-600">{lead}</p>
      ) : null}
    </div>
  );
}

/* ─── Buttons ─────────────────────────────────────────────────────────────── */

type Variant = "primary" | "secondary" | "ghost" | "onInk" | "gold";

const buttonBase =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.9375rem] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] disabled:cursor-not-allowed disabled:opacity-45";

/*
 * Variants are defined here rather than patched in via `className`, because a
 * utility passed through className does not reliably beat the variant's own
 * utility — the cascade is decided by the order Tailwind emits the rules, not
 * by the order of the class string. The gold CTA therefore needs its own
 * variant, not a `bg-gold-500` override.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-ivory-100 hover:bg-ink-700 hover:shadow-lg hover:shadow-ink-900/15 active:scale-[.985]",
  secondary:
    "border border-ink-900/20 bg-transparent text-ink-900 hover:border-gold-500 hover:bg-gold-500/8 active:scale-[.985]",
  ghost:
    "border border-transparent px-0 text-ink-900 underline decoration-gold-500 decoration-1 underline-offset-[6px] hover:decoration-2",
  /* The translucent fill is not decoration: this button sits over a
     photograph in the hero, and a fully transparent one left its label at
     3.5:1 against the brightest part of the image. */
  onInk:
    "border border-ivory-100/30 bg-ink-950/65 text-ivory-100 backdrop-blur-sm hover:border-gold-400 hover:bg-gold-400/15 active:scale-[.985]",
  /** The primary call to action on charcoal surfaces. */
  gold: "bg-gold-500 text-ink-900 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25 active:scale-[.985]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
  external = false,
  ...rest
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${buttonBase} ${variants[variant]} ${className} group`;
  const inner = (
    <>
      {children}
      {withArrow ? (
        <ArrowIcon className="text-[1.05em] transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

/* ─── "To be confirmed" marker ────────────────────────────────────────────────
   Rendered automatically wherever a content item has status "unconfirmed".
   This is how the proposal stays honest: nothing unverified is presented as
   though the business has confirmed it.
   ──────────────────────────────────────────────────────────────────────────── */

export function Unconfirmed({
  label = "Details to be confirmed",
  tone = "light",
  className = "",
}: {
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] ${
        tone === "dark"
          ? "border-gold-400/40 bg-gold-400/10 text-gold-300"
          : "border-gold-600/35 bg-gold-500/10 text-gold-700"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full bg-current"
      />
      {label}
    </span>
  );
}

/* ─── Editorial hairline rule ─────────────────────────────────────────────── */

export function Rule({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`rule ${className}`} />;
}
