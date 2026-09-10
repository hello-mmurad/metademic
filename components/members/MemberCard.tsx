import type { Member } from "@/types/content";

export default function MemberCard({ member }: { member: Member }) {
  const initials = member.name.split(" ").map(w => w[0]).slice(0, 2).join("");
  const links = [
    ["ORCID", member.links?.orcid], ["Scholar", member.links?.scholar],
    ["GitHub", member.links?.github], ["LinkedIn", member.links?.linkedin],
    ["Website", member.links?.website]
  ].filter(([, href]) => Boolean(href));

  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-card">
      <div className="flex items-center gap-4">
        {member.portrait ? (
          // eslint-disable-next-line @next/next/no-img-element -- owner-supplied portraits
          <img src={member.portrait.src} alt={member.portrait.alt} loading="lazy"
            className="h-14 w-14 rounded-full border border-line object-cover" />
        ) : (
          <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-cream2 font-display text-lg font-semibold text-teal-dark">
            {initials}
          </span>
        )}
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{member.name}</h3>
          <p className="text-sm text-ink2">{member.role}</p>
          {member.affiliation && <p className="text-xs text-ink3">{member.affiliation}</p>}
        </div>
      </div>
      {member.bio && <p className="mt-3 text-sm leading-relaxed text-ink2">{member.bio}</p>}
      {member.interests && member.interests.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {member.interests.map(i => (
            <li key={i} className="rounded-full border border-line bg-cream2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink3">{i}</li>
          ))}
        </ul>
      )}
      <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 font-mono text-[11px] uppercase tracking-[0.12em]">
        {member.email && <li><a href={`mailto:${member.email}`} className="text-teal hover:text-teal-dark">Email</a></li>}
        {links.map(([label, href]) => (
          <li key={label as string}>
            <a href={href as string} target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-dark">{label} ↗</a>
          </li>
        ))}
      </ul>
    </article>
  );
}