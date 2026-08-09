import { OnboardingInput } from "@/types/site";

const SCHEMA_SHAPE = `{
  "site": { "title": string, "tagline": string, "description": string,
             "theme": "midnight"|"aurora"|"editorial"|"cyber"|"dream"|"studio",
             "mood": string, "accent": string (hex or named color),
             "background": "light"|"dark" },
  "hero": { "headline": string, "subheadline": string, "cta": string },
  "about": string,
  "skills": string[],
  "projects": [{ "name": string, "description": string, "tags": string[], "url"?: string }],
  "achievements": string[],
  "interests": string[],
  "experience": [{ "role": string, "place": string, "period"?: string, "description"?: string }],
  "education": string[],
  "socials": [{ "platform": string, "url": string }],
  "sections": [{ "id": string, "title": string, "kind": "text"|"list"|"quote", "content": string | string[], "icon"?: string }],
  "design": { "layout": "centered"|"split"|"grid"|"editorial-columns"|"asymmetric",
              "animation": "subtle"|"energetic"|"minimal",
              "typography": "serif"|"sans"|"mono"|"display-heavy",
              "visualStyle": string }
}`;

export function buildSystemPrompt(): string {
  return `You are the content-and-design brain behind Cornr, a product that turns a short
description of a person into a personal website. You NEVER generate HTML, CSS, or
JavaScript. You ONLY return a single strict JSON object matching the schema you are
given. A separate renderer turns your JSON into the actual website, so your job is to
choose great content and great design *parameters*, not markup.

Rules:
- Output ONLY the JSON object. No prose, no markdown fences, no explanation.
- Every string must be tasteful, specific, and human — never generic filler like
  "Passionate professional seeking opportunities."
- Omit array items you don't have material for rather than inventing filler. Empty
  arrays are fine and expected when the person gave you nothing for that category.
- In "vibe" mode, prefer the flexible "sections" array for unusual content like
  "Current obsession", "Mood", "Quote", "Fun facts" instead of stretching skills/
  achievements/experience to fit content that doesn't belong there.
- In "portfolio" mode, prioritize skills, projects, experience, education and
  achievements; keep "sections" minimal or empty.
- Pick the single theme (from the enum) and layout that best fit the person's
  personality preference and their content — don't default to the same theme
  every time.
- Keep headline/tagline short and quotable. Avoid corporate buzzwords.
- Respond in the same language the person wrote their "about" text in.

Return JSON matching exactly this shape (types shown, not literal keys to copy blindly):
${SCHEMA_SHAPE}`;
}

export function buildUserPrompt(input: OnboardingInput): string {
  const lines: string[] = [];
  lines.push(`Name: ${input.name}`);
  lines.push(`Mode: ${input.mode}`);
  lines.push(`Personality/style preference: ${input.personality}`);
  lines.push(`About (in their own words): ${input.about}`);
  if (input.interests.length) lines.push(`Interests/into: ${input.interests.join(", ")}`);
  if (input.achievements) lines.push(`Achievements: ${input.achievements}`);
  if (input.age) lines.push(`Age: ${input.age}`);
  if (input.education) lines.push(`Education: ${input.education}`);
  if (input.skills) lines.push(`Skills: ${input.skills}`);
  if (input.favoriteColors) lines.push(`Favorite colors: ${input.favoriteColors}`);
  if (input.favoriteMusic) lines.push(`Favorite music/artists: ${input.favoriteMusic}`);
  if (input.photoDescription) lines.push(`Photo/appearance notes: ${input.photoDescription}`);
  if (input.extra) lines.push(`Anything else: ${input.extra}`);
  if (input.links.length) {
    lines.push(`Links: ${input.links.map((l) => `${l.platform}: ${l.url}`).join(", ")}`);
  }
  lines.push(
    "",
    "Generate the complete JSON site specification now, in one shot, following the schema exactly."
  );
  return lines.join("\n");
}

export function buildRepairPrompt(brokenResponse: string, errorMessage: string): string {
  return `Your previous response could not be parsed as valid JSON matching the required
schema. Error: ${errorMessage}

Here is what you returned:
---
${brokenResponse.slice(0, 4000)}
---

Return ONLY a corrected, complete, strictly valid JSON object matching the schema.
No prose, no markdown fences.`;
}

export function buildEditSystemPrompt(): string {
  return `You are the content-and-design brain behind Cornr. You are given the current JSON
site specification for someone's personal website and a short instruction for how to
change it (e.g. "make it more futuristic", "make the colors darker", "make this feel
more like me"). Apply the instruction and return the FULL updated JSON object, same
schema, with every field present (carry over anything unaffected by the instruction
unchanged). Output ONLY the JSON object, no prose, no markdown fences.

Schema:
${SCHEMA_SHAPE}`;
}

export function buildEditUserPrompt(currentSpecJson: string, instruction: string): string {
  return `Current site specification:
${currentSpecJson}

Instruction: "${instruction}"

Return the full updated JSON object now.`;
}
