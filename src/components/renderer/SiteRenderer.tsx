import { CSSProperties } from "react";
import { SiteSpec } from "@/types/site";
import { THEMES } from "@/lib/themes";
import { Chip, SectionHeading, Divider, Muted } from "./atoms";
import {
  SpotlightHero,
  GradientSplitHero,
  EditorialStackHero,
  TerminalGridHero,
  SoftOrbitHero,
  StudioBlockHero
} from "./heroVariants";

const HERO_COMPONENTS = {
  spotlight: SpotlightHero,
  "gradient-split": GradientSplitHero,
  "editorial-stack": EditorialStackHero,
  "terminal-grid": TerminalGridHero,
  "soft-orbit": SoftOrbitHero,
  "studio-block": StudioBlockHero
};

/** Accepts hex (#fff, #ffffff) or a plain CSS named color; anything else
 *  (stray prose, malformed values from an over-eager model) falls back to
 *  the theme's own accent rather than breaking the page. */
function resolveAccent(candidate: string, fallback: string): string {
  const trimmed = candidate.trim();
  const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed);
  const isNamedColor = /^[a-z]+$/i.test(trimmed) && trimmed.length < 24;
  return isHex || isNamedColor ? trimmed : fallback;
}

interface SiteRendererProps {
  spec: SiteSpec;
  /** Scales typography down for thumbnail/preview contexts without changing the DOM structure */
  compact?: boolean;
}

export default function SiteRenderer({ spec, compact = false }: SiteRendererProps) {
  const theme = THEMES[spec.site.theme];
  const HeroComponent = HERO_COMPONENTS[theme.heroVariant];
  const accent = resolveAccent(spec.site.accent, theme.accent);

  const cssVars = {
    "--bg": theme.bg,
    "--bg2": theme.bgSecondary,
    "--text": theme.text,
    "--muted": theme.textMuted,
    "--accent": accent,
    "--accent-text": theme.accentText,
    "--border": theme.border,
    "--font-display": theme.fontDisplay,
    "--font-body": theme.fontBody,
    "--font-mono": theme.fontMono,
    "--radius": theme.radius
  } as CSSProperties;

  return (
    <div
      className={`relative w-full ${compact ? "text-[13px]" : ""} bg-[var(--bg)] text-[var(--text)]`}
      style={{ ...cssVars, fontFamily: "var(--font-body)" }}
    >
      {theme.texture === "grain" && (
        <div className="grain-overlay pointer-events-none absolute inset-0" />
      )}
      {theme.texture === "scanline" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 3px)"
          }}
        />
      )}

      <HeroComponent spec={spec} theme={theme} />

      <main className="mx-auto max-w-4xl px-6 sm:px-10 pb-24">
        <section id="about" className="pt-4">
          <SectionHeading theme={theme}>About</SectionHeading>
          <p className="max-w-2xl text-[15px] sm:text-base leading-relaxed" style={{ color: "var(--text)" }}>
            {spec.about}
          </p>
        </section>

        {spec.skills.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading theme={theme}>Skills</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {spec.skills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </section>
          </>
        )}

        {spec.projects.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading theme={theme}>Projects</SectionHeading>
              <div
                className={
                  theme.cardStyle === "grid-cell"
                    ? "grid gap-px sm:grid-cols-2 border" 
                    : "grid gap-5 sm:grid-cols-2"
                }
                style={theme.cardStyle === "grid-cell" ? { borderColor: "var(--border)", background: "var(--border)" } : undefined}
              >
                {spec.projects.map((p) => (
                  <article
                    key={p.name}
                    className={
                      theme.cardStyle === "glass"
                        ? "rounded-2xl border p-6 backdrop-blur-sm"
                        : theme.cardStyle === "blob"
                        ? "rounded-[28px] border p-6"
                        : theme.cardStyle === "grid-cell"
                        ? "p-6"
                        : "rounded-[var(--radius)] border p-6"
                    }
                    style={{
                      borderColor: "var(--border)",
                      background: theme.cardStyle === "grid-cell" ? "var(--bg)" : "var(--bg2)"
                    }}
                  >
                    <h3 className="mb-2 text-lg" style={{ fontFamily: "var(--font-display)" }}>
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {p.description}
                    </p>
                    {p.tags && p.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <Chip key={tag}>{tag}</Chip>
                        ))}
                      </div>
                    )}
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm font-medium focus-ring"
                        style={{ color: "var(--accent)" }}
                      >
                        View &rarr;
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {spec.experience.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading theme={theme}>Experience</SectionHeading>
              <div className="space-y-6">
                {spec.experience.map((e) => (
                  <div key={`${e.role}-${e.place}`}>
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-medium">{e.role}</span>
                      <Muted>&middot; {e.place}</Muted>
                      {e.period && <Muted>&middot; {e.period}</Muted>}
                    </div>
                    {e.description && (
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                        {e.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {spec.education.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading theme={theme}>Education</SectionHeading>
              <ul className="space-y-2 text-sm">
                {spec.education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </section>
          </>
        )}

        {spec.achievements.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading theme={theme}>Achievements</SectionHeading>
              <ul className="space-y-2 text-sm">
                {spec.achievements.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span style={{ color: "var(--accent)" }}>&#9670;</span>
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {spec.interests.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading theme={theme}>Interests</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {spec.interests.map((i) => (
                  <Chip key={i}>{i}</Chip>
                ))}
              </div>
            </section>
          </>
        )}

        {spec.sections.map((s) => (
          <div key={s.id}>
            <Divider />
            <section>
              <SectionHeading theme={theme}>{s.title}</SectionHeading>
              {s.kind === "quote" ? (
                <blockquote
                  className="max-w-xl border-l-2 pl-5 text-lg italic"
                  style={{ borderColor: "var(--accent)", fontFamily: "var(--font-display)" }}
                >
                  {String(s.content)}
                </blockquote>
              ) : s.kind === "list" && Array.isArray(s.content) ? (
                <ul className="space-y-2 text-sm">
                  {s.content.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              ) : (
                <p className="max-w-2xl text-[15px] leading-relaxed">{String(s.content)}</p>
              )}
            </section>
          </div>
        ))}

        {spec.socials.length > 0 && (
          <>
            <Divider />
            <section>
              <SectionHeading theme={theme}>Elsewhere</SectionHeading>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {spec.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b text-sm font-medium focus-ring"
                    style={{ borderColor: "var(--accent)" }}
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="mt-20 pt-8 border-t text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          Made with{" "}
          <a href="/" className="focus-ring" style={{ color: "var(--accent)" }}>
            Cornr
          </a>
        </div>
      </main>
    </div>
  );
}
