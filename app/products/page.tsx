import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/products";
import ProductCard from "@/components/products/ProductCard";
import { Chip, PageHero, SectionHeader } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Products",
  description: "Experimental research systems from Metademic, led by RACoN — the Resource-Aware Coordination Network.",
  alternates: { canonical: "/products" }
};

export default function ProductsPage() {
  const featured = products.find(p => p.featured)!;
  const emerging = products.filter(p => !p.featured);
  return (
    <>
      <PageHero kicker="Products" title="Research systems"
        lead="The laboratory builds the systems it studies. Each product is a working research instrument — released with honest status labels, never marketing claims." />

      {/* RACoN dominates the page */}
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="rule-label">Featured research system</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-line bg-surface shadow-card">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{featured.name}</h2>
                <p className="font-mono text-sm text-ink3">{featured.tagline}</p>
              </div>
              <p className="measure mt-4 leading-relaxed text-ink2">{featured.description}</p>
              <p className="measure mt-3 text-sm leading-relaxed text-ink3">
                RACoN investigates whether idle and distributed compute resources can be coordinated as a
                dependable pool while accounting for hardware capability, network conditions, trust,
                reliability, and workload requirements.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Chip>{featured.status}</Chip><Chip>Alpha</Chip>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/products/racon" className="btn-primary">Open RACoN microsite <span aria-hidden>→</span></Link>
                <Link href="/roadmap" className="btn-secondary">Development roadmap</Link>
              </div>
            </div>
            <div className="rounded-lg border border-line bg-carbon p-4">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foam">system overview</p>
              <svg viewBox="0 0 200 130" className="h-auto w-full" role="img" aria-label="RACoN system schematic: coordinator, node runtime, and simulator feeding a shared evaluation loop">
                <rect x="12" y="12" width="52" height="30" rx="5" fill="#16302B" stroke="#8FD6CD" />
                <text x="38" y="30" textAnchor="middle" fontSize="9" fill="#FFFDEC" style={{ fontFamily: "var(--font-mono)" }}>coord</text>
                <rect x="12" y="86" width="52" height="30" rx="5" fill="#16302B" stroke="#DED9BD" />
                <text x="38" y="104" textAnchor="middle" fontSize="9" fill="#FFFDEC" style={{ fontFamily: "var(--font-mono)" }}>nodes</text>
                <rect x="136" y="48" width="52" height="30" rx="5" fill="#16302B" stroke="#DED9BD" />
                <text x="162" y="66" textAnchor="middle" fontSize="9" fill="#FFFDEC" style={{ fontFamily: "var(--font-mono)" }}>metasim</text>
                <path d="M38 42v44M64 27c40 4 60 12 72 26M64 101c40-4 60-12 72-26" stroke="rgba(143,214,205,.5)" strokeDasharray="3 4" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Emerging projects — understated, honest statuses */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeader kicker="Emerging projects" title="Earlier-stage systems"
          lead="Smaller systems and planned work from the laboratory's research pipeline. Statuses describe real development state." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emerging.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">
          Statuses: Active · Research Preview · Prototype · Experimental · Planned · Archived
        </p>
      </div>
    </>
  );
}