import type { SiteConfig } from "@/types/content";

/**
 * CENTRAL OWNER CONFIGURATION — every managed value lives here or in .env.
 * The site renders correctly with every integration unset (honest empty states).
 * TODO(owner): replace values marked below before launch.
 */
export const site: SiteConfig = {
  name: "Metademic Research Lab",
  shortName: "Metademic",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000", // TODO(owner)
  tagline: "Independent research in intelligent and distributed systems",
  description:
    "Metademic is an independent research laboratory working across distributed computing, artificial intelligence, intelligent control, and autonomous systems, developing research questions alongside the software, simulations, and benchmarks required to test them.",
  contactEmail: "contact@metademic.example", // TODO(owner)
  brand: { logoSrc: null }, // TODO(owner): e.g. "/brand/wordmark.png" to replace the typographic lockup

  nav: [
    { label: "Home", href: "/" },
    { label: "Research", href: "/research" },
    { label: "Products", href: "/products" },
    { label: "Learn", href: "/learn" },
    { label: "Members", href: "/members" },
    { label: "Who We Are", href: "/who-we-are" }
  ],
  cta: { label: "Open Research", href: "/research#journal" },

  journal: {
    name: "Metademic Journal",
    url: process.env.NEXT_PUBLIC_JOURNAL_URL ?? null,          // TODO(owner)
    submitUrl: process.env.NEXT_PUBLIC_JOURNAL_SUBMIT_URL ?? null, // TODO(owner)
    openForSubmissions: true // keep true only while factually correct
  },
  blog: { url: process.env.NEXT_PUBLIC_BLOG_URL ?? null },     // TODO(owner); feed URL is server-side: BLOG_FEED_URL
  racon: {
    subdomain: process.env.NEXT_PUBLIC_RACON_URL ?? null,      // TODO(owner)
    repo: process.env.NEXT_PUBLIC_RACON_REPO ?? null,          // TODO(owner)
    repoLabel: "metademic/racon",
    docsUrl: process.env.NEXT_PUBLIC_RACON_DOCS_URL ?? null,
    sponsorUrl: process.env.NEXT_PUBLIC_RACON_SPONSOR_URL ?? null,
    discordUrl: process.env.NEXT_PUBLIC_DISCORD_URL ?? null
  },
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? null,        // TODO(owner)
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? null,
    discord: process.env.NEXT_PUBLIC_DISCORD_URL ?? null
  },
  donate: {
    url: process.env.NEXT_PUBLIC_DONATE_URL ?? null,           // TODO(owner): coffee widget destination
    note: "Support open research"
  },
  newsletter: { endpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? null },
  citationProvider: "none", // switch when OpenAlex/Crossref/S2 is connected
  analytics: { provider: "none" }
};