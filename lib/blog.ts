import { site } from "@/content/site";

export interface BlogPost {
  title: string; link: string; date: string;
  category?: string; excerpt?: string; author?: string;
}

/** Server-side only. Feed URL comes from BLOG_FEED_URL (never exposed to the client). */
const FEED_URL = process.env.BLOG_FEED_URL ?? null;

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

/** Strip markup/CDATA — output is plain text, rendered as text (XSS-safe). */
function plain(s: string) {
  return decodeEntities(
    s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ").trim();
}
function optionalPlain(s: string | undefined) {
  if (!s) return undefined;
  const value = plain(s);
  return value || undefined;
}


function pick(block: string, tags: string[]) {
  for (const t of tags) {
    const m = block.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, "i"));
    if (m) return m[1];
  }
  return undefined;
}

function parseFeed(xml: string): BlogPost[] {
  const isAtom = /<feed[\s>]/i.test(xml);
  const blocks = isAtom
    ? [...xml.matchAll(/<entry[\s>][\s\S]*?<\/entry>/gi)].map(m => m[0])
    : [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)].map(m => m[0]);
  return blocks.map(b => {
    const linkMatch = isAtom
      ? b.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"[^>]*\/?>/i) ?? b.match(/<link[^>]*href="([^"]+)"/i)
      : b.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    return {
      title: plain(pick(b, ["title"]) ?? ""),
      link: (linkMatch?.[1] ?? "").trim(),
      date: plain(pick(b, ["pubDate", "published", "updated", "dc:date"]) ?? ""),
      category: optionalPlain(pick(b, ["category"])),
      excerpt: plain(pick(b, ["description", "summary", "content:encoded"]) ?? "").slice(0, 220),
      author: optionalPlain(pick(b, ["dc:creator", "author", "name"]))
    };
  }).filter(p => p.title && p.link.startsWith("http"));
}

export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  if (!FEED_URL) return [];
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 1800 } }); // cached; site never blocks on the blog
    if (!res.ok) return [];
    return parseFeed(await res.text()).slice(0, limit);
  } catch {
    return []; // feed unavailable → section hides, layout preserved, no visitor-facing errors
  }
}
