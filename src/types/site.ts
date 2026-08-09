export type SiteMode = "portfolio" | "vibe";

export type ThemeId =
  | "midnight"
  | "aurora"
  | "editorial"
  | "cyber"
  | "dream"
  | "studio";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  tags?: string[];
  url?: string;
}

export interface ExperienceItem {
  role: string;
  place: string;
  period?: string;
  description?: string;
}

export interface CustomSection {
  /** Only used in Vibe mode for things like "Current obsession", "Mood", "Fun facts" */
  id: string;
  title: string;
  kind: "text" | "list" | "quote";
  content: string | string[];
  icon?: string;
}

export interface SiteSpec {
  site: {
    title: string;
    tagline: string;
    description: string;
    theme: ThemeId;
    mood: string;
    accent: string;
    background: "light" | "dark";
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  about: string;
  skills: string[];
  projects: ProjectItem[];
  achievements: string[];
  interests: string[];
  experience: ExperienceItem[];
  education: string[];
  socials: SocialLink[];
  sections: CustomSection[];
  design: {
    layout: "centered" | "split" | "grid" | "editorial-columns" | "asymmetric";
    animation: "subtle" | "energetic" | "minimal";
    typography: "serif" | "sans" | "mono" | "display-heavy";
    visualStyle: string;
  };
}

export interface OnboardingInput {
  name: string;
  about: string;
  interests: string[];
  achievements: string;
  links: SocialLink[];
  personality: string; // 'minimal' | 'futuristic' | ... | 'ai-decide'
  mode: SiteMode;
  age?: string;
  education?: string;
  skills?: string;
  favoriteColors?: string;
  favoriteMusic?: string;
  photoDescription?: string;
  extra?: string;
}
