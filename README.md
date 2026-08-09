# Cornr

**Turn yourself into a website.**

Cornr is an AI personal website builder. You answer a handful of short
prompts about yourself, and Nemotron (via NVIDIA's API) turns that into a
genuinely designed personal website — not a template with your name swapped
in.

Two modes:

- **Portfolio** — for students, developers, designers, freelancers. Built
  around skills, projects, experience, education, achievements.
- **Vibe** — for everyone else. A personal corner built around personality,
  interests, and aesthetic. No resume required.

---

## Features

- 7-step onboarding flow that adapts to Portfolio or Vibe mode
- One AI call produces a complete, structured site specification (JSON) —
  the model never writes HTML/CSS/JS directly
- Six structurally distinct themes (Midnight, Aurora, Editorial, Cyber,
  Dream, Studio) — different layouts and compositions, not just recolored
  templates
- Sections only render when there's real content — no empty "Projects"
  block if you didn't add any projects
- Live preview with desktop/tablet/mobile viewport switching
- In-place editor for direct field edits (title, headline, about, accent
  color, skills, interests, projects, social links, theme)
- Natural-language AI command box ("make it more futuristic", "make the
  colors darker") that edits the site spec in place
- "Change Style" (AI picks a different theme/layout, same content) and
  "Regenerate" (fresh AI pass from your original answers)
- Static HTML export/"Publish" — a portable, self-contained file you can
  host anywhere
- Server-side-only AI calls — your NVIDIA API key never reaches the browser
- Basic per-IP rate limiting on generation and editing
- Safe JSON parsing with an automatic one-shot repair retry if the model's
  output doesn't validate

---

## Architecture

```
Onboarding answers
        │
        ▼
POST /api/generate  (server-only route)
        │  builds a system + user prompt
        │  calls NVIDIA Nemotron (streamed, accumulated server-side)
        │  validates the JSON response against a Zod schema
        │  on invalid JSON: one repair-prompt retry
        ▼
   SiteSpec (structured JSON — content + design *parameters*, not markup)
        │
        ▼
  <SiteRenderer />  (controlled React renderer)
        │  maps theme id → design tokens (colors, fonts, hero layout, card
        │  style, texture) and renders real components
        ▼
   Rendered personal website
```

The AI never generates executable frontend code. It returns content and a
small set of design parameters (theme, layout, animation style, typography,
accent color); a fixed set of React components does the actual rendering.
This keeps output safe, consistent, and easy to extend — adding a seventh
theme means adding one token object and (optionally) one hero layout
component, not touching the AI pipeline at all.

### Why this matters for security

Because the model's output is always validated against a strict schema and
rendered through fixed components, nothing the AI returns can inject scripts,
alter the DOM outside the intended sections, or execute arbitrary code. Worst
case, a malformed response gets one repair attempt and then a friendly error
— it never reaches the page unvalidated.

### Project structure

```
cornr/
├── README.md
├── .gitignore
├── .env.example
├── package.json
├── src/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── create/page.tsx     # 7-step onboarding wizard
│   │   ├── studio/page.tsx     # Live preview + editor + AI command box
│   │   ├── examples/page.tsx   # Demo gallery
│   │   └── api/
│   │       ├── generate/route.ts   # One-shot site generation
│   │       ├── edit/route.ts       # AI command box / natural-language edits
│   │       └── export/route.ts     # Static HTML publishing
│   ├── components/
│   │   ├── landing/    # Landing page sections
│   │   ├── onboarding/ # Wizard steps
│   │   ├── editor/     # Studio editor panel, AI command box, viewport toggle
│   │   ├── renderer/   # SiteRenderer + the 6 hero layout variants
│   │   └── ui/         # Shared buttons, layout atoms
│   ├── lib/
│   │   ├── nvidia.ts       # Server-only NVIDIA client (never import client-side)
│   │   ├── prompt.ts       # System/user prompt builders
│   │   ├── schema.ts       # Zod schema + safe JSON parsing/repair
│   │   ├── inputSchema.ts  # Onboarding input validation
│   │   ├── themes.ts       # The 6 theme token definitions
│   │   ├── demoData.ts     # 7 polished demo profiles
│   │   ├── rateLimit.ts    # In-memory rate limiter
│   │   ├── staticExport.ts # Publish/export HTML generator
│   │   └── siteContext.tsx # Client-side state for the current generated site
│   └── types/site.ts   # Core SiteSpec / OnboardingInput types
└── public/
```

---

## Local installation

Requires Node.js 18.18+.

```bash
npm install
```

## NVIDIA API setup

Cornr calls NVIDIA's OpenAI-compatible endpoint for `nvidia/nemotron-3-ultra-550b-a55b`.

1. Get your own API key at [build.nvidia.com](https://build.nvidia.com).
2. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
3. Add your key to `.env`:
   ```
   NVIDIA_API_KEY=your_key_here
   ```

The key is read only in `src/lib/nvidia.ts`, a server-only module. It is
never sent to the browser, never included in the client bundle, and never
logged. `.env` is gitignored — don't commit it.

> **Never commit an API key.** If a key is ever pasted into a chat, a
> document, a commit, or anywhere else outside your local `.env`, treat it
> as compromised and regenerate it.

## Development

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Environment variables

| Variable          | Required | Description                              |
| ------------------ | -------- | ----------------------------------------- |
| `NVIDIA_API_KEY`   | Yes      | Server-side key for NVIDIA's Nemotron API |

---

## How the AI generation pipeline works

1. The onboarding wizard collects name, about text, interests, achievements,
   links, a personality/style preference, and mode (Portfolio/Vibe), plus
   optional extras (age, education, skills, favorite colors/music, etc).
2. `POST /api/generate` validates that input, checks a per-IP rate limit,
   and builds one system prompt + one user prompt.
3. The system prompt instructs the model to return **only** a JSON object
   matching the `SiteSpec` schema — no markup, no prose.
4. The request goes to NVIDIA's `/v1/chat/completions` endpoint with
   streaming enabled server-side; the route accumulates the full response
   before returning anything, since a complete JSON object is needed before
   it can be validated.
5. The response is parsed defensively (`extractJsonBlock` strips markdown
   fences/stray prose) and validated against a Zod schema.
6. If validation fails, one repair prompt is sent back to the model with the
   original output and the error message, asking for a corrected JSON
   object. If that also fails, the user sees a friendly error, not a stack
   trace.
7. A valid `SiteSpec` is handed to `<SiteRenderer />`, which maps the theme
   id to design tokens and renders the real website.
8. The AI command box and "Change Style" button reuse the same
   validate-and-repair path through `POST /api/edit`, sending the current
   spec plus a natural-language instruction and expecting the full updated
   spec back.

Only one API request is made per generation and per edit — there's no
separate call per section (about/skills/projects/etc). Regeneration only
happens when the user explicitly clicks Regenerate, Change Style, or submits
an AI command.

---

## Publishing

The MVP publishing model is a clean static export: **Publish** in the studio
calls `POST /api/export`, which renders the current `SiteSpec` into a single
self-contained HTML file (inline CSS, no build step, no external JS) and
downloads it. That file can be hosted anywhere — GitHub Pages, Netlify,
Cloudflare Pages, S3, or a plain web server.

This is intentionally isolated from the live editor/renderer
(`src/lib/staticExport.ts` doesn't share components with
`src/components/renderer/`) so that a future dynamic hosting layer — for
example `cornr.app/u/naitik` or `naitik.cornr.app`, backed by accounts and a
database — can be added without touching the generation pipeline or the
editor. The intended upgrade path:

1. Add accounts + a database (site specs are already plain JSON — trivial to
   persist).
2. Add a route like `app/u/[username]/page.tsx` that fetches a saved spec
   and renders it through the existing `<SiteRenderer />` server-side.
3. Point `Publish` at "save + get a URL" instead of "download a file", with
   the static export kept as a secondary "download a copy" option.

---

## Security

- NVIDIA API access is entirely server-side (`src/lib/nvidia.ts`); the key
  is read from `process.env.NVIDIA_API_KEY` and never appears in any client
  bundle, HTML, or log.
- All onboarding input and edit instructions are validated (length limits,
  required fields) with Zod before being sent to the model.
- All AI output is validated against a strict schema before it's ever
  rendered; invalid output gets one repair attempt, then a safe error.
- The AI never returns executable code — only structured content and a
  small enum of design parameters — so there's no code-injection surface
  from model output.
- Basic per-IP rate limiting (8 requests/hour by default) on both
  `/api/generate` and `/api/edit`. This is in-memory and per-instance —
  swap in Redis (e.g. Upstash) behind the same `checkRateLimit` function
  signature before scaling past a single server instance.
- No API keys, secrets, or personal data are included in this repository or
  its `.env.example`.

---

## A note on the demo build environment

This project was generated in a sandboxed environment without outbound
network access, so `npm install` and `npm run build` could not be executed
or verified here. The code has been written carefully against the pinned
dependency versions in `package.json`, but please run `npm install && npm
run build` locally as your first step and open an issue/fix any version
drift you hit — most likely candidates are minor API differences in
`next@14.2.15` or `tailwindcss@3.4.13` if npm resolves slightly different
patch versions.

---

## Roadmap (explicitly out of scope for this MVP)

- Accounts and permanent hosted URLs (`cornr.app/u/username`)
- Payments / paid tiers
- Analytics
- Real photo upload + storage
- Custom domains
