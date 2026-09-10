"use client";
import { useEffect, useState } from "react";

const LINES = [
  "Open research · Open infrastructure",
  "Rigour before speed",
  "Manuscripts, protocols, and tooling in the open"
];

export default function RotatingLine() {
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;
    const t = window.setInterval(() => setI(v => (v + 1) % LINES.length), 5000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <p aria-live="off" className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink3">
      {LINES[reduced ? 0 : i]}
    </p>
  );
}