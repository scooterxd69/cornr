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
    <div className="flex min-h-screen flex-col items-center justify-center bg-chalk px-6 text-center">
      <Logo className="mb-10" />
      <Loader2 className="animate-spin text-indigo" size={28} aria-hidden="true" />
      <p className="mt-6 font-display text-2xl">Building your website</p>
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
