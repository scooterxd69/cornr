import { z } from "zod";

export const themeIdSchema = z.enum([
  "midnight",
  "aurora",
  "editorial",
  "cyber",
  "dream",
  "studio"
]);

const socialLinkSchema = z.object({
  platform: z.string().min(1).max(40),
  url: z.string().min(1).max(300)
});

const projectItemSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().min(1).max(500),
  tags: z.array(z.string().max(30)).max(8).optional().default([]),
  url: z.string().max(300).optional()
});

const experienceItemSchema = z.object({
  role: z.string().min(1).max(120),
  place: z.string().min(1).max(120),
  period: z.string().max(60).optional(),
  description: z.string().max(400).optional()
});

const customSectionSchema = z.object({
  id: z.string().min(1).max(60),
  title: z.string().min(1).max(60),
  kind: z.enum(["text", "list", "quote"]),
  content: z.union([z.string().max(800), z.array(z.string().max(200)).max(12)]),
  icon: z.string().max(40).optional()
});

export const siteSpecSchema = z.object({
  site: z.object({
    title: z.string().min(1).max(80),
    tagline: z.string().min(1).max(160),
    description: z.string().min(1).max(300),
    theme: themeIdSchema,
    mood: z.string().min(1).max(80),
    accent: z.string().min(1).max(40),
    background: z.enum(["light", "dark"])
  }),
  hero: z.object({
    headline: z.string().min(1).max(140),
    subheadline: z.string().min(1).max(220),
    cta: z.string().min(1).max(40)
  }),
  about: z.string().min(1).max(1200),
  skills: z.array(z.string().max(40)).max(24).default([]),
  projects: z.array(projectItemSchema).max(12).default([]),
  achievements: z.array(z.string().max(200)).max(12).default([]),
  interests: z.array(z.string().max(40)).max(20).default([]),
  experience: z.array(experienceItemSchema).max(10).default([]),
  education: z.array(z.string().max(200)).max(8).default([]),
  socials: z.array(socialLinkSchema).max(10).default([]),
  sections: z.array(customSectionSchema).max(8).default([]),
  design: z.object({
    layout: z.enum(["centered", "split", "grid", "editorial-columns", "asymmetric"]),
    animation: z.enum(["subtle", "energetic", "minimal"]),
    typography: z.enum(["serif", "sans", "mono", "display-heavy"]),
    visualStyle: z.string().min(1).max(200)
  })
});

export type SiteSpecParsed = z.infer<typeof siteSpecSchema>;

/**
 * Attempts to pull a JSON object out of a raw model response, tolerating
 * markdown code fences, leading/trailing prose, or stray whitespace.
 */
export function extractJsonBlock(raw: string): string | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : raw;
  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;
  return candidate.slice(firstBrace, lastBrace + 1);
}

export function safeParseSiteSpec(raw: string) {
  const jsonBlock = extractJsonBlock(raw);
  if (!jsonBlock) {
    return { success: false as const, error: "No JSON object found in response" };
  }
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(jsonBlock);
  } catch (err) {
    return { success: false as const, error: `Invalid JSON: ${(err as Error).message}` };
  }
  const result = siteSpecSchema.safeParse(parsedJson);
  if (!result.success) {
    return { success: false as const, error: result.error.message };
  }
  return { success: true as const, data: result.data };
}
