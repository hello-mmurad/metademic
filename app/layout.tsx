import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CoffeeMascot from "@/components/shared/CoffeeMascot";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.shortName} Research Lab — ${site.tagline}`, template: `%s · ${site.shortName} Research Lab` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: `${site.shortName} Research Lab`, description: site.description, url: "/" },
  twitter: { card: "summary", title: `${site.shortName} Research Lab`, description: site.description },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { themeColor: "#FFFDEC" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: site.name,
  url: site.url,
  description: site.description,
  ...(site.social.github || site.social.linkedin
    ? { sameAs: [site.social.github, site.social.linkedin].filter(Boolean) }
    : {})
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">{children}</main>
        <SiteFooter />
        <CoffeeMascot />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}