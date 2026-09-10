import type { Member } from "@/types/content";

/**
 * TODO(owner): populate with verified member data only.
 * Example record shape (never published while the array is empty):
 * {
 *   name: "Full Name", role: "Research Scientist",
 *   affiliation: "Independent", group: "Research Members",
 *   bio: "…", interests: ["…"], email: "…",
 *   links: { orcid: "https://orcid.org/…", github: "https://github.com/…" },
 *   portrait: { src: "/members/full-name.jpg", alt: "Portrait of Full Name" }
 * }
 * Only categories containing members are rendered; never fabricate
 * names, affiliations, degrees, or metrics.
 */
export const members: Member[] = [];