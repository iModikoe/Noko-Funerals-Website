import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/site";

/**
 * The Noko Funerals logo, supplied by the business.
 *
 * Two variants are kept in /public/brand, both extracted from the original
 * artwork with a transparent background:
 *   logo-dark.png   black + gold — for ivory surfaces
 *   logo-light.png  ivory + gold — for charcoal surfaces
 *
 * To replace the logo, drop new files at those two paths at the same aspect
 * ratio (roughly 16:9). Nothing else needs to change.
 */
export function Logo({
  tone = "dark",
  className = "",
  width = 190,
  priority = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  width?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "light" ? "/brand/logo-light.png" : "/brand/logo-dark.png"}
      alt={`${business.name} — ${business.tagline}`}
      width={width}
      height={Math.round((width * 506) / 900)}
      priority={priority}
      className={className}
    />
  );
}

/** The logo wrapped as a link home, with an accessible name. */
export function LogoLink({
  tone = "dark",
  width = 178,
  priority = false,
  className = "",
}: {
  tone?: "dark" | "light";
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${business.name} — home`}
      className={`inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <Logo tone={tone} width={width} priority={priority} />
    </Link>
  );
}

/** The porcupine mark on its own, for small decorative use. */
export function Mark({
  tone = "gold",
  width = 40,
  className = "",
}: {
  tone?: "gold" | "light" | "dark";
  width?: number;
  className?: string;
}) {
  return (
    <Image
      src={`/brand/mark-${tone}.png`}
      alt=""
      aria-hidden="true"
      width={width}
      height={Math.round((width * 306) / 600)}
      className={className}
    />
  );
}
