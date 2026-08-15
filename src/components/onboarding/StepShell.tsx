"use client";

import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button, Container, Logo } from "@/components/ui/atoms";
import Link from "next/link";

interface StepShellProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideNext?: boolean;
}

export default function StepShell({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
  hideNext = false
}: StepShellProps) {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden bg-chalk">
      <div className="ambient-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative border-b border-white/10 bg-chalk/70 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="focus-ring">
            <Logo />
          </Link>
          <p className="font-mono text-xs text-ink-soft">
            Step {step + 1} of {totalSteps}
          </p>
        </Container>
        <div className="h-1 w-full bg-white/5">
          <div
            className="h-full bg-indigo transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Container className="relative flex min-h-[calc(100vh-4.25rem)] max-w-2xl flex-col justify-center py-16">
        <div className="animate-rise rounded-3xl border border-white/10 bg-[#101626]/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-10">
          <h1 className="font-display text-3xl sm:text-4xl text-balance">{title}</h1>
          {subtitle && <p className="mt-2 text-ink-soft">{subtitle}</p>}
          <div className="mt-9">{children}</div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink focus-ring"
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <span />
          )}
          {!hideNext && onNext && (
            <Button onClick={onNext} disabled={nextDisabled} variant="primary">
              {nextLabel} <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}
