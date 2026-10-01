import type { MetadataRoute } from "next";
import { proposal } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Crawling is allowed. Indexing is not.
 *
 * Those are two different things, and the distinction matters here for two
 * reasons:
 *
 *  1. A `Disallow: /` would actually make indexing MORE likely, not less. A
 *     crawler that is blocked from fetching the page never sees the `noindex`
 *     in its head, so the URL can still end up listed from inbound links. The
 *     reliable way to keep a page out of search is to let crawlers read it and
 *     have them find `noindex` there — which is what src/app/layout.tsx sends
 *     on every page while this is a proposal.
 *
 *  2. The proposal is shared as a link, mostly over WhatsApp. Link-preview
 *     fetchers respect robots.txt, so a blanket disallow means the message
 *     arrives as a bare URL with no title, description or image.
 *
 * So: crawlers may read the site, search engines are told not to list it, and
 * a shared link still previews properly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // Only advertise a sitemap once this is a real, indexable site.
    ...(proposal.isProposal ? {} : { sitemap: `${siteUrl()}/sitemap.xml` }),
  };
}
