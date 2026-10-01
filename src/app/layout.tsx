import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProposalBanner from "@/components/ProposalBanner";
import MobileContactBar from "@/components/MobileContactBar";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { business } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/*
 * Fonts live in the repository at src/fonts, not on Google's servers.
 *
 * next/font/google would fetch them at build time, which means a flaky
 * connection silently produces a build set in Times New Roman. For a site that
 * gets demonstrated on whatever Wi-Fi is to hand, that is not a risk worth
 * carrying — so the latin subsets are vendored and loaded with next/font/local.
 * Builds now work offline, and the result is byte-for-byte identical every time.
 *
 * Both are variable fonts: one file covers weights 400–600, which is fewer
 * requests and fewer bytes than the separate static weights would have been
 * (125 KB for all three faces).
 */
const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-normal.woff2", weight: "400 600", style: "normal" },
    { path: "../fonts/cormorant-italic.woff2", weight: "400 600", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const inter = localFont({
  src: [
    { path: "../fonts/inter-normal.woff2", weight: "400 600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${business.name} — ${business.tagline}`,
    template: `%s | ${business.name}`,
  },
  description:
    "Noko Funerals arranges dignified funerals for families across North West, Limpopo and Gauteng. Phone or WhatsApp us for help with arrangements, transport and monthly packages.",
  applicationName: business.name,
  /*
   * The proposal preview must not be indexed. Remove this block — and set
   * proposal.isProposal to false in src/content/site.ts — when the site
   * goes live for the business.
   */
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  icons: {
    icon: [{ url: "/brand/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/brand/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: business.name,
    title: `${business.name} — ${business.tagline}`,
    description:
      "Dignified funeral arrangements and compassionate guidance for families across North West, Limpopo and Gauteng.",
  },
};

export const viewport: Viewport = {
  themeColor: "#17171a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/*
         * Arms the scroll reveals, and disarms them again if the app has not
         * hydrated within a few seconds. Runs in <head> so content is never
         * painted and then hidden. See the reveal notes in globals.css.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('reveal-ready');setTimeout(function(){if(!d.dataset.revealHydrated)d.classList.remove('reveal-ready')},4000)})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-ivory-100 antialiased">

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-ivory-100"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <ProposalBanner />
        <Header />

        <main id="main" className="pb-14 lg:pb-0">
          {children}
        </main>

        <Footer />

        {/* Spacer so the fixed bar never overlaps the footer on phones */}
        <div aria-hidden="true" className="h-14 lg:hidden" />
        <MobileContactBar />
      </body>
    </html>
  );
}
