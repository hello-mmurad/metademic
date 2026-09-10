"use client";
import { useState } from "react";

export default function NewsletterForm({ endpoint }: { endpoint: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState("error"); return; }
    setState("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      setState(res.ok ? "done" : "error");
    } catch { setState("error"); }
  };

  if (state === "done") {
    return <p className="text-sm text-teal-dark" role="status">Thank you — your subscription has been recorded.</p>;
  }

  return (
    <form onSubmit={submit} className="flex max-w-md flex-col gap-2 sm:flex-row" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email" type="email" required value={email}
        onChange={e => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
        placeholder="you@example.org"
        className="w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink3 focus:border-teal"
        aria-invalid={state === "error"}
        aria-describedby={state === "error" ? "newsletter-error" : undefined}
      />
      <button type="submit" disabled={state === "sending"} className="btn-primary justify-center disabled:opacity-60">
        {state === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
      {state === "error" && (
        <p id="newsletter-error" role="alert" className="text-sm text-ink2 sm:sr-only">
          Please check the email address and try again.
        </p>
      )}
    </form>
  );
}