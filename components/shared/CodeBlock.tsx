"use client";
import { useState } from "react";

export default function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard unavailable — button simply reports nothing */ }
  };
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-carbon text-cream">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foam">{label}</span>
        <button type="button" onClick={copy} className="font-mono text-[11px] text-cream/70 transition-colors hover:text-cream">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed"><code>{code}</code></pre>
    </figure>
  );
}