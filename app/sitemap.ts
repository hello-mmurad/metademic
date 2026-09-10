import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publications, researchAreas } from "@/content/research";
import { workshops } from "@/content/workshops";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const statics = ["", "/research", "/products", "/products/racon", "/learn", "/members", "/who-we-are", "/roadmap"]
    .map(p => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 }));
  return [
    ...statics,
    ...researchAreas.map(a => ({ url: `${base}/research/${a.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...publications.filter(p => !p.draft).map(p => ({ url: `${base}/research/${p.area}/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...workshops.map(w => ({ url: `${base}/learn/workshops/${w.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }))
  ];
}