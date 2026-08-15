import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-xl font-semibold tracking-[-.06em] ${className}`}>
      <span
        className="corner-fold inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/15 to-white/5 font-sans text-lg font-black text-ink shadow-lg"
        aria-hidden="true"
      >C</span>
      <span>CorN<span className="text-coral">r</span></span>
    </span>
  );
}

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-ring disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-coral text-[#111111] shadow-[0_10px_24px_rgba(255,201,72,.16)] hover:-translate-y-0.5 hover:brightness-105",
  coral: "bg-coral text-[#111111] shadow-[0_10px_24px_rgba(255,201,72,.16)] hover:-translate-y-0.5 hover:brightness-105",
  ghost: "border border-white/15 bg-white/[.035] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,.06)] hover:-translate-y-0.5 hover:border-coral/50 hover:bg-white/[.07]",
  soft: "bg-indigo-soft text-coral hover:bg-indigo/10"
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`${baseButton} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof variants;
  href: string;
}

export function LinkButton({ variant = "primary", className = "", href, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={`${baseButton} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 sm:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-indigo">{children}</p>
  );
}
