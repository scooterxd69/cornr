import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Container, Eyebrow, LinkButton } from "@/components/ui/atoms";
import { DEMO_PROFILES } from "@/lib/demoData";
import { THEMES } from "@/lib/themes";
import SiteRenderer from "@/components/renderer/SiteRenderer";

export const metadata: Metadata = {
  title: "Examples",
  description: "See what Cornr's AI website generator can build — portfolio sites and vibe sites across six themes."
};

export default function ExamplesPage() {
  return (
    <>
      <Navbar />
      <section className="py-16 sm:py-20">
        <Container>
          <Eyebrow>Examples</Eyebrow>
          <h1 className="font-display text-4xl sm:text-5xl text-balance max-w-xl">
            Seven people. Seven very different websites.
          </h1>
          <p className="mt-4 max-w-md text-ink-soft">
            Every one of these came from the same short onboarding flow you&apos;ll go
            through — the AI just made different calls based on who was in front of it.
          </p>
          <div className="mt-8">
            <LinkButton href="/create" variant="coral">
              Make my own
            </LinkButton>
          </div>
        </Container>
      </section>

      <div className="space-y-16 pb-20">
        {DEMO_PROFILES.map((demo) => {
          const theme = THEMES[demo.spec.site.theme];
          return (
            <div key={demo.id} id={demo.id} className="scroll-mt-20">
              <Container>
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="font-display text-xl">{demo.label}</p>
                    <p className="text-xs text-ink-soft">
                      Theme: {theme.label} &middot; {demo.spec.design.layout} layout
                    </p>
                  </div>
                </div>
              </Container>
              <div className="overflow-hidden border-y border-ink/10">
                <SiteRenderer spec={demo.spec} />
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
}
