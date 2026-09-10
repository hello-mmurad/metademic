import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Wordmark({ className }: { className?: string }) {
  if (site.brand.logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- owner-supplied asset, unknown source domain
      <img src={site.brand.logoSrc} alt={site.name} className={cn("h-8 w-auto", className)} />
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 8v6M9.5 25l3.6-7M22.5 25l-3.6-7" stroke="#0F766E" strokeWidth="1.8" fill="none" />
        <circle cx="16" cy="6.5" r="2.6" fill="#0F766E" />
        <circle cx="8.5" cy="26" r="2.4" fill="#1A2421" />
        <circle cx="23.5" cy="26" r="2.4" fill="#1A2421" />
        <circle cx="16" cy="16.5" r="3.4" fill="none" stroke="#0F766E" strokeWidth="1.8" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight text-ink">
        Meta<span className="text-teal">Demic</span>
      </span>
    </span>
  );
}