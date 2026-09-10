import { Chip } from "@/components/shared/ui";
import type { BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : null;
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 transition-colors hover:border-teal/40">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">
        {date && <span>{date}</span>}
        {post.category && <><span aria-hidden>·</span><Chip>{post.category}</Chip></>}
      </div>
      <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug">
        <a href={post.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-dark">{post.title}</a>
      </h3>
      {post.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink2">{post.excerpt}</p>}
      <p className="mt-auto pt-4 text-sm font-medium text-teal">
        <a href={post.link} target="_blank" rel="noopener noreferrer">Read article <span aria-hidden>→</span></a>
      </p>
    </article>
  );
}