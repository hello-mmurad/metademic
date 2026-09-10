import { site } from "@/content/site";
import RotatingLine from "@/components/home/RotatingLine";

export default function JournalBanner() {
  const j = site.journal;
  const fallback = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Metademic Journal enquiry")}`;
  const explore = j.url ?? fallback;
  const submit = j.submitUrl ?? fallback;
  return (
    <section id="journal" aria-labelledby="journal-title" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-xl border border-line bg-surface shadow-card">
        <div className="journal-grid absolute inset-0" aria-hidden />
        <div className="relative p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="rule-label">{j.name}</p>
            {j.openForSubmissions && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-teal-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
                Open for submissions
              </span>
            )}
          </div>
          <h2 id="journal-title" className="mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Open research, open review — call for manuscripts
          </h2>
          <p className="measure mt-3 leading-relaxed text-ink2">
            An open scholarly venue for rigorous work across intelligent systems, computing, engineering,
            and emerging interdisciplinary research.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={explore} target={j.url ? "_blank" : undefined} rel={j.url ? "noopener noreferrer" : undefined} className="btn-primary">
              Explore the journal <span aria-hidden>→</span>
            </a>
            <a href={submit} target={j.submitUrl ? "_blank" : undefined} rel={j.submitUrl ? "noopener noreferrer" : undefined} className="btn-secondary">
              Submit a manuscript <span aria-hidden>→</span>
            </a>
          </div>
          <RotatingLine />
        </div>
      </div>
    </section>
  );
}