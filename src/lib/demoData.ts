import { SiteSpec } from "@/types/site";

export interface DemoProfile { id: string; label: string; spec: SiteSpec; }

/** Intentionally fictional showcase profiles — content demonstrates different Cornr directions. */
export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: "naitik", label: "Naitik · Student / Creator",
    spec: {
      site: { title: "Naitik", tagline: "Technology, curiosity, and things made after midnight.", description: "A fictional student creator demo made with Cornr.", theme: "cyber", mood: "future-facing and curious", accent: "#75F6C1", background: "dark" },
      hero: { headline: "I make small ideas feel like portals.", subheadline: "Student / creator exploring technology, design and the joy of starting before I feel ready.", cta: "Enter my world" },
      about: "This is a fictional Cornr showcase profile for a student creator who likes creative code, strange interfaces and building tiny experiments in public.",
      skills: ["Creative coding", "TypeScript", "Product thinking", "Visual systems"], projects: [{ name: "Signal Garden", description: "A speculative digital garden for collecting unfinished ideas.", tags: ["Web", "Experiment"] }, { name: "Corner Notes", description: "A pocket-sized publishing ritual for small daily observations.", tags: ["Design", "Writing"] }],
      achievements: [], interests: ["Creative technology", "Interface design", "Ambient music", "Making lists"], experience: [], education: ["Learning out loud"], socials: [{ platform: "GitHub", url: "https://github.com" }, { platform: "Instagram", url: "https://instagram.com" }], sections: [{ id: "currently", title: "Currently", kind: "text", content: "Collecting references for a website that feels more like a place than a page." }],
      design: { layout: "asymmetric", animation: "energetic", typography: "mono", visualStyle: "cinematic cyber studio with subtle luminous depth" }
    }
  },
  {
    id: "alisha", label: "Alisha · Social Media Handler",
    spec: {
      site: { title: "Alisha", tagline: "Culture-aware social spaces with a little sparkle.", description: "A fictional social media handler demo made with Cornr.", theme: "dream", mood: "bright, stylish, connected", accent: "#FF91BE", background: "light" },
      hero: { headline: "Making the scroll feel a little more human.", subheadline: "Social media handler with an eye for what people stop for — and why.", cta: "See the moodboard" },
      about: "This fictional Cornr demo profile is built for a social media handler who brings equal parts visual instinct, community warmth and sharp editorial taste.",
      skills: ["Social strategy", "Content direction", "Community voice", "Trend research"], projects: [{ name: "Sunday Studio", description: "A sample content world built around soft launches and thoughtful storytelling.", tags: ["Social", "Campaign"] }, { name: "The Reply Club", description: "A playful framework for turning comments into conversation.", tags: ["Community"] }],
      achievements: [], interests: ["Beauty references", "Pop culture", "Street photography", "Great captions"], experience: [], education: [], socials: [{ platform: "Instagram", url: "https://instagram.com" }, { platform: "LinkedIn", url: "https://linkedin.com" }], sections: [{ id: "mood", title: "The mood", kind: "quote", content: "Good social should feel like being let in on something." }],
      design: { layout: "editorial-columns", animation: "subtle", typography: "display-heavy", visualStyle: "editorial social scrapbook with warm depth and motion" }
    }
  },
  {
    id: "shreyansh", label: "Shreyansh · Therapist",
    spec: {
      site: { title: "Shreyansh", tagline: "A quieter place to pause and understand.", description: "A fictional therapist demo made with Cornr.", theme: "midnight", mood: "calm, grounded, thoughtful", accent: "#D9B978", background: "dark" },
      hero: { headline: "There is room to arrive exactly as you are.", subheadline: "Therapist creating a calm, human space for reflection and conversation.", cta: "A gentle introduction" },
      about: "This fictional Cornr demo profile imagines a therapist’s digital welcome: unhurried, clear and rooted in the belief that every story deserves attention.",
      skills: ["Reflective listening", "Mindful practice", "Conversation design", "Psychoeducation"], projects: [], achievements: [], interests: ["Long walks", "Journaling", "Quiet mornings", "Thoughtful books"], experience: [], education: [], socials: [{ platform: "LinkedIn", url: "https://linkedin.com" }], sections: [{ id: "approach", title: "A small note", kind: "text", content: "This demo is not a clinical service. It is a study in how a personal website can feel safe, clear and genuinely welcoming." }, { id: "quote", title: "A reminder", kind: "quote", content: "You do not have to have it all figured out to begin." }],
      design: { layout: "centered", animation: "minimal", typography: "serif", visualStyle: "warm midnight sanctuary with restrained gold light" }
    }
  }
];

export function getDemoById(id: string): DemoProfile | undefined { return DEMO_PROFILES.find((d) => d.id === id); }
