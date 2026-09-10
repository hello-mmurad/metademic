import type { Metadata } from "next";
import { publications, researchAreas } from "@/content/research";
import { livePublications } from "@/lib/utils";
import ResearchAreaCard from "@/components/research/ResearchAreaCard";
import PublicationCard from "@/components/research/PublicationCard";
import JournalBanner from "@/components/home/JournalBanner";
import { EmptyState, PageHero, SectionHeader } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Research",
  description: "Metademic's research areas, active projects, and publications across intelligent and distributed systems.",
  alternates: { canonical: "/research" }
};

export default function ResearchPage() {
  const pubs = livePublications(publications).sort((a, b) => b.year - a.year);
  return (
    <>
      <PageHero kicker="Research" title="Research areas & publications"
        lead="The laboratory organises its work into five research areas. Publications and manuscripts appear here as they are released." />
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {/* VIEW 1 — area cards first, never a raw paper dump */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map(area => <ResearchAreaCard key={area.slug} area={area} publications={publications} />)}
        </div>

        <div className="mt-16">
          <JournalBanner />
        </div>

        <div className="mt-16">
          <SectionHeader id="publications" index="P" kicker="Publications" title="All publications & manuscripts"
            lead="Records include authors, venue, status, and supporting material where available." />
          {pubs.length === 0 ? (
            <EmptyState title="Publications are being prepared for release.">
              <p>Research in these areas is under active development. Manuscript records will appear here — with authors, abstracts, and supporting material — as they are released.</p>
            </EmptyState>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {pubs.map(p => <PublicationCard key={p.slug} pub={p} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}