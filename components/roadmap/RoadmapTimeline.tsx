import { site } from "@/content/site";
import type { PhaseStatus, RoadmapPhase } from "@/types/content";
import { cn, pad2 } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/ui";

function dotCls(status: PhaseStatus) {
  if (status === "Completed")
    return "flex h-7 w-7 items-center justify-center rounded-full border border-teal bg-teal text-[11px] text-white";
  if (status === "In Progress")
    return "flex h-7 w-7 items-center justify-center rounded-full border-2 border-teal bg-cream text-[10px] text-teal-dark roadmap-node--current";
  return "flex h-7 w-7 items-center justify-center rounded-full border border-line bg-cream2 text-[10px] text-ink3";
}
function dotGlyph(status: PhaseStatus) {
  return status === "Completed" ? "✓" : status === "In Progress" ? "●" : "○";
}

export default function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-2 left-[13px] top-2 w-px bg-line" />
      {/* Scroll-driven progress line — progressive enhancement (static line elsewhere / without JS) */}
      <span aria-hidden className="roadmap-progress absolute left-[13px] top-2 h-[calc(100%-16px)] w-px origin-top bg-teal/70" />
      <ol className="space-y-5">
        {phases.map(p => (
          <li key={p.id} id={`phase-${p.id}`} className="relative scroll-mt-28 pl-12">
            <span aria-hidden className={cn("absolute left-0 top-5 z-10", dotCls(p.status))}>{dotGlyph(p.status)}</span>
            <details className="group rounded-lg border border-line bg-surface shadow-card open:border-teal/40">
              <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 p-5 [&::-webkit-details-marker]:hidden">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink3">
                    Phase {pad2(p.index)} · {p.period}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">{p.name}</h3>
                </div>
                <span className="flex items-center gap-3">
                  <StatusBadge status={p.status} />
                  <span aria-hidden className="chev text-ink3 transition-transform">›</span>
                </span>
              </summary>
              <div className="grid gap-5 border-t border-linesoft p-5 sm:grid-cols-2">
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Development objective</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink2">{p.objective}</p>
                </div>
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Validation objective</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink2">{p.validation}</p>
                </div>
                <div className="sm:col-span-2">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Milestone</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink2">{p.milestone}</p>
                </div>
                {(p.manuscripts || p.release || p.benchmark || p.repository) && (
                  <div className="sm:col-span-2">
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Related</h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {p.manuscripts?.map(m => <li key={m}><span className="inline-flex items-center rounded-full border border-line bg-cream2 px-2.5 py-1 font-mono text-[11px] text-ink2">{m}</span></li>)}
                      {p.release && <li><span className="inline-flex items-center rounded-full border border-line bg-cream2 px-2.5 py-1 font-mono text-[11px] text-ink2">{p.release}</span></li>}
                      {p.benchmark && <li><span className="inline-flex items-center rounded-full border border-line bg-cream2 px-2.5 py-1 font-mono text-[11px] text-ink2">{p.benchmark}</span></li>}
                      {(p.repository ?? site.racon.repo) && (
                        <li><a href={p.repository ?? site.racon.repo!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-teal/40 bg-teal-soft px-2.5 py-1 font-mono text-[11px] text-teal-dark">Repository ↗</a></li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}