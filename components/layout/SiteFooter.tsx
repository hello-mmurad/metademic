import Link from "next/link";
import { site } from "@/content/site";
import Wordmark from "@/components/shared/Wordmark";

interface FooterLink { label: string; href: string; external?: boolean }

export default function SiteFooter() {
  const mailto = (subject: string) =>
    `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;

  const groups: { title: string; links: FooterLink[] }[] = [
    {
      title: "Metademic",
      links: [
        { label: "About", href: "/who-we-are" },
        { label: "Members", href: "/members" },
        { label: "Roadmap", href: "/roadmap" },
        { label: "Contact", href: mailto("Metademic enquiry") }
      ]
    },
    {
      title: "Research",
      links: [
        { label: "Research Areas", href: "/research" },
        { label: "Publications", href: "/research#publications" },
        { label: "Metademic Journal", href: site.journal.url ?? "/research#journal", external: Boolean(site.journal.url) }
      ]
    },
    {
      title: "Products",
      links: [
        { label: "RACoN", href: "/products/racon" },
        ...(site.racon.docsUrl ? [{ label: "Documentation", href: site.racon.docsUrl, external: true }] : []),
        ...(site.social.github ? [{ label: "GitHub", href: site.social.github, external: true }] : []),
        ...(site.social.discord ? [{ label: "Community", href: site.social.discord, external: true }] : [])
      ]
    },
    {
      title: "Learn",
      links: [
        { label: "MetaDemic Workshop", href: "/learn" },
        ...(site.blog.url ? [{ label: "Blog", href: site.blog.url, external: true }] : [])
      ]
    },
    {
      title: "Connect",
      links: [
        ...(site.social.github ? [{ label: "GitHub", href: site.social.github, external: true }] : []),
        ...(site.social.linkedin ? [{ label: "LinkedIn", href: site.social.linkedin, external: true }] : []),
        { label: "Newsletter", href: mailto("Newsletter sign-up") },
        { label: "Support Us", href: site.donate.url ?? mailto("Supporting Metademic"), external: Boolean(site.donate.url) }
      ]
    }
  ];

  return (
    <footer className="border-t border-line bg-cream2/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Wordmark />
            <p className="measure mt-4 text-sm leading-relaxed text-ink2">
              Metademic is an independent research laboratory developing open research, experimental systems, and technical learning resources across intelligent and distributed computing.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {groups.map(g => (
              <div key={g.title}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink3">{g.title}</h2>
                <ul className="mt-3 space-y-2">
                  {g.links.map(l => (
                    <li key={l.label}>
                      {l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-ink2 transition-colors hover:text-teal-dark">{l.label}</a>
                      ) : (
                        <Link href={l.href} className="text-sm text-ink2 transition-colors hover:text-teal-dark">{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">© {new Date().getFullYear()} {site.name}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink3">Open research · Open infrastructure</p>
        </div>
      </div>
    </footer>
  );
}