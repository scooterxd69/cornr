import { z } from "zod";

export const socialLinkInputSchema = z.object({
  platform: z.string().min(1).max(40),
  url: z.string().min(1).max(300)
});

export const onboardingInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  about: z.string().min(1, "Tell us a bit about yourself").max(2000),
  interests: z.array(z.string().max(40)).max(20).default([]),
  achievements: z.string().max(600).default(""),
  links: z.array(socialLinkInputSchema).max(10).default([]),
  personality: z.string().max(40).default("ai-decide"),
  mode: z.enum(["portfolio", "vibe"]),
  age: z.string().max(10).optional(),
  education: z.string().max(400).optional(),
  skills: z.string().max(400).optional(),
  favoriteColors: z.string().max(120).optional(),
  favoriteMusic: z.string().max(200).optional(),
  photoDescription: z.string().max(300).optional(),
  extra: z.string().max(1000).optional()
});

export type OnboardingInputParsed = z.infer<typeof onboardingInputSchema>;

export const editRequestSchema = z.object({
  spec: z.unknown(),
  instruction: z.string().min(1).max(300)
});
