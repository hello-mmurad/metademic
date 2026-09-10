import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { workshops } from "@/content/workshops";
import { Breadcrumbs, Chip, EmptyState, SectionHeader, StatusBadge } from "@/components/shared/ui";

export function generateStaticParams() {
  return workshops.map(w => ({ course: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const c = workshops.find(w => w.slug === courseSlug);
  if (!c) return {};
  return { title: c.title, description: c.description, alternates: { canonical: `/learn/workshops/${c.slug}` } };
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course: courseSlug } = await params;
  const course = workshops.find(w => w.slug === courseSlug);
  if (!course) notFound();
  const available = course.status === "Available";
  const related = workshops.filter(w => w.slug !== course.slug).slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[
        { label: "Home", href: "/" }, { label: "Learn", href: "/learn" }, { label: course.title }
      ]} />

      {!available && (
        <p className="mt-6 rounded-lg border border-dashed border-line bg-cream2/60 px-4 py-3 text-sm leading-relaxed text-ink2" role="status">
          This workshop is in preparation. Materials will be published here as they are released —
          all MetaDemic Workshop content is free of charge.
        </p>
      )}

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="rule-label">{course.category}</p>
          <StatusBadge status={course.status} />
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{course.title}</h1>
        <p className="measure mt-4 text-lg leading-relaxed text-ink2">{course.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>{course.difficulty}</Chip>
          <Chip>{course.format}</Chip>
          {course.duration && <Chip>{course.duration}</Chip>}
        </div>
      </header>

      {course.objectives && course.objectives.length > 0 && (
        <section className="mt-12">
          <SectionHeader kicker="Outcomes" title="Learning objectives" />
          <ul className="space-y-2">
            {course.objectives.map(o => (
              <li key={o} className="flex gap-3 text-sm leading-relaxed text-ink2">
                <span aria-hidden className="mt-1 text-teal">✓</span>{o}
              </li>
            ))}
          </ul>
        </section>
      )}

      {course.prerequisites && course.prerequisites.length > 0 && (
        <section className="mt-12">
          <SectionHeader kicker="Preparation" title="Prerequisites" />
          <ul className="space-y-2">
            {course.prerequisites.map(p => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink2">
                <span aria-hidden className="mt-1 text-ink3">—</span>{p}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <SectionHeader kicker="Curriculum" title="Syllabus" />
        {course.syllabus?.length ? (
          <div className="space-y-3">
            {course.syllabus.map((m, i) => (
              <details key={m.module} className="rounded-lg border border-line bg-surface">
                <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-medium text-ink"><span className="mr-3 font-mono text-xs text-ink3">M{i + 1}</span>{m.module}</span>
                  <span aria-hidden className="chev text-ink3">›</span>
                </summary>
                <ul className="space-y-2 border-t border-linesoft p-5">
                  {m.lessons.map(l => (
                    <li key={l.title} className="flex items-center justify-between gap-3 text-sm text-ink2">
                      <span>{l.title}</span>{l.duration && <span className="font-mono text-[11px] text-ink3">{l.duration}</span>}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        ) : (
          <EmptyState title="The curriculum is being finalised.">
            <p>Module structure and lessons will be published here before enrolment opens.</p>
          </EmptyState>
        )}
      </section>

      {course.playlistUrl && (
        <section className="mt-12">
          <SectionHeader kicker="Watch" title="Video playlist" />
          <a href={course.playlistUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open the playlist <span aria-hidden>↗</span>
          </a>
        </section>
      )}

      {course.resources && course.resources.length > 0 && (
        <section className="mt-12">
          <SectionHeader kicker="Materials" title="Resources" />
          <ul className="flex flex-wrap gap-2">
            {course.resources.map(r => (
              <li key={r.label}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">{r.label} ↗</a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="font-display text-xl font-semibold text-ink">Related workshops</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map(w => (
              <Link key={w.slug} href={`/learn/workshops/${w.slug}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-teal/40">
                <span className="text-sm font-medium text-ink">{w.title}</span>
                <span aria-hidden className="text-teal">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}