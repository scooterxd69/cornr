import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-lg ${className}`}>
      <span
        className="corner-fold inline-block h-5 w-5 bg-ink"
        aria-hidden="true"
      />
      cornr
    </span>
  );
}

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-[4px] px-6 py-3 text-sm font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-ink text-chalk hover:bg-ink-soft",
  coral: "bg-coral text-chalk hover:brightness-105 shadow-[3px_3px_0_0_#14161C]",
  ghost: "bg-transparent text-ink border border-ink/20 hover:border-ink/50",
  soft: "bg-indigo-soft text-indigo hover:bg-indigo/10"
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
