import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publications, researchAreas } from "@/content/research";
import { products } from "@/content/products";
import { publicationsFor } from "@/lib/utils";
import PublicationCard from "@/components/research/PublicationCard";
import ProductCard from "@/components/products/ProductCard";
import { Breadcrumbs, Chip, EmptyState, SectionHeader } from "@/components/shared/ui";

export function generateStaticParams() {
  return researchAreas.map(a => ({ area: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = researchAreas.find(a => a.slug === areaSlug);
  if (!area) return {};
  return { title: area.title, description: area.short, alternates: { canonical: `/research/${area.slug}` } };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: areaSlug } = await params;
  const area = researchAreas.find(a => a.slug === areaSlug);
  if (!area) notFound();
  const pubs = publicationsFor(publications, area.slug);
  const software = products.filter(p => p.areas?.includes(area.slug));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Research", href: "/research" }, { label: area.title }]} />

      <header className="mt-6 max-w-3xl">
        <p className="rule-label">Research area</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{area.title}</h1>
        <p className="measure mt-4 text-lg leading-relaxed text-ink2">{area.description}</p>
      </header>

      <section className="mt-12">
        <SectionHeader kicker="Questions" title="Current research questions" />
        <ul className="grid gap-3 lg:grid-cols-2">
          {area.questions.map(q => (
            <li key={q} className="rounded-lg border border-line bg-surface p-5 text-sm leading-relaxed text-ink2">{q}</li>
          ))}
        </ul>
      </section>

      {area.projects.length > 0 && (
        <section className="mt-12">
          <SectionHeader kicker="Projects" title="Active projects" />
          <div className="grid gap-4 lg:grid-cols-2">
            {area.projects.map(p => (
              <div key={p.name} className="rounded-lg border border-line bg-surface p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-ink">{p.name}</h3>
                  <Chip>{p.status}</Chip>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <SectionHeader id="publications" kicker="Publications" title="Publications & manuscripts" />
        {pubs.length === 0 ? (
          <EmptyState title="Research in this area is currently under development.">
            <p>Publications will appear here when released.</p>
          </EmptyState>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">{pubs.map(p => <PublicationCard key={p.slug} pub={p} />)}</div>
        )}
      </section>

      {software.length > 0 && (
        <section className="mt-12">
          <SectionHeader kicker="Software" title="Related software" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {software.map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}

      <p className="mt-14 border-t border-line pt-6 text-sm text-ink2">
        Exploring another area? <Link href="/research" className="font-medium text-teal hover:text-teal-dark">All research areas <span aria-hidden>→</span></Link>
      </p>
    </div>
  );
}