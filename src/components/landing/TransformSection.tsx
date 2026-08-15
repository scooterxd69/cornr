import { Container, Eyebrow } from "@/components/ui/atoms";
import { ArrowDown } from "lucide-react";

const steps = [
  {
    label: "Your story",
    detail: "Name, interests, projects, personality — whatever makes you, you."
  },
  {
    label: "Cornr's AI",
    detail: "Nemotron reads it and writes the content and design plan for your site."
  },
  {
    label: "Your website",
    detail: "A real, polished personal site — live in under a minute."
  }
];

export default function TransformSection() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <Container>
        <div className="mb-16 max-w-lg">
          <Eyebrow>From your story to your website</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl text-balance">
            Three steps. No code. No templates that look like everyone else&apos;s.
          </h2>
        </div>

        <div className="mx-auto flex max-w-md flex-col items-stretch">
          {steps.map((step, i) => (
            <div key={step.label}>
              <div className="glossy-surface rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-display text-xl">{step.label}</p>
                <p className="mt-1.5 text-sm text-ink-soft">{step.detail}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-3 text-ink-soft/50">
                  <ArrowDown size={18} aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
