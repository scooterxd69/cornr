import { Container, Eyebrow } from "@/components/ui/atoms";
import { Compass, Fingerprint, WandSparkles } from "lucide-react";

const principles = [
  { icon: Fingerprint, title: "Identity, not a template", detail: "Your taste, work, obsessions and point of view become the design material." },
  { icon: WandSparkles, title: "A corner that evolves", detail: "Start with one thought, then reshape every detail in the studio whenever you want." },
  { icon: Compass, title: "Made to be found", detail: "A responsive, shareable personal site that feels intentional on every screen." }
];

export default function TransformSection() {
  return <section className="relative overflow-hidden border-t border-white/10 py-24 sm:py-32">
    <div className="pointer-events-none absolute right-[8%] top-10 h-56 w-56 rounded-full border border-coral/10 blur-[1px] [transform:rotateX(65deg)]" />
    <Container>
      <div className="mx-auto mb-14 max-w-2xl text-center"><Eyebrow>Not another template</Eyebrow><h2 className="font-sans text-4xl font-semibold tracking-[-.05em] sm:text-6xl">A personal website should feel like <span className="text-coral">a place.</span></h2></div>
      <div className="grid gap-4 md:grid-cols-3">{principles.map(({ icon: Icon, title, detail }) => <article key={title} className="glossy-surface group rounded-2xl p-7 transition duration-500 hover:-translate-y-2"><div className="grid h-11 w-11 place-items-center rounded-xl border border-coral/30 bg-coral/10 text-coral shadow-[0_0_25px_rgba(250,204,21,.12)]"><Icon size={19} /></div><h3 className="mt-8 font-sans text-xl font-semibold tracking-[-.03em] text-ink">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">{detail}</p></article>)}</div>
    </Container>
  </section>;
}
