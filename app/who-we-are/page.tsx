import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { weeklyAchievements } from "@/content/roadmap";
import { Chip, PageHero, SectionHeader } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Who We Are",
  description: "Metademic's identity, mission, research philosophy, and open collaboration model.",
  alternates: { canonical: "/who-we-are" }
};

const PRINCIPLES = [
  { title: "Research before hype", body: "Every claim we publish is tied to an experiment, a measurement, or a working system. When we do not know something, we say so." },
  { title: "Systems thinking", body: "Intelligence does not live in models alone. We study the full stack — hardware capability, network conditions, coordination, and trust — as one system." },
  { title: "Open collaboration", body: "Research questions, protocols, and tooling are developed in the open wherever possible, so others can verify, reuse, and extend them." },
  { title: "Long-horizon building", body: "We plan in years, not news cycles. The roadmap is public, and progress is logged week by week." }
];

export default function WhoWeArePage() {
  const latest = weeklyAchievements.slice(0, 3);
  return (
    <>
      <PageHero kicker="Who we are" title="A research laboratory that builds what it studies"
        lead="Metademic is an independent research laboratory focused on the intersection of intelligent systems, distributed computing, machine learning, control, and deployable engineering. The laboratory develops research questions alongside the software, simulations, benchmarks, and experimental systems required to test them." />

      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <p className="rule-label">Working principles</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(p => (
              <div key={p.title} className="rounded-lg border border-line bg-surface p-6 shadow-card">
                <h2 className="font-display text-lg font-semibold text-ink">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 rounded-xl border border-line bg-cream2 p-6 sm:p-10 lg:grid-cols-[240px_1fr]">
          <p className="rule-label">Collaboration model</p>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Open by construction</h2>
            <p className="measure mt-3 leading-relaxed text-ink2">
              The laboratory works with collaborators, contributors, students, and technical writers through
              well-defined openings: joint research problems, open-source contributions, benchmark work, and
              educational material for the MetaDemic Workshop. What we can share, we do; what we cannot, we
              describe honestly.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/research" className="btn-secondary">Research areas <span aria-hidden>→</span></Link>
              <Link href="/learn" className="btn-secondary">MetaDemic Workshop <span aria-hidden>→</span></Link>
              <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("Collaborating with Metademic")}`} className="btn-primary">Contact us <span aria-hidden>→</span></a>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[240px_1fr]">
          <p className="rule-label">Progress in public</p>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-ink">The weekly build log</h2>
              <Link href="/roadmap" className="btn-secondary">Full roadmap <span aria-hidden>→</span></Link>
            </div>
            <ul className="mt-5 space-y-3">
              {latest.map(w => (
                <li key={w.id} className="rounded-lg border border-line bg-surface p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">Week {w.week} · {w.year}</span>
                    <Chip>{w.category}</Chip>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink2">{w.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="support" className="mt-16 scroll-mt-24 rounded-xl border border-line bg-surface p-6 sm:p-10 shadow-card">
          <p className="rule-label">Support</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink">Support open research</h2>
          <p className="measure mt-3 leading-relaxed text-ink2">
            Contributions help maintain research infrastructure, experiments, documentation, and public
            technical resources.
          </p>
          <a href={site.donate.url ?? `mailto:${site.contactEmail}?subject=${encodeURIComponent("Supporting Metademic")}`} className="btn-primary mt-6">
            Buy us a coffee <span aria-hidden>→</span>
          </a>
        </section>
      </div>
    </>
  );
}