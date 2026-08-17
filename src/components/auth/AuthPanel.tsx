"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/atoms";

export default function AuthPanel({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  const submit = (event: FormEvent) => event.preventDefault();
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-chalk px-5">
    <div className="ambient-grid pointer-events-none absolute inset-0 opacity-40" />
    <div className="glossy-surface relative w-full max-w-md rounded-3xl p-7 sm:p-9">
      <Link href="/" className="focus-ring"><Logo /></Link>
      <p className="mt-9 text-3xl font-semibold tracking-[-.04em] text-ink">{signup ? "Create your account." : "Welcome back."}</p>
      <p className="mt-2 text-sm text-ink-soft">{signup ? "Start building your corner of the internet." : "Continue building your corner."}</p>
      <button type="button" disabled className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-ink-soft"><span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] font-bold text-black">G</span>Continue with Google <span className="sr-only">(coming soon)</span></button>
      <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[.16em] text-ink-soft/60"><span className="h-px flex-1 bg-white/10" />or<span className="h-px flex-1 bg-white/10" /></div>
      <form onSubmit={submit} className="space-y-4">
        {signup && <Field label="Name" type="text" placeholder="Enter your name" />}
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Field label="Password" type="password" placeholder="••••••••" />
        {!signup && <p className="text-right text-xs text-coral">Forgot password?</p>}
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral px-4 py-3 text-sm font-semibold text-[#050507]">{signup ? "Create account" : "Log in"} <ArrowRight size={15} /></button>
      </form>
      <p className="mt-5 text-center text-xs text-ink-soft">{signup ? "Already have an account?" : "Don't have an account?"} <Link className="text-coral hover:text-[#fde68a]" href={signup ? "/login" : "/signup"}>{signup ? "Log in" : "Sign up"}</Link></p>
      <p className="mt-6 text-center text-[11px] text-ink-soft/55">Account providers are not connected yet. This UI is ready for a future auth provider.</p>
    </div>
  </main>;
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) { return <label className="block text-xs text-ink-soft">{label}<input type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.035] px-3.5 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/50 focus:border-coral focus:ring-2 focus:ring-coral/15" /></label>; }
