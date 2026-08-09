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
    <div className="min-h-screen bg-chalk">
      <div className="border-b border-ink/10">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="focus-ring">
            <Logo />
          </Link>
          <p className="font-mono text-xs text-ink-soft">
            Step {step + 1} of {totalSteps}
          </p>
        </Container>
        <div className="h-1 w-full bg-chalk-dim">
          <div
            className="h-full bg-indigo transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Container className="flex min-h-[calc(100vh-4.25rem)] max-w-2xl flex-col justify-center py-16">
        <div className="animate-rise">
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
