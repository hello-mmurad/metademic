import Link from "next/link";
import type { Publication, ResearchArea } from "@/types/content";
import { publicationsFor } from "@/lib/utils";
import { AreaDiagram } from "@/components/shared/diagrams";

export default function ResearchAreaCard({ area, publications }: {
  area: ResearchArea; publications: Publication[];
}) {
  const pubs = publicationsFor(publications, area.slug);
  const activeProjects = area.projects.filter(p => p.status !== "Planned").length;
  const countLine = pubs.length > 0
    ? `${pubs.length} publication${pubs.length === 1 ? "" : "s"}${activeProjects > 0 ? ` · ${activeProjects} active project${activeProjects === 1 ? "" : "s"}` : ""}`
    : activeProjects > 0
      ? `Publications in preparation · ${activeProjects} active project${activeProjects === 1 ? "" : "s"}`
      : "Publications in preparation";
  return (
    <Link href={`/research/${area.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-teal/40">
      <div className="rounded-md border border-linesoft bg-cream2/60 p-3">
        <AreaDiagram kind={area.diagram} />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink group-hover:text-teal-dark">{area.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink2">{area.short}</p>
      <p className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">{countLine}</p>
    </Link>
  );
}