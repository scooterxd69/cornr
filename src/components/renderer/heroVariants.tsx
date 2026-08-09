import { SiteSpec } from "@/types/site";
import { ThemeTokens } from "@/lib/themes";

interface HeroProps {
  spec: SiteSpec;
  theme: ThemeTokens;
}

/** Midnight — a single centered spotlight, like a plaque under a museum light. */
export function SpotlightHero({ spec, theme }: HeroProps) {
  return (
    <header className="relative overflow-hidden px-6 pt-28 pb-24 sm:pt-36 sm:pb-32 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${theme.accent}22, transparent)` }}
      />
      <div className="relative mx-auto max-w-2xl">
        <p
          className="mb-5 text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          {spec.site.mood}
        </p>
        <h1
          className="text-balance text-4xl sm:text-6xl leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {spec.hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base sm:text-lg" style={{ color: "var(--muted)" }}>
          {spec.hero.subheadline}
        </p>
        <a
          href="#about"
          className="mt-9 inline-block rounded-sm px-7 py-3 text-sm font-medium"
          style={{ background: "var(--accent)", color: "var(--accent-text)" }}
        >
          {spec.hero.cta}
        </a>
      </div>
    </header>
  );
}

/** Aurora — asymmetric split with a glowing gradient mesh panel. */
export function GradientSplitHero({ spec, theme }: HeroProps) {
  return (
    <header className="relative grid gap-10 overflow-hidden px-6 pt-24 pb-20 sm:grid-cols-5 sm:px-12 sm:pt-32 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(600px circle at 20% 20%, ${theme.accent}33, transparent 60%), radial-gradient(500px circle at 80% 60%, #ff6ea822, transparent 60%)`
        }}
      />
      <div className="relative sm:col-span-3 flex flex-col justify-center">
        <p className="mb-4 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
          {spec.site.mood}
        </p>
        <h1 className="text-4xl sm:text-5xl leading-[1.08]" style={{ fontFamily: "var(--font-display)" }}>
          {spec.hero.headline}
        </h1>
        <p className="mt-5 max-w-md text-base sm:text-lg" style={{ color: "var(--muted)" }}>
          {spec.hero.subheadline}
        </p>
        <a
          href="#about"
          className="mt-8 inline-block w-fit rounded-2xl px-6 py-3 text-sm font-medium backdrop-blur"
          style={{ background: "var(--accent)", color: "var(--accent-text)" }}
        >
          {spec.hero.cta}
        </a>
      </div>
      <div className="relative sm:col-span-2 flex items-center justify-center">
        <div
          className="h-56 w-56 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] blur-[2px]"
          style={{ background: `conic-gradient(from 120deg, ${theme.accent}, #ff6ea8, ${theme.accent})`, opacity: 0.55 }}
        />
      </div>
    </header>
  );
}

/** Editorial — stacked masthead like a magazine cover, no imagery, all type. */
export function EditorialStackHero({ spec, theme }: HeroProps) {
  return (
    <header className="px-6 pt-20 pb-16 sm:px-10 sm:pt-28">
      <div className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
          {spec.site.title} &middot; {spec.site.mood}
        </p>
      </div>
      <h1
        className="mt-8 max-w-3xl text-4xl sm:text-6xl leading-[1.05]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {spec.hero.headline}
      </h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <p className="max-w-md text-base sm:text-lg" style={{ color: "var(--muted)" }}>
          {spec.hero.subheadline}
        </p>
        <a
          href="#about"
          className="w-fit border-b-2 pb-1 text-sm font-medium"
          style={{ borderColor: "var(--accent)", color: "var(--text)" }}
        >
          {spec.hero.cta} &rarr;
        </a>
      </div>
    </header>
  );
}

/** Cyber — a terminal-window framed grid, tags styled like status readouts. */
export function TerminalGridHero({ spec, theme }: HeroProps) {
  return (
    <header className="px-6 pt-20 pb-16 sm:px-12 sm:pt-28">
      <div
        className="mx-auto max-w-3xl rounded-sm border"
        style={{ borderColor: "var(--border)", background: "var(--bg2)" }}
      >
        <div
          className="flex items-center gap-2 border-b px-4 py-2.5 text-xs"
          style={{ borderColor: "var(--border)", fontFamily: "var(--font-mono)", color: "var(--muted)" }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: theme.accent }} />
          {spec.site.title.toLowerCase().replace(/\s+/g, "-")}.site
        </div>
        <div className="p-6 sm:p-10">
          <p className="text-xs" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
            &gt; whoami
          </p>
          <h1
            className="mt-3 text-3xl sm:text-5xl leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {spec.hero.headline}
          </h1>
          <p className="mt-4 max-w-lg text-sm sm:text-base" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
            {spec.hero.subheadline}
          </p>
          <a
            href="#about"
            className="mt-7 inline-block rounded-sm px-5 py-2.5 text-sm"
            style={{ background: "var(--accent)", color: "var(--accent-text)", fontFamily: "var(--font-mono)" }}
          >
            {spec.hero.cta} _
          </a>
        </div>
      </div>
    </header>
  );
}

/** Dream — soft floating blur shapes behind a gentle, off-center headline. */
export function SoftOrbitHero({ spec, theme }: HeroProps) {
  return (
    <header className="relative overflow-hidden px-6 pt-24 pb-20 sm:px-14 sm:pt-32">
      <div
        className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full blur-3xl"
        style={{ background: theme.accent, opacity: 0.35 }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "#8CD9D9", opacity: 0.3 }}
      />
      <div className="relative max-w-xl">
        <p className="mb-4 text-sm italic" style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>
          {spec.site.mood}
        </p>
        <h1
          className="text-4xl sm:text-6xl leading-[1.1]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {spec.hero.headline}
        </h1>
        <p className="mt-6 text-base sm:text-lg" style={{ color: "var(--muted)" }}>
          {spec.hero.subheadline}
        </p>
        <a
          href="#about"
          className="mt-8 inline-block rounded-full px-7 py-3 text-sm font-medium"
          style={{ background: "var(--accent)", color: "var(--accent-text)" }}
        >
          {spec.hero.cta}
        </a>
      </div>
    </header>
  );
}

/** Studio — a bold blocked-out layout like a design-studio homepage. */
export function StudioBlockHero({ spec, theme }: HeroProps) {
  return (
    <header className="grid gap-0 border-b sm:grid-cols-[2fr_1fr]" style={{ borderColor: "var(--border)" }}>
      <div className="px-6 py-20 sm:px-12 sm:py-28">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
          {spec.site.title}
        </p>
        <h1
          className="max-w-xl text-4xl sm:text-6xl leading-[1.05] font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {spec.hero.headline}
        </h1>
        <p className="mt-6 max-w-md text-base sm:text-lg" style={{ color: "var(--muted)" }}>
          {spec.hero.subheadline}
        </p>
        <a
          href="#about"
          className="mt-8 inline-block px-6 py-3 text-sm font-medium"
          style={{ background: "var(--accent)", color: "var(--accent-text)", borderRadius: "var(--radius)" }}
        >
          {spec.hero.cta}
        </a>
      </div>
      <div
        className="hidden sm:flex items-center justify-center p-10"
        style={{ background: "var(--bg2)" }}
      >
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-16"
              style={{
                background: i % 2 === 0 ? theme.accent : "transparent",
                border: `1px solid var(--border)`,
                borderRadius: "var(--radius)"
              }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
