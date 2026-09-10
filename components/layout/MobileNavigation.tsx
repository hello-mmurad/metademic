"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NavLink } from "@/types/content";

export default function MobileNavigation({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Open navigation"
        className="rounded-md border border-line bg-surface p-2 text-ink">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" /></svg>
      </button>
      {open && (
        <div id="mobile-nav" role="dialog" aria-modal="true" aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-ink/30" onClick={() => setOpen(false)}>
          <div ref={panel} onClick={e => e.stopPropagation()}
            className="absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col overflow-y-auto border-l border-line bg-cream p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink3">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close navigation"
                className="rounded border border-line bg-surface p-2 text-ink">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" /></svg>
              </button>
            </div>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base text-ink transition-colors hover:bg-cream2">
                {l.label}
              </Link>
            ))}
            <Link href={cta.href} onClick={() => setOpen(false)}
              className="mt-3 rounded-md bg-teal px-3 py-2.5 text-center text-base font-medium text-white">
              {cta.label} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}