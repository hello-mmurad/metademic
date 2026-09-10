import Link from "next/link";
import type { Publication } from "@/types/content";
import { displayCitations } from "@/lib/citations";

export default function PublicationCard({ pub }: { pub: Publication }) {
  const citations = displayCitations(pub);
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-teal/40">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">
        <span>{pub.year}</span><span aria-hidden>·</span><span>{pub.type}</span><span aria-hidden>·</span><span>{pub.status}</span>
        {typeof citations === "number" && <><span aria-hidden>·</span><span>Cited by {citations}</span></>}
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
        <Link href={`/research/${pub.area}/${pub.slug}`} className="hover:text-teal-dark">{pub.title}</Link>
      </h3>
      <p className="mt-1.5 text-sm text-ink2">{pub.authors.join(", ")}</p>
      {pub.venue && <p className="mt-1 text-sm italic text-ink3">{pub.venue}</p>}
      <div className="mt-auto flex flex-wrap gap-2 pt-4 text-xs font-medium">
        <Link href={`/research/${pub.area}/${pub.slug}`} className="rounded-md border border-teal/40 bg-teal-soft px-2.5 py-1.5 text-teal-dark transition-colors hover:bg-teal hover:text-white">
          Read full manuscript →
        </Link>
        {pub.doi && <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line bg-cream px-2.5 py-1.5 text-ink2 transition-colors hover:border-teal/40">DOI</a>}
        {pub.codeUrl && <a href={pub.codeUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line bg-cream px-2.5 py-1.5 text-ink2 transition-colors hover:border-teal/40">Code</a>}
        {pub.datasetUrl && <a href={pub.datasetUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line bg-cream px-2.5 py-1.5 text-ink2 transition-colors hover:border-teal/40">Dataset</a>}
      </div>
    </article>
  );
}