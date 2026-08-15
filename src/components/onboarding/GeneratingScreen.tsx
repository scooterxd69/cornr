"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button, Container, Logo } from "@/components/ui/atoms";

const MESSAGES = [
  "Reading through what you told us...",
  "Sketching a few design directions...",
  "Choosing a theme that fits you...",
  "Writing your headline...",
  "Laying out the sections...",
  "Almost there..."
];

export function GeneratingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-chalk px-6 text-center">
      <div className="ambient-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="absolute h-72 w-72 rounded-full border border-indigo/20 animate-[orbit_18s_linear_infinite]" />
      <div className="absolute h-44 w-44 rounded-full border border-coral/15 animate-[orbit_12s_linear_infinite_reverse]" />
      <Logo className="relative mb-10" />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo/30 bg-indigo/10 shadow-[0_0_45px_rgba(130,148,255,.2)]"><Loader2 className="animate-spin text-indigo" size={28} aria-hidden="true" /></div>
      <p className="relative mt-6 font-display text-2xl">Designing your corner</p>
      <p className="mt-2 text-sm text-ink-soft" aria-live="polite">
        {MESSAGES[index]}
      </p>
    </div>
  );
}

export function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-chalk px-6 text-center">
      <Container className="max-w-sm">
        <AlertTriangle className="mx-auto text-coral" size={28} aria-hidden="true" />
        <p className="mt-5 font-display text-2xl">{message}</p>
        <Button onClick={onRetry} className="mt-7" variant="primary">
          Try again
        </Button>
      </Container>
    </div>
  );
}
