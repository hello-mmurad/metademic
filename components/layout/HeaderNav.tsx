"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/types/content";
import { cn } from "@/lib/utils";

export default function HeaderNav({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
      {links.map(l => {
        const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}
            className={cn("relative rounded px-3 py-2 text-sm transition-colors hover:text-ink", active ? "text-ink" : "text-ink2")}>
            {l.label}
            {active && <span aria-hidden className="absolute inset-x-3 -bottom-px h-px bg-teal" />}
          </Link>
        );
      })}
      <Link href={cta.href} className="ml-3 inline-flex items-center gap-1.5 rounded-md bg-teal px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark">
        {cta.label} <span aria-hidden>→</span>
      </Link>
    </nav>
  );
}