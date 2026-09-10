import Link from "next/link";
import { cn } from "@/lib/utils";

const TONES: Record<string, { glyph: string; cls: string }> = {
  Completed: { glyph: "✓", cls: "border-teal/30 bg-teal-soft text-teal-dark" },
  Published: { glyph: "✓", cls: "border-teal/30 bg-teal-soft text-teal-dark" },
  Available: { glyph: "✓", cls: "border-teal/30 bg-teal-soft text-teal-dark" },
  "In Progress": { glyph: "◐", cls: "border-teal/40 bg-teal-soft text-teal-dark" },
  "In Review": { glyph: "◐", cls: "border-teal/40 bg-teal-soft text-teal-dark" },
  "Research Preview": { glyph: "◐", cls: "border-teal/40 bg-teal-soft text-teal-dark" },
  Prototype: { glyph: "◐", cls: "border-teal/40 bg-teal-soft text-teal-dark" },
  Preprint: { glyph: "◐", cls: "border-teal/40 bg-teal-soft text-teal-dark" },
  Active: { glyph: "●", cls: "border-teal/30 bg-teal-soft text-teal-dark" },
  Planned: { glyph: "○", cls: "border-line bg-cream2 text-ink2" },
  Experimental: { glyph: "◌", cls: "border-line bg-cream2 text-ink2" },
  "Coming Soon": { glyph: "○", cls: "border-line bg-cream2 text-ink2" },
  "In Preparation": { glyph: "○", cls: "border-line bg-cream2 text-ink2" },
  Draft: { glyph: "○", cls: "border-line bg-cream2 text-ink2" },
  Archived: { glyph: "○", cls: "border-line bg-cream2 text-ink3" }
};

export function StatusBadge({ status }: { status: string }) {
  const tone = TONES[status] ?? { glyph: "○", cls: "border-line bg-cream2 text-ink2" };
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]", tone.cls)}>
      <span aria-hidden>{tone.glyph}</span>
      {status}
    </span>
  );
}

export function SectionHeader({ index, kicker, title, lead, id }: {
  index?: string; kicker: string; title: string; lead?: string; id?: string;
}) {
  return (
    <div id={id} className="mb-8 max-w-2xl scroll-mt-24">
      <p className="rule-label flex items-center gap-3">
        {index && <span aria-hidden>{index}</span>}
        <span className="h-px w-8 bg-teal/40" aria-hidden />
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 leading-relaxed text-ink2">{lead}</p>}
    </div>
  );
}

export function PageHero({ kicker, title, lead, children }: {
  kicker: string; title: string; lead?: string; children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <p className="rule-label">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {lead && <p className="measure mt-4 text-lg leading-relaxed text-ink2">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-cream2/50 p-8 text-center sm:p-10">
      <p className="font-display text-lg font-medium text-ink">{title}</p>
      {children && <div className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink2">{children}</div>}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? <Link href={it.href} className="hover:text-teal-dark">{it.label}</Link> : <span aria-current="page" className="text-ink2">{it.label}</span>}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-cream2 px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink2">
      {children}
    </span>
  );
}