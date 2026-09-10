import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { updates } from "@/content/updates";
import { roadmapPhases } from "@/content/roadmap";
import { raconDocs, raconInstall, raconReleases, raconStatusBadges, raconTutorials } from "@/content/racon";
import { testimonials } from "@/content/testimonials";
import { getRepoStats, type RepoStats } from "@/lib/github";
import { formatDate } from "@/lib/utils";
import RaconInstaller from "@/components/products/RaconInstaller";
import CodeBlock from "@/components/shared/CodeBlock";
import NewsletterForm from "@/components/shared/NewsletterForm";
import { CoordinationDiagram } from "@/components/shared/diagrams";
import { Chip, EmptyState, StatusBadge } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "RACoN — Resource-Aware Coordination Network",
  description: "An experimental coordination layer for discovering, evaluating, and assigning computational workloads across heterogeneous machines.",
  alternates: { canonical: "/products/racon" }
};

export const revalidate = 3600; // GitHub stats refresh hourly, served stale on failure

const SECTIONS = [
  ["overview", "Overview"], ["download", "Download"], ["quick-start", "Quick Start"],
  ["documentation", "Documentation"], ["architecture", "Architecture"], ["tutorials", "Tutorials"],
  ["benchmarks", "Benchmarks"], ["community", "Community"], ["news", "News"], ["sponsor", "Sponsor"]
] as const;

export default async function RaconPage() {
  const stats: RepoStats | null = await getRepoStats();
  const lanPhase = roadmapPhases.find(p => p.id === "lan");
  const news = updates.filter(u => u.product === "RACoN").slice(0, 3);
  const docsHref = (slug: string) => site.racon.docsUrl ? `${site.racon.docsUrl}/${slug}` : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Sticky microsite sub-navigation */}
      <nav aria-label="RACoN sections"
        className="sticky top-16 z-30 -mx-4 border-b border-line bg-cream/90 px-4 backdrop-blur sm:-mx-6 sm:px-6">
        <ul className="flex gap-1 overflow-x-auto py-2 font-mono text-[11px] uppercase tracking-[0.14em]">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="whitespace-nowrap rounded px-2.5 py-1.5 text-ink2 transition-colors hover:bg-cream2 hover:text-ink">{label}</a>
            </li>
          ))}
          {site.racon.repo && (
            <li className="ml-auto">
              <a href={site.racon.repo} target="_blank" rel="noopener noreferrer"
                className="whitespace-nowrap rounded bg-carbon px-2.5 py-1.5 text-cream transition-opacity hover:opacity-85">GitHub ↗</a>
            </li>
          )}
        </ul>
      </nav>

      {/* ── OVERVIEW / HERO ─────────────────────────────────────── */}
      <section id="overview" className="grid scroll-mt-32 gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-16">
        <div>
          <p className="rule-label">Featured research system</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">RACoN</h1>
          <p className="mt-2 font-mono text-sm uppercase tracking-[0.16em] text-ink3">Resource-Aware Coordination Network</p>
          <p className="measure mt-5 text-lg leading-relaxed text-ink2">
            An experimental coordination layer for discovering, evaluating, and assigning computational
            workloads across heterogeneous machines.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {raconStatusBadges.map(b => <Chip key={b}>{b}</Chip>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#quick-start" className="btn-primary">Get started <span aria-hidden>→</span></a>
            {site.racon.repo && (
              <a href={site.racon.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary">View on GitHub ↗</a>
            )}
          </div>
        </div>
        <figure className="rounded-xl border border-white/10 bg-carbon p-4 sm:p-6">
          <figcaption className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50">coordination pool — schematic</figcaption>
          <CoordinationDiagram dark />
        </figure>
      </section>

      <section className="grid gap-8 border-y border-line py-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">What RACoN investigates</h2>
          <p className="measure mt-4 leading-relaxed text-ink2">
            RACoN investigates whether idle and distributed compute resources can be coordinated as a
            dependable pool while accounting for hardware capability, network conditions, trust,
            reliability, and workload requirements. The system is developed alongside the simulator,
            benchmarks, and evaluation protocols needed to test it honestly.
          </p>
        </div>
        <dl className="grid content-start gap-x-8 gap-y-4 rounded-xl border border-line bg-surface p-6 sm:grid-cols-2">
          <div><dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">Status</dt><dd className="mt-1 text-sm text-ink">Research prototype (alpha)</dd></div>
          <div><dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">Current stage</dt><dd className="mt-1 text-sm text-ink">{lanPhase ? `Phase ${lanPhase.index} — ${lanPhase.name}` : "—"}</dd></div>
          <div><dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">Source code</dt><dd className="mt-1 text-sm text-ink">{site.racon.repo ? <a className="text-teal hover:text-teal-dark" href={site.racon.repo} target="_blank" rel="noopener noreferrer">{site.racon.repoLabel} ↗</a> : "To be published on GitHub"}</dd></div>
          <div><dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">License</dt><dd className="mt-1 text-sm text-ink">To be announced with the first public release</dd></div>
        </dl>
      </section>

      {/* ── DOWNLOAD ────────────────────────────────────────────── */}
      <section id="download" className="scroll-mt-32 py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Download</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink2">
          RACoN is in active research development. Release packages are published here the moment they exist — never before.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["macOS", "Windows x64", "Windows ARM64", "Linux"] as const).map(os => {
            const asset = raconReleases.flatMap(r => r.assets).find(a => a.os === os);
            return (
              <div key={os} className="rounded-lg border border-line bg-surface p-5">
                <h3 className="font-mono text-sm text-ink">{os}</h3>
                {asset ? (
                  <a href={asset.href} className="btn-primary mt-3 w-full justify-center">Download</a>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-ink2">Release package not yet published.</p>
                )}
              </div>
            );
          })}
        </div>
        {raconReleases.length === 0 && (
          <div className="mt-4">
            <EmptyState title="Public release package not yet available.">
              <p>Releases will be announced here and on GitHub when the prototype reaches a public preview stage.</p>
            </EmptyState>
          </div>
        )}
      </section>

      {/* ── QUICK START ─────────────────────────────────────────── */}
      <section id="quick-start" className="scroll-mt-32 border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Quick start</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink2">
          Choose an installation method. Commands shown here are exactly those maintained in the laboratory's records.
        </p>
        <div className="mt-6">
          <RaconInstaller methods={raconInstall} />
        </div>
      </section>

      {/* ── DOCUMENTATION ───────────────────────────────────────── */}
      <section id="documentation" className="scroll-mt-32 border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Documentation</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {raconDocs.map(d => {
            const inner = (
              <>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-ink">{d.title}</h3>
                  {!d.href && <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink3">In preparation</span>}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink2">{d.description}</p>
              </>
            );
            return d.href ? (
              <a key={d.slug} href={d.href} className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-teal/40">{inner}</a>
            ) : (
              <div key={d.slug} className="rounded-lg border border-line bg-cream2/50 p-5">{inner}</div>
            );
          })}
        </div>
      </section>

      {/* ── ARCHITECTURE ────────────────────────────────────────── */}
      <section id="architecture" className="scroll-mt-32 border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Architecture</h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="measure leading-relaxed text-ink2">
            <p>
              RACoN separates coordination into three responsibilities: <strong className="font-medium text-ink">discovery and capability reporting</strong>,
              where nodes describe what they honestly offer; <strong className="font-medium text-ink">scheduling</strong>,
              where assignment decisions weigh hardware capability, network conditions, trust, and workload requirements;
              and <strong className="font-medium text-ink">verified execution</strong>, where results are checked and failures feed back into future decisions.
            </p>
            <p className="mt-4">
              The current prototype validates these roles on a local network, with the MetaSim simulator providing
              reproducible experiments across heterogeneous node profiles. Claims about behaviour beyond this stage are
              deliberately not made.
            </p>
          </div>
          <CodeBlock
            label="conceptual flow"
            code={"node → capability report → coordinator\ncoordinator → resource-aware assignment → node\nnode → result + verification → coordinator\nfailure → recovery + trust update → coordinator"}
          />
        </div>
      </section>

      {/* ── TUTORIALS ───────────────────────────────────────────── */}
      <section id="tutorials" className="scroll-mt-32 border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Video tutorials</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {raconTutorials.map(t => (
            <div key={t.title} className="rounded-lg border border-line bg-cream2/50 p-5">
              <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
                <span>{t.topic}</span><span>{t.level}</span>
              </div>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">{t.title}</h3>
              <p className="mt-2 text-sm text-ink2">
                {t.status === "Published" && t.videoUrl ? "Watch tutorial ↗" : "Video in preparation."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENCHMARKS ──────────────────────────────────────────── */}
      <section id="benchmarks" className="scroll-mt-32 border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Benchmarks</h2>
        <div className="mt-6">
          <EmptyState title="Benchmark results will be published with documented evaluation protocols.">
            <p>Scheduler comparisons are currently running on the laboratory's simulated and physical nodes. Results appear here — with configurations, node profiles, and recorded runs — once validated.</p>
          </EmptyState>
        </div>
      </section>

      {/* ── WHAT PEOPLE SAY (auto-hidden without verified testimonials) ── */}
      {testimonials.length > 0 && (
        <section className="border-t border-line py-12">
          <h2 className="font-display text-2xl font-semibold text-ink">What people say</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {testimonials.map(t => (
              <blockquote key={t.name} className="rounded-lg border border-line bg-surface p-5">
                <p className="text-sm leading-relaxed text-ink2">“{t.quote}”</p>
                <footer className="mt-3 text-sm text-ink">{t.name} — <span className="text-ink3">{t.role}</span></footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* ── GITHUB ──────────────────────────────────────────────── */}
      <section className="border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Source code</h2>
        {stats ? (
          <div className="mt-6 flex flex-wrap items-center gap-6 rounded-xl border border-line bg-surface p-6">
            <div><p className="font-mono text-2xl text-ink">{stats.stars}</p><p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">Stars</p></div>
            <div><p className="font-mono text-2xl text-ink">{stats.forks}</p><p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">Forks</p></div>
            <div><p className="font-mono text-2xl text-ink">{stats.openIssues}</p><p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">Open issues</p></div>
            {stats.latestRelease && <StatusBadge status={`Release ${stats.latestRelease}`} />}
            <a href={stats.url} target="_blank" rel="noopener noreferrer" className="btn-primary ml-auto">Open repository ↗</a>
          </div>
        ) : (
          <div className="mt-6 max-w-2xl">
            <EmptyState title="The RACoN repository will be published as the prototype stabilises.">
              <p>Once public, this section will show live repository statistics — stars, issues, contributors, and the latest release — fetched directly from GitHub.</p>
            </EmptyState>
          </div>
        )}
      </section>

      {/* ── COMMUNITY ───────────────────────────────────────────── */}
      <section id="community" className="scroll-mt-32 border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Community</h2>
        <p className="measure mt-3 max-w-xl text-sm leading-relaxed text-ink2">
          Questions, contributions, and reproducible experiment proposals are welcome. The community space
          grows with the project — start with the laboratory's contact address or the repository once published.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {site.social.discord && <a href={site.social.discord} target="_blank" rel="noopener noreferrer" className="btn-primary">Join Discord ↗</a>}
          <a href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("RACoN community")}`} className="btn-secondary">Contact the laboratory</a>
        </div>
      </section>

      {/* ── NEWS / CHANGELOG ────────────────────────────────────── */}
      <section id="news" className="scroll-mt-32 border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">News & development updates</h2>
        <ul className="mt-6 space-y-3">
          {news.map(u => (
            <li key={u.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-line bg-surface p-5">
              <time dateTime={u.date} className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">{formatDate(u.date)}</time>
              <p className="font-medium text-ink">{u.title}</p>
              <Link href={u.href ?? "/roadmap"} className="ml-auto text-sm font-medium text-teal hover:text-teal-dark">Details <span aria-hidden>→</span></Link>
            </li>
          ))}
        </ul>
        <Link href="/roadmap" className="btn-secondary mt-5">Weekly build log <span aria-hidden>→</span></Link>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────────── */}
      <section id="newsletter" className="scroll-mt-32 border-t border-line py-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Follow RACoN development</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink2">
          Occasional, substantive updates: releases, benchmark results, and research milestones. No marketing.
        </p>
        <div className="mt-5">
          {site.newsletter.endpoint ? (
            <NewsletterForm endpoint={site.newsletter.endpoint} />
          ) : (
            <p className="rounded-lg border border-dashed border-line bg-cream2/50 px-4 py-3 text-sm text-ink2">
              Email subscription is being connected. In the meantime, development updates are logged on the{" "}
              <Link href="/roadmap" className="font-medium text-teal hover:text-teal-dark">weekly build log</Link>.
            </p>
          )}
        </div>
      </section>

      {/* ── SPONSOR ─────────────────────────────────────────────── */}
      <section id="sponsor" className="scroll-mt-32 border-t border-line py-12 pb-20">
        <div className="rounded-xl border border-line bg-cream2 p-6 sm:p-10">
          <p className="rule-label">Support open research</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">Sponsor RACoN</h2>
          <p className="measure mt-3 leading-relaxed text-ink2">
            Contributions help maintain research infrastructure, experiments, documentation,
            open-source development, and public technical resources.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.racon.sponsorUrl ?? `mailto:${site.contactEmail}?subject=${encodeURIComponent("Sponsoring RACoN")}`} className="btn-primary">Sponsor RACoN <span aria-hidden>→</span></a>
            <a href={site.donate.url ?? `mailto:${site.contactEmail}?subject=${encodeURIComponent("Supporting Metademic")}`} className="btn-secondary">Support Metademic</a>
          </div>
        </div>
      </section>
    </div>
  );
}