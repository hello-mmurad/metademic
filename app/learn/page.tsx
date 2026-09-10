import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { workshops, workshopCategories } from "@/content/workshops";
import WorkshopCard from "@/components/learn/WorkshopCard";
import { PageHero } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Learn — MetaDemic Workshop",
  description: "Free, practical learning resources for research methods, artificial intelligence, engineering, and reproducible technical work.",
  alternates: { canonical: "/learn" }
};

export default function LearnPage() {
  return (
    <>
      <PageHero kicker="Metademic Workshop" title="Free, practical learning for research and engineering"
        lead="The educational arm of the laboratory: free public courses and workshops covering research methods, AI, machine learning, intelligent systems, and reproducible technical work.">
        <div className="mt-6 flex gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          <span className="rounded-md bg-teal px-3 py-1.5 text-white">Workshop</span>
          {site.blog.url && (
            <a href={site.blog.url} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line bg-surface px-3 py-1.5 text-ink2 transition-colors hover:border-teal/40">Blog ↗</a>
          )}
        </div>
      </PageHero>

      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section aria-label="Topics covered" className="mb-10">
          <p className="rule-label">Topics</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {workshopCategories.map(c => (
              <li key={c} className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink2">{c}</li>
            ))}
          </ul>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink2">
            All MetaDemic Workshop material is free of charge. Courses appear here as they are released —
            each with its curriculum, resources, and supporting materials.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map(w => <WorkshopCard key={w.slug} course={w} />)}
        </div>

        <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-ink2">
          Interested in teaching or proposing a workshop?{" "}
          <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("MetaDemic Workshop proposal")}`} className="font-medium text-teal hover:text-teal-dark">
            Write to the laboratory <span aria-hidden>→</span>
          </a>
        </p>
      </div>
    </>
  );
}