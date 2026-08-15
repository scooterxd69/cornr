import { Container, LinkButton } from "@/components/ui/atoms";

export default function FinalCTA() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <Container className="glossy-surface rounded-[2rem] py-14 text-center sm:py-20">
        <h2 className="mx-auto max-w-xl font-display text-3xl sm:text-5xl text-balance">
          Turn yourself into a website.
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-ink-soft">
          It takes about three minutes, and it&apos;s free to try.
        </p>
        <div className="mt-9 flex justify-center">
          <LinkButton href="/create" variant="coral">
            Create My Website
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
