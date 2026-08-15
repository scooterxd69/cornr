import { Container, Eyebrow } from "@/components/ui/atoms";
import { Palette, Wand2, Smartphone, ShieldCheck, Download, MessageSquare } from "lucide-react";

const features = [
  { icon: Palette, title: "6 real themes", detail: "Midnight, Aurora, Editorial, Cyber, Dream, Studio — structurally different, not just recolored." },
  { icon: Wand2, title: "AI that decides for you", detail: "Not sure what fits your personality? Let the AI choose your theme and layout." },
  { icon: MessageSquare, title: "Edit with plain English", detail: "\"Make it more futuristic.\" \"Make the colors darker.\" Your site updates instantly." },
  { icon: Smartphone, title: "Looks right everywhere", detail: "Every generated site is responsive from a widescreen down to a phone." },
  { icon: ShieldCheck, title: "Your key stays yours", detail: "Generation runs server-side. Nothing touches your NVIDIA key in the browser." },
  { icon: Download, title: "Own your site", detail: "Export a clean, portable HTML file any time — no lock-in." }
];

export default function Features() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <Container>
        <div className="mb-16 max-w-lg">
          <Eyebrow>What you get</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl text-balance">
            Built to feel like a product, not a prototype.
          </h2>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="rounded-2xl border border-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[.035]">
              <Icon className="text-indigo" size={20} aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
