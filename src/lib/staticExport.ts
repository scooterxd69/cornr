import { SiteSpec } from "@/types/site";
import { THEMES } from "@/lib/themes";

function esc(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resolveAccent(candidate: string, fallback: string): string {
  const trimmed = candidate.trim();
  const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed);
  const isNamedColor = /^[a-z]+$/i.test(trimmed) && trimmed.length < 24;
  return isHex || isNamedColor ? trimmed : fallback;
}

function chipList(items: string[]): string {
  return items.map((i) => `<span class="chip">${esc(i)}</span>`).join("");
}

/**
 * Renders a self-contained static HTML document for a site spec. This is the
 * "publish" artifact for the MVP: a single portable file with inlined CSS
 * and no build step, that can be hosted anywhere. It intentionally mirrors
 * the live React renderer's visual language rather than sharing components,
 * so the publishing pipeline stays isolated and easy to swap out later
 * (e.g. for per-user hosted URLs) without touching the live editor/renderer.
 */
export function renderStaticSite(spec: SiteSpec): string {
  const t = THEMES[spec.site.theme];
  const accent = resolveAccent(spec.site.accent, t.accent);

  const sectionsHtml = spec.sections
    .map((s) => {
      const body =
        s.kind === "list" && Array.isArray(s.content)
          ? `<ul class="plain-list">${s.content.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`
          : s.kind === "quote"
          ? `<blockquote>${esc(String(s.content))}</blockquote>`
          : `<p>${esc(String(s.content))}</p>`;
      return `<section class="block"><h3>${esc(s.title)}</h3>${body}</section>`;
    })
    .join("\n");

  const projectsHtml = spec.projects.length
    ? `<section class="block"><h2>Projects</h2><div class="grid">${spec.projects
        .map(
          (p) => `<article class="card">
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.description)}</p>
            ${p.tags?.length ? `<div class="chips">${chipList(p.tags)}</div>` : ""}
            ${p.url ? `<a class="link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">View →</a>` : ""}
          </article>`
        )
        .join("\n")}</div></section>`
    : "";

  const skillsHtml = spec.skills.length
    ? `<section class="block"><h2>Skills</h2><div class="chips">${chipList(spec.skills)}</div></section>`
    : "";

  const achievementsHtml = spec.achievements.length
    ? `<section class="block"><h2>Achievements</h2><ul class="plain-list">${spec.achievements
        .map((a) => `<li>${esc(a)}</li>`)
        .join("")}</ul></section>`
    : "";

  const experienceHtml = spec.experience.length
    ? `<section class="block"><h2>Experience</h2>${spec.experience
        .map(
          (e) => `<div class="exp-row">
            <div><strong>${esc(e.role)}</strong> — ${esc(e.place)}</div>
            ${e.period ? `<div class="muted">${esc(e.period)}</div>` : ""}
            ${e.description ? `<p>${esc(e.description)}</p>` : ""}
          </div>`
        )
        .join("\n")}</section>`
    : "";

  const educationHtml = spec.education.length
    ? `<section class="block"><h2>Education</h2><ul class="plain-list">${spec.education
        .map((e) => `<li>${esc(e)}</li>`)
        .join("")}</ul></section>`
    : "";

  const interestsHtml = spec.interests.length
    ? `<section class="block"><h2>Interests</h2><div class="chips">${chipList(spec.interests)}</div></section>`
    : "";

  const socialsHtml = spec.socials.length
    ? `<div class="socials">${spec.socials
        .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.platform)}</a>`)
        .join("")}</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(spec.site.title)} — ${esc(spec.site.tagline)}</title>
<meta name="description" content="${esc(spec.site.description)}" />
<meta property="og:title" content="${esc(spec.site.title)}" />
<meta property="og:description" content="${esc(spec.site.description)}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary" />
<style>
  :root {
    --bg: ${t.bg};
    --bg2: ${t.bgSecondary};
    --text: ${t.text};
    --muted: ${t.textMuted};
    --accent: ${accent};
    --accent-text: ${t.accentText};
    --border: ${t.border};
    --radius: ${t.radius};
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: ${t.fontBody};
    line-height: 1.6;
  }
  h1, h2, h3 { font-family: ${t.fontDisplay}; font-weight: 600; line-height: 1.15; }
  .wrap { max-width: 880px; margin: 0 auto; padding: 6vw 24px 80px; }
  .hero { padding: 12vw 0 6vw; }
  .eyebrow { color: var(--accent); font-family: ${t.fontMono}; letter-spacing: 0.08em; text-transform: uppercase; font-size: 13px; }
  h1.headline { font-size: clamp(2rem, 6vw, 3.6rem); margin: 12px 0 16px; }
  .sub { color: var(--muted); font-size: 1.1rem; max-width: 640px; }
  .cta { display: inline-block; margin-top: 28px; padding: 12px 22px; background: var(--accent); color: var(--accent-text); border-radius: var(--radius); text-decoration: none; font-weight: 600; }
  .block { padding: 48px 0; border-top: 1px solid var(--border); }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  .chip { border: 1px solid var(--border); border-radius: 999px; padding: 6px 14px; font-size: 13px; font-family: ${t.fontMono}; color: var(--text); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 20px; }
  .card { border: 1px solid var(--border); border-radius: var(--radius); padding: 22px; background: var(--bg2); }
  .card h3 { margin: 0 0 8px; font-size: 1.1rem; }
  .card .link { color: var(--accent); text-decoration: none; font-size: 14px; }
  .plain-list { padding-left: 20px; }
  .plain-list li { margin-bottom: 8px; }
  .exp-row { margin-bottom: 20px; }
  .muted { color: var(--muted); font-size: 14px; }
  .socials { display: flex; gap: 18px; margin-top: 20px; flex-wrap: wrap; }
  .socials a { color: var(--text); text-decoration: none; border-bottom: 1px solid var(--accent); padding-bottom: 2px; }
  blockquote { font-family: ${t.fontDisplay}; font-size: 1.4rem; font-style: italic; border-left: 3px solid var(--accent); padding-left: 20px; margin: 12px 0; }
  footer { padding: 40px 0; color: var(--muted); font-size: 13px; text-align: center; }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
</style>
</head>
<body>
  <div class="wrap">
    <header class="hero">
      <div class="eyebrow">${esc(spec.site.mood)}</div>
      <h1 class="headline">${esc(spec.hero.headline)}</h1>
      <p class="sub">${esc(spec.hero.subheadline)}</p>
      <a class="cta" href="#about">${esc(spec.hero.cta)}</a>
    </header>

    <section class="block" id="about">
      <h2>About</h2>
      <p>${esc(spec.about)}</p>
    </section>

    ${skillsHtml}
    ${projectsHtml}
    ${experienceHtml}
    ${educationHtml}
    ${achievementsHtml}
    ${interestsHtml}
    ${sectionsHtml}

    ${socialsHtml ? `<section class="block"><h2>Elsewhere</h2>${socialsHtml}</section>` : ""}

    <footer>Made with Cornr — turn yourself into a website.</footer>
  </div>
</body>
</html>`;
}
