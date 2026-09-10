import type { Metadata } from "next";
import { site } from "@/content/site";
import { members } from "@/content/members";
import type { MemberGroup } from "@/types/content";
import MemberCard from "@/components/members/MemberCard";
import { EmptyState, PageHero } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Members",
  description: "The people behind Metademic Research Lab — roles, research interests, and academic profiles.",
  alternates: { canonical: "/members" }
};

const ORDER: MemberGroup[] = ["Leadership", "Research Members", "Contributors", "Advisors", "Alumni"];

export default function MembersPage() {
  const groups = ORDER
    .map(g => ({ group: g, list: members.filter(m => m.group === g) }))
    .filter(x => x.list.length > 0);

  return (
    <>
      <PageHero kicker="People" title="Members of the laboratory"
        lead="The researchers, engineers, and contributors doing the laboratory's work." />
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {groups.length === 0 ? (
          <EmptyState title="Member profiles are being finalised for publication.">
            <p>
              Published profiles will include roles, research interests, and academic identifiers such as
              ORCID. For enquiries in the meantime, write to{" "}
              <a href={`mailto:${site.contactEmail}`} className="font-medium text-teal hover:text-teal-dark">{site.contactEmail}</a>.
            </p>
          </EmptyState>
        ) : (
          groups.map(({ group, list }) => (
            <section key={group} className="mb-14">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">{group}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map(m => <MemberCard key={m.name} member={m} />)}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
}