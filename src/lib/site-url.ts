import { business } from "@/content/site";

/**
 * The absolute base URL for this deployment, used by `metadataBase` so that
 * Open Graph and canonical URLs point at wherever the site is actually running.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL      — set this once the real domain is live
 *   2. the Vercel production URL — stable across production deployments
 *   3. the per-deployment URL    — correct on preview builds and PR previews
 *   4. the business domain       — local builds and anything else
 *
 * Without this, a preview deployment would advertise the live domain in its
 * metadata, which is both wrong and confusing while a proposal is being
 * reviewed.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return `https://${business.domain}`;
}
