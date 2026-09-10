import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publications, researchAreas } from "@/content/research";
import { generateBibTeX } from "@/lib/utils";
import { displayCitations } from "@/lib/citations";
import CodeBlock from "@/components/shared/CodeBlock";
import { Breadcrumbs, Chip } from "@/components/shared/ui";

export function generateStaticParams({ params }: { params: { area: string } }) {
  return publications.filter(p => p.area === params.area && !p.draft).map(p => ({ publication: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string; publication: string }> }): Promise<Metadata> {
  const { area, publication } = await params;
  const pub = publications.find(p => p.slug === publication && p.area === area && !p.draft);
  if (!pub) return {};
  return {
    title: pub.title,
    description: pub.abstract.slice(0, 155),
    alternates: { canonical: `/research/${pub.area}/${pub.slug}` }
  };
}

export default async function PublicationPage({ params }: { params: Promise<{ area: string; publication: string }> }) {
  const { area: areaSlug, publication } = await params;
  const pub = publications.find(p => p.slug === publication && p.area === areaSlug && !p.draft);
  if (!pub) notFound();
  const area = researchAreas.find(a => a.slug === pub.area);
  const citations = displayCitations(pub);
  const primaryHref = pub.pdfUrl ?? (pub.doi ? `https://doi.org/${pub.doi}` : null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    author: pub.authors.map(name => ({ "@type": "Person", name })),
    abstract: pub.abstract,
    ...(pub.doi ? { identifier: `doi:${pub.doi}` } : {}),
    datePublished: String(pub.year)
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Research", href: "/research" },
        ...(area ? [{ label: area.title, href: `/research/${area.slug}` }] : []),
        { label: pub.title }
      ]} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mt-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">
          <span>{pub.year}</span><span aria-hidden>·</span><span>{pub.type}</span><span aria-hidden>·</span>
          <Chip>{pub.status}</Chip>
          {typeof citations === "number" && <span className="text-ink2">Cited by {citations}</span>}
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{pub.title}</h1>
        <p className="mt-3 text-ink2">{pub.authors.join(", ")}</p>
        {pub.venue && <p className="mt-1 italic text-ink3">{pub.venue}</p>}

        <div className="mt-6 flex flex-wrap gap-3">
          {primaryHref && (
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Read full manuscript <span aria-hidden>→</span>
            </a>
          )}
          {pub.doi && <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">DOI</a>}
          {pub.codeUrl && <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">Code</a>}
          {pub.datasetUrl && <a href={pub.datasetUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">Dataset</a>}
          <a href="#cite" className="btn-secondary">Cite</a>
        </div>

        {!primaryHref && (
          <p className="mt-4 rounded-lg border border-dashed border-line bg-cream2/50 px-4 py-3 text-sm text-ink2">
            The full manuscript will be linked here when it is released.
          </p>
        )}

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">Abstract</h2>
          <p className="measure mt-3 leading-relaxed text-ink2">{pub.abstract}</p>
        </section>

        <dl className="mt-10 grid gap-x-10 gap-y-4 rounded-xl border border-line bg-surface p-6 sm:grid-cols-2">
          {[
            ["Research area", area?.title], ["Publication type", pub.type],
            ["Status", pub.status], ["Year", String(pub.year)],
            ...(pub.venue ? [["Venue", pub.venue]] : [])
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">{k}</dt>
              <dd className="mt-1 text-sm text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <section id="cite" className="mt-10 scroll-mt-24">
          <h2 className="font-display text-xl font-semibold text-ink">Cite this work</h2>
          <div className="mt-3">
            <CodeBlock label="BibTeX" code={generateBibTeX(pub)} />
          </div>
        </section>
      </article>
    </div>
  );
}