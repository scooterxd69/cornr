"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container, LinkButton } from "@/components/ui/atoms";

const SUGGESTIONS = ["I'm a developer...", "I'm a photographer...", "I'm a therapist...", "I'm a creator..."];

export default function Hero() {
  const router = useRouter();
  const [story, setStory] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); router.push(`/create?story=${encodeURIComponent(story)}`); };
  return <section className="relative isolate overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-32">
    <div className="ambient-grid pointer-events-none absolute inset-0 -z-10 opacity-50" />
    <div className="pointer-events-none absolute left-[6%] top-24 -z-10 h-72 w-72 rounded-full bg-coral/15 blur-[120px] animate-pulse" />
    <div className="pointer-events-none absolute right-[5%] top-16 -z-10 h-80 w-80 rounded-full border border-coral/20 [transform:rotateX(62deg)_rotateZ(-25deg)] animate-[orbit_18s_linear_infinite]" />
    <Container className="relative text-center">
      <p className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[.24em] text-coral"><Sparkles className="mr-2 inline" size={13} />Your personal internet</p>
      <h1 className="mx-auto max-w-4xl font-sans text-5xl font-semibold leading-[.96] tracking-[-.065em] text-ink sm:text-7xl lg:text-8xl">Your story.<br /><span className="text-coral">Your corner.</span></h1>
      <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">Tell us about yourself. Cornr turns your story into a website that actually feels like you.</p>
      <form onSubmit={submit} className="glossy-surface relative mx-auto mt-11 max-w-3xl overflow-hidden rounded-3xl p-2 text-left shadow-[0_30px_90px_rgba(0,0,0,.55)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral/80 to-transparent" />
        <label className="block px-5 pt-4 text-sm font-medium text-ink">Tell us about yourself...</label>
        <textarea value={story} onChange={(e) => setStory(e.target.value)} placeholder="I'm a student who loves coding, music, photography and building cool things..." className="min-h-28 w-full resize-none bg-transparent px-5 py-3 text-base text-ink outline-none placeholder:text-ink-soft/65" maxLength={2000} />
        <div className="flex flex-col gap-3 border-t border-white/10 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">{SUGGESTIONS.map((suggestion) => <button key={suggestion} type="button" onClick={() => setStory(suggestion.replace("...", ""))} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-xs text-ink-soft transition hover:border-coral/50 hover:text-ink">{suggestion}</button>)}</div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral px-5 py-3 text-sm font-semibold text-[#050507] shadow-[0_8px_25px_rgba(250,204,21,.2)] transition hover:-translate-y-0.5 hover:bg-[#fde68a]">Create My Corner <ArrowRight size={16} /></button>
        </div>
      </form>
      <div className="mt-7 flex justify-center"><LinkButton href="/examples" variant="ghost">Explore examples</LinkButton></div>
    </Container>
  </section>;
}
