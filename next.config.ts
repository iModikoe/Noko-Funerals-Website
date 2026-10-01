import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * Vercel adds HSTS on its own domains, so it is deliberately not set here —
 * committing a site to HTTPS-only is the owner's decision, not a default, and
 * getting it wrong on a subdomain is painful to undo.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },

      /*
       * Photography, brand files and the video clip are served from /public,
       * so their filenames are not content-hashed. A day of freshness plus a
       * week of stale-while-revalidate keeps repeat visits cheap while still
       * letting a replaced asset propagate quickly during the proposal stage.
       */
      {
        source: "/:dir(photos|brand|video)/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
