import { Container, Eyebrow } from "@/components/ui/atoms";

const steps = [
  { title: "Answer 7 short prompts", detail: "Name, a few lines about yourself, what you're into, and how you want it to feel." },
  { title: "Pick portfolio or vibe", detail: "Tell it what kind of corner of the internet you want." },
  { title: "Get a real website", detail: "Preview it on desktop, tablet and mobile — then edit, regenerate, or publish." }
];

export default function HowItWorks() {
  return (
    <section className="border-t border-ink/10 py-24 sm:py-32">
      <Container>
        <div className="mb-16 max-w-lg">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl text-balance">
            Genuinely three minutes, start to finish.
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="border-t-2 border-ink pt-5">
              <p className="font-mono text-xs text-ink-soft">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-xl">{step.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{step.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
