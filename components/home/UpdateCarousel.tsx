"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LabUpdate } from "@/types/content";
import { cn, formatDate } from "@/lib/utils";

const TYPE_LABEL: Record<LabUpdate["type"], string> = {
  research: "Research", engineering: "Engineering", release: "Release",
  event: "Event", announcement: "Announcement", blog: "Blog", workshop: "Workshop"
};

export default function UpdateCarousel({ updates }: { updates: LabUpdate[] }) {
  const count = updates.length;
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduced = useRef(false);
  const track = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const paused = hoverPaused || userPaused;

  useEffect(() => { indexRef.current = index; }, [index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const on = () => { reduced.current = mq.matches; };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const scrollTo = useCallback((i: number) => {
    const t = track.current;
    if (!t || count === 0) return;
    const clamped = ((i % count) + count) % count;
    setIndex(clamped);
    const child = t.children[clamped] as HTMLElement | undefined;
    if (child) t.scrollTo({ left: child.offsetLeft - t.offsetLeft, behavior: reduced.current ? "auto" : "smooth" });
  }, [count]);

  useEffect(() => {
    if (paused || reduced.current || count < 2) return;
    const t = window.setInterval(() => scrollTo(indexRef.current + 1), 6500);
    return () => window.clearInterval(t);
  }, [paused, count, scrollTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); setUserPaused(true); scrollTo(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setUserPaused(true); scrollTo(index - 1); }
  };

  // Sync state when the visitor swipes via native touch scrolling
  const onScroll = () => {
    const t = track.current;
    if (!t) return;
    const w = (t.children[0]?.clientWidth ?? 1) || 1;
    const i = Math.max(0, Math.min(count - 1, Math.round(t.scrollLeft / w)));
    if (i !== indexRef.current) { indexRef.current = i; setIndex(i); }
  };

  return (
    <div
      role="region" aria-roledescription="carousel" aria-label="Latest lab updates"
      onMouseEnter={() => setHoverPaused(true)} onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)} onBlurCapture={() => setHoverPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div ref={track} onScroll={onScroll} onPointerDown={() => setUserPaused(true)}
        className="carousel-track -mx-1 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-1 pb-2"
        tabIndex={0}>
        {updates.map((u, i) => (
          <div key={u.id} role="group" aria-roledescription="slide"
            aria-label={`Update ${i + 1} of ${count}`} aria-hidden={index !== i}
            className="w-full shrink-0 snap-start px-1 sm:w-1/2 lg:w-1/3">
            <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-teal/40">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full border border-teal/30 bg-teal-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-teal-dark">
                  {TYPE_LABEL[u.type]}
                </span>
                <time dateTime={u.date} className="font-mono text-[11px] text-ink3">{formatDate(u.date)}</time>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink2">{u.summary}</p>
              {u.href && (
                <p className="mt-auto pt-4 text-sm font-medium text-teal">
                  <Link href={u.href} tabIndex={index === i ? 0 : -1} className="hover:text-teal-dark">
                    {u.product ? `${u.product} · ` : ""}View update <span aria-hidden>→</span>
                  </Link>
                </p>
              )}
            </article>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2" role="group" aria-label="Choose update">
          {updates.map((u, i) => (
            <button key={u.id} onClick={() => { setUserPaused(true); scrollTo(i); }}
              aria-label={`Go to update ${i + 1}: ${u.title}`} aria-current={index === i}
              className={cn("h-2 rounded-full transition-all", index === i ? "w-6 bg-teal" : "w-2 bg-line hover:bg-teal/40")} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setUserPaused(true); scrollTo(index - 1); }} aria-label="Previous update"
            className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-ink2 transition hover:border-teal/40 hover:text-ink">←</button>
          <button onClick={() => { setUserPaused(true); scrollTo(index + 1); }} aria-label="Next update"
            className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-ink2 transition hover:border-teal/40 hover:text-ink">→</button>
        </div>
      </div>
    </div>
  );
}