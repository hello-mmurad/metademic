"use client";
import { useEffect, useState } from "react";

/**
 * Original Metademic lab-companion mascot (SVG + CSS only — no heavy 3D
 * library). Upgrade path: replace the <svg> with a lazy-loaded, compressed
 * GLB via React Three Fiber; pause rendering offscreen and keep this static
 * fallback for reduced-motion. Donation URL lives in site.donate.url.
 */
interface CoffeeMascotProps {
  donateUrl: string | null;
  donateNote: string;
  contactEmail: string;
}

export default function CoffeeMascot({ donateUrl, donateNote, contactEmail }: CoffeeMascotProps) {
  const [mode, setMode] = useState<"open" | "min" | "hidden">("open");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("metademic-mascot") === "hidden") setMode("hidden");
    } catch { /* storage unavailable — widget stays visible */ }
  }, []);

  const hide = () => {
    setMode("hidden");
    try { sessionStorage.setItem("metademic-mascot", "hidden"); } catch {}
  };

  if (mode === "hidden") return null;

  const href = donateUrl
    ?? `mailto:${contactEmail}?subject=${encodeURIComponent("Supporting Metademic")}`;

  if (mode === "min") {
    return (
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <button
          onClick={() => setMode("open")}
          aria-label="Show the support Metademic widget"
          className="rounded-full border border-line bg-surface px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink shadow-card transition hover:border-teal/50"
        >
          Buy us a coffee
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="relative">
        <a
          href={href} target={donateUrl ? "_blank" : undefined}
          rel={donateUrl ? "noopener noreferrer" : undefined}
          aria-label="Buy us a coffee — support open research"
          className="mascot group flex w-[116px] flex-col items-center gap-1 rounded-2xl border border-line bg-surface/95 px-3 pb-2.5 pt-3 shadow-card backdrop-blur transition-colors hover:border-teal/50"
        >
          <svg viewBox="0 0 120 120" className="mascot-bob h-16 w-16" aria-hidden="true">
            <line x1="60" y1="16" x2="60" y2="28" stroke="#1A2421" strokeWidth="2" />
            <circle cx="60" cy="12" r="4" fill="#0F766E" />
            <rect x="22" y="28" width="76" height="62" rx="16" fill="#FFFEF7" stroke="#1A2421" strokeWidth="2" />
            <circle className="mascot-eye" cx="45" cy="54" r="5" fill="#1A2421" />
            <circle className="mascot-eye" cx="66" cy="54" r="5" fill="#1A2421" />
            <path d="M47 68 Q56 75 65 68" stroke="#1A2421" strokeWidth="2" fill="none" strokeLinecap="round" />
            <g className="mascot-steam" stroke="#0F766E" strokeWidth="1.8" fill="none" strokeLinecap="round">
              <path d="M84 30 q2 -4 0 -8" />
              <path d="M90 30 q2 -4 0 -8" />
              <path d="M96 30 q2 -4 0 -8" />
            </g>
            <rect x="78" y="32" width="22" height="18" rx="3.5" fill="#F7F3DD" stroke="#1A2421" strokeWidth="2" />
            <path d="M100 36 q9 3 0 11" stroke="#1A2421" strokeWidth="2" fill="none" />
          </svg>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink">Buy us a coffee</span>
          <span className="text-[10px] leading-tight text-ink3">{donateNote}</span>
        </a>
        <button
          onClick={hide}
          aria-label="Hide the support widget for this visit"
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-xs text-ink2 transition hover:border-teal/50 hover:text-ink"
        >
          <span aria-hidden>✕</span>
        </button>
      </div>
    </div>
  );
}