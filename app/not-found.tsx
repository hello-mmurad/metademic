import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start px-4 py-24 sm:px-6 lg:px-8">
      <p className="rule-label">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">This page does not exist.</h1>
      <p className="mt-3 max-w-md leading-relaxed text-ink2">
        The address may have changed, or the page may not have been published yet.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary">Home <span aria-hidden>→</span></Link>
        <Link href="/research" className="btn-secondary">Research</Link>
      </div>
    </div>
  );
}