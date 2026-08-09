import { Container, Eyebrow, LinkButton } from "@/components/ui/atoms";
import { DEMO_PROFILES } from "@/lib/demoData";
import PreviewCard from "@/components/renderer/PreviewCard";

export default function ExamplesGallery() {
  const featured = DEMO_PROFILES.slice(0, 3);
  return (
    <section className="border-t border-ink/10 py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-lg">
            <Eyebrow>Real range, real output</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl text-balance">
              Six themes. Two modes. Nothing generic.
            </h2>
          </div>
          <LinkButton href="/examples" variant="ghost">
            See all examples
          </LinkButton>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {featured.map((demo) => (
            <PreviewCard key={demo.id} demo={demo} />
          ))}
        </div>
      </Container>
    </section>
  );
}
