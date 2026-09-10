import Link from "next/link";
import type { WeeklyAchievement } from "@/types/content";
import { products } from "@/content/products";
import { Chip, StatusBadge } from "@/components/shared/ui";
import { pad2 } from "@/lib/utils";

export default function WeeklyLog({ items }: { items: WeeklyAchievement[] }) {
  const years = [...new Set(items.map(i => i.year))].sort((a, b) => b - a);
  return (
    <div className="space-y-12">
      {years.map(year => (
        <section key={year} aria-label={`Weekly log ${year}`}>
          <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-ink3">{year}</h3>
          <ol className="mt-4 space-y-4">
            {items.filter(i => i.year === year).map(item => {
              const phase = item.phase ? { id: item.phase } : null;
              return (
                <li key={item.id}>
                  <details className="group rounded-lg border border-line bg-surface shadow-card">
                    <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 p-5 [&::-webkit-details-marker]:hidden">
                      <span className="rounded-md border border-teal/30 bg-teal-soft px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-teal-dark">
                        W{pad2(item.week)}
                      </span>
                      <span>
                        <span className="block font-display text-lg font-semibold text-ink">{item.title}</span>
                        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
                          {item.dateRange} · {item.category}
                        </span>
                      </span>
                      <span className="ml-auto flex items-center gap-3">
                        <StatusBadge status={item.status} />
                        <span aria-hidden className="chev text-ink3">›</span>
                      </span>
                    </summary>
                    <div className="border-t border-linesoft p-5">
                      <p className="font-medium leading-relaxed text-ink">{item.summary}</p>
                      <p className="measure mt-3 text-sm leading-relaxed text-ink2">{item.detail}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.products?.map(name => {
                          const prod = products.find(p => p.name === name);
                          return prod?.href
                            ? <Link key={name} href={prod.href}><Chip>{name}</Chip></Link>
                            : <Chip key={name}>{name}</Chip>;
                        })}
                        {item.papers?.map(p => <Chip key={p}>{p}</Chip>)}
                        {phase && <Link href={`/roadmap#phase-${phase.id}`}><Chip>Roadmap phase</Chip></Link>}
                      </div>
                      {item.metrics && item.metrics.length > 0 && (
                        <dl className="mt-4 flex flex-wrap gap-6">
                          {item.metrics.map(m => (
                            <div key={m.label}>
                              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink3">{m.label}</dt>
                              <dd className="font-mono text-lg text-ink">{m.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {item.links && item.links.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-3">
                          {item.links.map(l => (
                            <li key={l.label}>
                              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-teal hover:text-teal-dark">{l.label} ↗</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}