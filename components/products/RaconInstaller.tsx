"use client";
import { useState } from "react";
import type { InstallMethod } from "@/types/content";
import CodeBlock from "@/components/shared/CodeBlock";
import { cn } from "@/lib/utils";

export default function RaconInstaller({ methods }: { methods: InstallMethod[] }) {
  const [active, setActive] = useState(methods.find(m => m.available)?.id ?? methods[0].id);
  const current = methods.find(m => m.id === active) ?? methods[0];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = methods.findIndex(m => m.id === active);
    const next = methods[(i + (e.key === "ArrowRight" ? 1 : -1) + methods.length) % methods.length];
    setActive(next.id);
    (document.getElementById(`tab-${next.id}`) as HTMLButtonElement | null)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Installation method" onKeyDown={onKeyDown}
        className="flex w-fit max-w-full flex-wrap gap-1 rounded-lg border border-line bg-cream2 p-1">
        {methods.map(m => (
          <button key={m.id} role="tab" id={`tab-${m.id}`} aria-selected={active === m.id}
            aria-controls={`panel-${m.id}`} tabIndex={active === m.id ? 0 : -1}
            onClick={() => setActive(m.id)}
            className={cn("rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
              active === m.id ? "border border-line bg-surface text-ink shadow-card" : "border border-transparent text-ink2 hover:text-ink")}>
            {m.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} className="mt-4">
        {current.available && current.commands?.length ? (
          <div className="space-y-3">
            {current.commands.map(c => <CodeBlock key={c.label} label={c.label} code={c.code} />)}
            {current.note && <p className="text-sm text-ink2">{current.note}</p>}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-line bg-cream2/60 p-5">
            <p className="text-sm leading-relaxed text-ink2">{current.note ?? "Release package not yet published."}</p>
          </div>
        )}
      </div>
    </div>
  );
}