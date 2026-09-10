import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { updates } from "@/content/updates";
import { researchAreas, publications } from "@/content/research";
import { roadmapPhases, weeklyAchievements } from "@/content/roadmap";
import { workshops } from "@/content/workshops";
import { getLatestPosts } from "@/lib/blog";
import { pad2 } from "@/lib/utils";
import UpdateCarousel from "@/components/home/UpdateCarousel";
import JournalBanner from "@/components/home/JournalBanner";
import BlogCard from "@/components/shared/BlogCard";
import ResearchAreaCard from "@/components/research/ResearchAreaCard";
import { Chip, SectionHeader } from "@/components/shared/ui";
import { CoordinationDiagram } from "@/components/shared/diagrams";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

// Blog feed is fetched with ISR caching — the site never blocks on the blog server.
export const revalidate = 1800;

export default async function Home() {
  const posts = await getLatestPosts(3);
  const latest = weeklyAchievements[0];
  const currentPhase = roadmapPhases.find(p => p.status === "In Progress") ?? roadmapPhases[0];
  const featuredWorkshop = workshops[0];

  const participate = [
    { title: "Research collaborators", note: "Joint problems, shared protocols", href: `mailto:${site.contactEmail}?subject=${encodeURIComponent("Research collaboration")}` },
    { title: "Open-source contributors", note: "RACoN and laboratory tooling", href: site.social.github ?? "/products/racon#community" },
    { title: "Students & learners", note: "Free workshops and courses", href: "/learn" },
    { title: "Technical writers", note: "Documentation and tutorials", href: `mailto:${site.contactEmail}?subject=${encodeURIComponent("Technical writing")}` },
    { title: "Benchmark contributors", note: "Reproducible evaluation work", href: "/products/racon#benchmarks" }
  ];

  return (
    <>
      {/* ── A. HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-dots absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="rule-label">Independent research laboratory</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Researching systems that coordinate, adapt, and&nbsp;scale.
            </h1>
            <p className="measure mt-5 text-lg leading-relaxed text-ink2">
              Metademic is an independent research laboratory working across distributed computing,
              artificial intelligence, intelligent control, and autonomous systems — and the engineering
              required to move research into reproducible systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/research" className="btn-primary">Explore research <span aria-hidden>→</span></Link>
              <Link href="/products/racon" className="btn-secondary">Explore RACoN</Link>
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink3">
              Distributed computing · Machine learning · Intelligent control · Autonomous systems
            </p>
            <Link href="/roadmap" className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-cream2 px-3 py-1.5 transition-colors hover:border-teal/50">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink2">
                Roadmap phase {pad2(currentPhase.index)} · {currentPhase.name} — {currentPhase.status}
              </span>
            </Link>
          </div>
          <figure className="rounded-xl border border-line bg-surface p-4 shadow-card sm:p-6">
            <figcaption className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink3">
              <span>fig. 01 — coordination topology</span>
              <span className="text-teal">RACoN</span>
            </figcaption>
            <CoordinationDiagram />
          </figure>
        </div>
      </section>

      {/* ── B. LATEST LAB UPDATES ───────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-label="Latest lab updates">
        <SectionHeader index="01" kicker="Lab updates" title="Recent activity from the laboratory"
          lead="Milestones, manuscript releases, engineering progress, and announcements — as they happen." />
        <UpdateCarousel updates={updates} />
      </section>

      {/* ── C. BUILD LOG ────────────────────────────────────────── */}
      <section className="border-y border-line bg-cream2/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader index="02" kicker="Build log" title="This week at Metademic"
            lead="A running record of what the laboratory actually built, tested, and learned." />
          <div className="rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal">
              Week {latest.week} · {latest.year} — {latest.dateRange}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{latest.title}</h3>
            <p className="mt-1 text-sm text-ink3">{latest.category}</p>
            <blockquote className="measure mt-4 border-l-2 border-teal/40 pl-4 leading-relaxed text-ink2">
              “{latest.summary}”
            </blockquote>
            <div className="mt-5 flex flex-wrap gap-2">
              {latest.products?.map(p => <Chip key={p}>{p}</Chip>)}
              {latest.papers?.map(p => <Chip key={p}>{p}</Chip>)}
            </div>
            <Link href="/roadmap" className="btn-secondary mt-6">View roadmap <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      {/* ── D. RESEARCH AREAS ───────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader index="03" kicker="Research" title="Research areas"
          lead="Five areas organise the laboratory's questions, projects, and publications." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map(area => (
            <ResearchAreaCard key={area.slug} area={area} publications={publications} />
          ))}
        </div>
      </section>

      {/* ── E. RACoN FEATURE ────────────────────────────────────── */}
      <section className="bg-carbon">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foam">04 · Featured research system</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
              RACoN — Resource-Aware Coordination Network
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/80">
              An experimental coordination layer for discovering, evaluating, and assigning computational
              workloads across heterogeneous machines.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Research prototype", "Alpha", "Experimental"].map(b => (
                <span key={b} className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foam">{b}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products/racon" className="btn-primary">Open RACoN <span aria-hidden>→</span></Link>
              <Link href="/products/racon#architecture" className="btn-on-dark">View architecture</Link>
            </div>
          </div>
          <figure className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
            <figcaption className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50">
              <span>fig. 02 — coordination pool</span><span>RACoN</span>
            </figcaption>
            <CoordinationDiagram dark />
          </figure>
        </div>
      </section>

      {/* ── F. METADEMIC JOURNAL ────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <JournalBanner />
      </section>

      {/* ── G. METADEMIC WORKSHOP ───────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Metademic Workshop">
        <div className="grid gap-8 rounded-xl border border-line bg-cream2 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="rule-label">Metademic Workshop</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Free, practical learning for research and engineering
            </h2>
            <p className="measure mt-3 leading-relaxed text-ink2">
              Guided workshops and courses covering research methods, AI, machine learning, intelligent
              systems, and reproducible technical work — built by the laboratory.{" "}
              {featuredWorkshop && <>Currently in preparation: <strong className="font-medium text-ink">{featuredWorkshop.title}</strong>.</>}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Research Foundations", "Artificial Intelligence", "Distributed Computing", "AI Bootcamps"].map(c => <Chip key={c}>{c}</Chip>)}
            </div>
          </div>
          <Link href="/learn" className="btn-primary justify-self-start lg:justify-self-end">Browse the workshop <span aria-hidden>→</span></Link>
        </div>
      </section>

      {/* ── H. LATEST FROM THE BLOG (automatic; hidden when no feed) ── */}
      {posts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <SectionHeader index="05" kicker="Blog" title="Latest from the blog"
            lead="Longer-form notes from the laboratory, published on the Metademic blog." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(p => <BlogCard key={p.link} post={p} />)}
          </div>
        </section>
      )}

      {/* ── I. COLLABORATION CTA ────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-line bg-surface p-6 shadow-card sm:p-10">
          <div className="max-w-xl">
            <p className="rule-label">Participate</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Build with the laboratory</h2>
            <p className="mt-3 leading-relaxed text-ink2">
              Metademic works with collaborators, contributors, and students who want to do careful, verifiable technical work in the open.
            </p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {participate.map(r => (
              <li key={r.title}>
                <a href={r.href} className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-cream px-4 py-3.5 transition-colors hover:border-teal/40">
                  <span>
                    <span className="block text-sm font-medium text-ink">{r.title}</span>
                    <span className="block text-xs text-ink3">{r.note}</span>
                  </span>
                  <span aria-hidden className="text-teal transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}