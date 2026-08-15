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
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="ambient-grid pointer-events-none absolute inset-0 opacity-50" />
        <Container>
          <Eyebrow>Examples</Eyebrow>
          <h1 className="font-display text-4xl sm:text-5xl text-balance max-w-xl">
            Three people. Three entirely different corners.
          </h1>
          <p className="mt-4 max-w-md text-ink-soft">
            Fictional demo profiles, all created from the same Cornr flow. Each preview has its own visual language, pace and point of view.
          </p>
          <div className="mt-8">
            <LinkButton href="/create" variant="coral">
              Make my own
            </LinkButton>
          </div>
        </Container>
      </section>

      <div className="space-y-20 pb-28">
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
              <div className="overflow-hidden border-y border-white/10 bg-black/20 shadow-[0_30px_80px_rgba(0,0,0,.28)] sm:rounded-2xl sm:border">
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
