import { Container, LinkButton } from "@/components/ui/atoms";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-24 pb-24 sm:pt-32 sm:pb-36">
      <div className="ambient-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="pointer-events-none absolute left-[8%] top-32 -z-10 h-64 w-64 rounded-full bg-indigo/20 blur-[110px] animate-pulse" />
      <div className="pointer-events-none absolute right-[7%] top-20 -z-10 h-48 w-48 rounded-full bg-teal-300/10 blur-[100px]" />
      <Container className="grid gap-14 sm:grid-cols-2 sm:items-center">
        <div className="animate-rise">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-indigo">
            Personal sites, amplified by AI
          </p>
          <h1 className="text-balance font-display text-[2.6rem] leading-[1.05] sm:text-6xl">
            Build your corner
            <br />of the internet.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            Tell us who you are. Cornr turns your story into a living, personal website — designed around your energy.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <LinkButton href="/create" variant="coral">
              Create My Website
            </LinkButton>
            <LinkButton href="/examples" variant="ghost">
              Explore Examples
            </LinkButton>
          </div>
          <p className="mt-6 text-xs text-ink-soft/70">
            Portfolio or vibe. Your corner, your rules.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md [perspective:1200px]">
          {/* The corner-fold reveal: a blank "story" card peels back to show the
              generated site underneath — the literal brand metaphor in motion. */}
          <div className="relative aspect-[4/5]">
            <div
              className="depth-card absolute inset-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_32px_100px_rgba(0,0,0,.55)] animate-float"
              style={{
                background:
                  "linear-gradient(145deg, #1f2c6f 0%, #11162d 46%, #080b14 100%)"
              }}
            >
              <div className="flex h-full flex-col justify-end p-6 text-chalk">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-indigo">
                  Your website / live
                </p>
                <p className="mt-2 font-display text-2xl leading-tight">
                  Naitik — building ideas with curious people.
                </p>
                <div className="mt-4 flex gap-1.5">
                  <span className="h-1.5 w-8 rounded-full bg-chalk/70" />
                  <span className="h-1.5 w-4 rounded-full bg-chalk/40" />
                  <span className="h-1.5 w-4 rounded-full bg-chalk/40" />
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 flex origin-top-right -rotate-[10deg] flex-col justify-between rounded-2xl border border-white/10 bg-[#111827]/95 p-6 shadow-xl transition-transform duration-500 ease-out hover:-rotate-[16deg]"
              style={{ transformOrigin: "88% 8%" }}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  your story → AI → site
                </p>
                <div className="mt-4 space-y-2">
                  <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
                  <div className="h-2.5 w-full rounded-full bg-white/10" />
                  <div className="h-2.5 w-2/3 rounded-full bg-white/10" />
                  <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="corner-fold h-10 w-10 self-end rounded-tl-2xl bg-indigo/30" />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-ink-soft/70">
            A dimensional corner, shaped around you.
          </p>
        </div>
      </Container>
    </section>
  );
}
