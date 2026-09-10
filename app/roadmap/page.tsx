import type { Metadata } from "next";
import Link from "next/link";
import { roadmapPhases, weeklyAchievements } from "@/content/roadmap";
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import WeeklyLog from "@/components/roadmap/WeeklyLog";
import { Chip, PageHero, SectionHeader, StatusBadge } from "@/components/shared/ui";
import { pad2 } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "Metademic's long-term research roadmap and weekly achievement log, maintained in public.",
  alternates: { canonical: "/roadmap" }
};

export default function RoadmapPage() {
  const current = roadmapPhases.find(p => p.status === "In Progress");
  const counts = {
    completed: roadmapPhases.filter(p => p.status === "Completed").length,
    progress: roadmapPhases.filter(p => p.status === "In Progress").length,
    planned: roadmapPhases.filter(p => p.status === "Planned").length
  };
  return (
    <>
      <PageHero kicker="Roadmap" title="How the laboratory's research progresses"
        lead="Two levels: a long-term research roadmap from concept to sustainable service, and a weekly achievement log of what was actually built, tested, and learned." />

      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Level 1 — long-term phases */}
        <SectionHeader index="L1" kicker="Level 1" title="Long-term research roadmap"
          lead="Each phase carries a development objective, a validation objective, and the milestone that closes it. Click a phase for details." />

        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border border-line bg-surface px-5 py-4">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
            <span className="flex items-center gap-1.5"><span aria-hidden className="text-teal">✓</span> {counts.completed} completed</span>
            <span className="flex items-center gap-1.5"><span aria-hidden className="text-teal">◐</span> {counts.progress} in progress</span>
            <span className="flex items-center gap-1.5"><span aria-hidden>○</span> {counts.planned} planned</span>
          </div>
          {current && (
            <div className="ml-auto flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink2">
                Current: Phase {pad2(current.index)} · {current.name}
              </span>
            </div>
          )}
        </div>

        <RoadmapTimeline phases={roadmapPhases} />

        {/* Level 2 — weekly achievement log */}
        <div className="mt-20">
          <SectionHeader index="L2" kicker="Level 2" title="Weekly achievement log"
            lead="A new entry is added every week — the laboratory's running record of real progress. Entries link to the products, manuscripts, and roadmap phases they advance." />
          <WeeklyLog items={weeklyAchievements} />
        </div>
      </div>
    </>
  );
}