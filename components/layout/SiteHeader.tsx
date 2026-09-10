import Link from "next/link";
import { site } from "@/content/site";
import Wordmark from "@/components/shared/Wordmark";
import HeaderNav from "@/components/layout/HeaderNav";
import MobileNavigation from "@/components/layout/MobileNavigation";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur supports-[backdrop-filter]:bg-cream/75">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${site.shortName} — home`} className="rounded">
          <Wordmark />
        </Link>
        <HeaderNav links={site.nav} cta={site.cta} />
        <MobileNavigation links={site.nav} cta={site.cta} />
      </div>
    </header>
  );
}