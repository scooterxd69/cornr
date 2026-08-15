import { Container, Eyebrow } from "@/components/ui/atoms";
import { Briefcase, Sparkles } from "lucide-react";

export default function ModeComparison() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <Container>
        <div className="mb-16 max-w-lg">
          <Eyebrow>Two modes</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl text-balance">
            Not every website needs a resume attached.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="glossy-surface rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1">
            <Briefcase className="text-moss" size={22} aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl">Portfolio mode</h3>
            <p className="mt-2 text-sm text-ink-soft">
              For students, developers, designers, freelancers. Built around your
              skills, projects, education and experience — the site you send with
              an application.
            </p>
          </div>
          <div className="glossy-surface rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1">
            <Sparkles className="text-coral" size={22} aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl">Vibe mode</h3>
            <p className="mt-2 text-sm text-ink-soft">
              For everyone else. A personal corner built around your personality,
              interests and aesthetic — no resume required.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
