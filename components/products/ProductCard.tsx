import Link from "next/link";
import type { Product } from "@/types/content";
import { StatusBadge } from "@/components/shared/ui";

export default function ProductCard({ product }: { product: Product }) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-ink">{product.name}</h3>
        <StatusBadge status={product.status} />
      </div>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">{product.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink2">{product.description}</p>
      {product.href && (
        <p className="mt-auto pt-4 text-sm font-medium text-teal">
          Open <span aria-hidden>→</span>
        </p>
      )}
    </>
  );
  const cls = "flex h-full flex-col rounded-lg border border-line bg-surface p-5 transition-colors";
  return product.href ? (
    <Link href={product.href} className={`${cls} hover:border-teal/40`}>{body}</Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}