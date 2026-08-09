import { Container, LinkButton } from "@/components/ui/atoms";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container className="grid gap-14 sm:grid-cols-2 sm:items-center">
        <div className="animate-rise">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-indigo">
            AI personal website builder
          </p>
          <h1 className="text-balance font-display text-[2.6rem] leading-[1.05] sm:text-6xl">
            Your own corner
            <br />
            of the internet.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            Tell us who you are. We&apos;ll turn it into a website — a real one, built
            just for you, in minutes.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <LinkButton href="/create" variant="coral">
              Create My Website
            </LinkButton>
            <LinkButton href="/examples" variant="ghost">
              See an Example
            </LinkButton>
          </div>
          <p className="mt-6 text-xs text-ink-soft/70">
            No account needed to try it. Free to generate.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          {/* The corner-fold reveal: a blank "story" card peels back to show the
              generated site underneath — the literal brand metaphor in motion. */}
          <div className="relative aspect-[4/5]">
            <div
              className="absolute inset-0 rounded-2xl border border-ink/10 shadow-[10px_10px_0_0_#14161C1a]"
              style={{
                background:
                  "linear-gradient(160deg, #8B7CFF 0%, #4F46E5 45%, #0A0A17 100%)"
              }}
            >
              <div className="flex h-full flex-col justify-end p-6 text-chalk">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                  your website
                </p>
                <p className="mt-2 font-display text-2xl leading-tight">
                  Music for the drive home at 2am.
                </p>
                <div className="mt-4 flex gap-1.5">
                  <span className="h-1.5 w-8 rounded-full bg-chalk/70" />
                  <span className="h-1.5 w-4 rounded-full bg-chalk/40" />
                  <span className="h-1.5 w-4 rounded-full bg-chalk/40" />
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 flex origin-top-right -rotate-[10deg] flex-col justify-between rounded-2xl border border-ink/10 bg-chalk p-6 shadow-xl transition-transform duration-500 ease-out hover:-rotate-[16deg]"
              style={{ transformOrigin: "88% 8%" }}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  your story
                </p>
                <div className="mt-4 space-y-2">
                  <div className="h-2.5 w-3/4 rounded-full bg-ink/10" />
                  <div className="h-2.5 w-full rounded-full bg-ink/10" />
                  <div className="h-2.5 w-2/3 rounded-full bg-ink/10" />
                  <div className="h-2.5 w-5/6 rounded-full bg-ink/10" />
                </div>
              </div>
              <div className="corner-fold h-10 w-10 self-end rounded-tl-2xl bg-chalk-dim" />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-ink-soft/70">
            Peel back the story. Find the website underneath.
          </p>
        </div>
      </Container>
    </section>
  );
}
