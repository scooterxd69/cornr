import { ThemeId } from "@/types/site";

export interface ThemeTokens {
  id: ThemeId;
  label: string;
  description: string;
  /** Tailwind-friendly raw values so the renderer can inline styles */
  bg: string;
  bgSecondary: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  border: string;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  /** Which hero composition this theme uses — these are structurally different,
   *  not just recolored, per component branches in SiteRenderer. */
  heroVariant: "spotlight" | "gradient-split" | "editorial-stack" | "terminal-grid" | "soft-orbit" | "studio-block";
  cardStyle: "flat" | "glass" | "bordered" | "grid-cell" | "blob" | "block";
  texture: "none" | "grain" | "mesh" | "scanline" | "blur-shapes" | "swatch";
  spacing: "airy" | "dense" | "generous";
  radius: string;
}

export const THEMES: Record<ThemeId, ThemeTokens> = {
  midnight: {
    id: "midnight",
    label: "Midnight",
    description: "Dark, cinematic, premium.",
    bg: "#0B0C10",
    bgSecondary: "#15171D",
    text: "#F3F1EA",
    textMuted: "#9A9BA5",
    accent: "#E8C468",
    accentText: "#0B0C10",
    border: "rgba(243,241,234,0.12)",
    fontDisplay: "'Fraunces', Georgia, serif",
    fontBody: "'Newsreader', Georgia, serif",
    fontMono: "'JetBrains Mono', monospace",
    heroVariant: "spotlight",
    cardStyle: "bordered",
    texture: "grain",
    spacing: "generous",
    radius: "2px"
  },
  aurora: {
    id: "aurora",
    label: "Aurora",
    description: "Gradient-heavy, futuristic, glowing.",
    bg: "#0A0A17",
    bgSecondary: "#12122A",
    text: "#F5F4FF",
    textMuted: "#ABA8D6",
    accent: "#8B7CFF",
    accentText: "#0A0A17",
    border: "rgba(139,124,255,0.25)",
    fontDisplay: "'Sora', ui-sans-serif, sans-serif",
    fontBody: "'Sora', ui-sans-serif, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    heroVariant: "gradient-split",
    cardStyle: "glass",
    texture: "mesh",
    spacing: "airy",
    radius: "20px"
  },
  editorial: {
    id: "editorial",
    label: "Editorial",
    description: "Minimal, typography-focused, elegant.",
    bg: "#FAF9F6",
    bgSecondary: "#F1EFE9",
    text: "#1A1A18",
    textMuted: "#6B6A63",
    accent: "#B5482E",
    accentText: "#FAF9F6",
    border: "rgba(26,26,24,0.14)",
    fontDisplay: "'Fraunces', Georgia, serif",
    fontBody: "'Newsreader', Georgia, serif",
    fontMono: "'JetBrains Mono', monospace",
    heroVariant: "editorial-stack",
    cardStyle: "flat",
    texture: "none",
    spacing: "generous",
    radius: "0px"
  },
  cyber: {
    id: "cyber",
    label: "Cyber",
    description: "Tech-inspired, energetic, modern.",
    bg: "#07090A",
    bgSecondary: "#0F1412",
    text: "#DFFFE8",
    textMuted: "#6FA98A",
    accent: "#39FF88",
    accentText: "#07090A",
    border: "rgba(57,255,136,0.28)",
    fontDisplay: "'Space Grotesk', ui-sans-serif, sans-serif",
    fontBody: "'JetBrains Mono', monospace",
    fontMono: "'JetBrains Mono', monospace",
    heroVariant: "terminal-grid",
    cardStyle: "grid-cell",
    texture: "scanline",
    spacing: "dense",
    radius: "2px"
  },
  dream: {
    id: "dream",
    label: "Dream",
    description: "Soft, atmospheric, artistic.",
    bg: "#F6EFF6",
    bgSecondary: "#EFE4F2",
    text: "#2B2233",
    textMuted: "#7A6C82",
    accent: "#D98CC0",
    accentText: "#2B2233",
    border: "rgba(43,34,51,0.10)",
    fontDisplay: "'DM Serif Display', Georgia, serif",
    fontBody: "'Newsreader', Georgia, serif",
    fontMono: "'JetBrains Mono', monospace",
    heroVariant: "soft-orbit",
    cardStyle: "blob",
    texture: "blur-shapes",
    spacing: "airy",
    radius: "28px"
  },
  studio: {
    id: "studio",
    label: "Studio",
    description: "Professional but creative.",
    bg: "#F4F3EF",
    bgSecondary: "#E7E4DB",
    text: "#151513",
    textMuted: "#5B594F",
    accent: "#2F5D50",
    accentText: "#F4F3EF",
    border: "rgba(21,21,19,0.16)",
    fontDisplay: "'Space Grotesk', ui-sans-serif, sans-serif",
    fontBody: "'Inter', ui-sans-serif, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    heroVariant: "studio-block",
    cardStyle: "block",
    texture: "swatch",
    spacing: "dense",
    radius: "6px"
  }
};

export const THEME_LIST = Object.values(THEMES);
