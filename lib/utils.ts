import type { Publication } from "@/types/content";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC"
  });
}

export function pad2(n: number) { return String(n).padStart(2, "0"); }

export function livePublications(pubs: Publication[]) {
  return pubs.filter(p => !p.draft);
}

export function publicationsFor(pubs: Publication[], areaSlug: string) {
  return livePublications(pubs).filter(p => p.area === areaSlug);
}

export function generateBibTeX(pub: Publication): string {
  const key = `${pub.authors[0]?.split(" ").pop()?.toLowerCase() ?? "anon"}${pub.year}${pub.slug.split("-")[0]}`;
  return [
    `@misc{${key},`,
    `  title        = {${pub.title}},`,
    `  author       = {${pub.authors.join(" and ")}},`,
    `  year         = {${pub.year}},`,
    pub.venue ? `  howpublished = {${pub.venue}},` : null,
    pub.doi ? `  doi          = {${pub.doi}},` : null,
    `  note         = {Metademic Research Lab}`
  ].filter(Boolean).join("\n") + "\n}";
}