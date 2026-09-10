import { site } from "@/content/site";
import type { Publication } from "@/types/content";

/**
 * Citation metadata adapter. Until a provider is connected
 * (site.citationProvider), this returns null and every UI surface hides
 * citation counts. Counts are NEVER hand-entered in content data.
 * TODO(owner): implement one of:
 *   OpenAlex          https://api.openalex.org/works/doi:{doi}
 *   Crossref          https://api.crossref.org/works/{doi}
 *   Semantic Scholar  https://api.semanticscholar.org/graph/v1/paper/DOI:{doi}?fields=citationCount
 * Cache responses with { next: { revalidate: 86400 } }.
 */
export async function fetchCitationCount(doi: string): Promise<number | null> {
  if (site.citationProvider === "none" || !doi) return null;
  return null;
}

export function displayCitations(pub: Publication): number | null {
  return typeof pub.citations === "number" ? pub.citations : null;
}