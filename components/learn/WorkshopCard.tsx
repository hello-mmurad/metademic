import Link from "next/link";
import type { Course } from "@/types/content";
import { StatusBadge } from "@/components/shared/ui";

export default function WorkshopCard({ course }: { course: Course }) {
  return (
    <Link href={`/learn/workshops/${course.slug}`}
      className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card transition-colors hover:border-teal/40">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">{course.category}</span>
        <StatusBadge status={course.status} />
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{course.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink2">{course.description}</p>
      <p className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink3">
        {course.difficulty} · {course.format}
      </p>
    </Link>
  );
}