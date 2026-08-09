import { SiteSpec } from "@/types/site";

export interface DemoProfile {
  id: string;
  label: string;
  spec: SiteSpec;
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: "student-dev",
    label: "Student developer",
    spec: {
      site: {
        title: "Naitik Rao",
        tagline: "Building small tools that save people time.",
        description: "CS student and indie hacker who ships fast.",
        theme: "cyber",
        mood: "focused, curious, a little caffeinated",
        accent: "#39FF88",
        background: "dark"
      },
      hero: {
        headline: "I turn late-night ideas into shipped products.",
        subheadline: "Third-year CS student. Building in public. Currently obsessed with local-first apps.",
        cta: "See my work"
      },
      about:
        "I'm a third-year computer science student who'd rather be building than sitting through another lecture on it. Most weekends you'll find me deep in a side project, usually something small enough to ship in a weekend and useful enough that I keep using it myself.",
      skills: ["TypeScript", "React", "Rust", "PostgreSQL", "Figma", "Docker"],
      projects: [
        {
          name: "Fetchly",
          description: "A CLI that turns any API's docs page into typed client code in seconds.",
          tags: ["Rust", "CLI", "DevTools"],
          url: "https://github.com"
        },
        {
          name: "Studyloop",
          description: "Spaced-repetition flashcards for CS courses, used by 400+ students on campus.",
          tags: ["React", "Postgres"],
          url: "https://github.com"
        },
        {
          name: "Nightowl",
          description: "A tiny menu-bar app that tracks how many hours you actually code vs. plan to.",
          tags: ["Swift"]
        }
      ],
      achievements: ["1st place, campus hackathon 2025", "Open source contributor, 200+ PRs merged"],
      interests: ["Local-first software", "Mechanical keyboards", "Lo-fi playlists", "Climbing"],
      experience: [
        { role: "Software Engineering Intern", place: "Small fintech startup", period: "Summer 2025", description: "Built internal tooling used by the whole eng team." }
      ],
      education: ["B.S. Computer Science, in progress"],
      socials: [
        { platform: "GitHub", url: "https://github.com" },
        { platform: "X", url: "https://x.com" }
      ],
      sections: [],
      design: { layout: "grid", animation: "energetic", typography: "mono", visualStyle: "terminal-inspired, monospace accents, matrix-green on black" }
    }
  },
  {
    id: "photographer",
    label: "Photographer",
    spec: {
      site: {
        title: "Mira Solis",
        tagline: "Light, patience, and film.",
        description: "Documentary and portrait photographer based between two coasts.",
        theme: "editorial",
        mood: "quiet, observant, warm",
        accent: "#B5482E",
        background: "light"
      },
      hero: {
        headline: "I photograph the moment before the moment.",
        subheadline: "Documentary and portrait work. Mostly film. Always patient.",
        cta: "View the portfolio"
      },
      about:
        "I've spent the last eight years learning to wait. Photography, for me, is less about catching something and more about being present enough that it catches you. I shoot mostly on film, mostly in available light, and I try never to direct people into being someone they're not.",
      skills: ["35mm & medium format film", "Studio lighting", "Darkroom printing", "Photo editing"],
      projects: [
        { name: "Coastline, Slowly", description: "A three-year project documenting a fishing town before its harbor closes.", tags: ["Documentary"] },
        { name: "Sitting With It", description: "A portrait series of people in the room where they grieve.", tags: ["Portrait"] }
      ],
      achievements: ["Featured, regional photography biennial 2024", "Solo show, downtown gallery, 2023"],
      interests: ["Analog film", "Long walks", "Old cameras", "Tea"],
      experience: [],
      education: [],
      socials: [
        { platform: "Instagram", url: "https://instagram.com" }
      ],
      sections: [],
      design: { layout: "editorial-columns", animation: "minimal", typography: "serif", visualStyle: "gallery-white, hairline rules, generous margins, serif captions" }
    }
  },
  {
    id: "music-producer",
    label: "Music producer",
    spec: {
      site: {
        title: "Tayo Bello",
        tagline: "Bass-heavy, late-night, unfinished on purpose.",
        description: "Producer and mix engineer working in afrobeat-adjacent electronic music.",
        theme: "aurora",
        mood: "hazy, glowing, nocturnal",
        accent: "#8B7CFF",
        background: "dark"
      },
      hero: {
        headline: "Music for the drive home at 2am.",
        subheadline: "Producer & mix engineer. Afrobeat roots, electronic everything else.",
        cta: "Listen"
      },
      about:
        "I make music that sounds like the space between a night ending and a morning starting. Started producing on a cracked laptop at 15, now I mix for artists across three continents without ever leaving my studio.",
      skills: ["Ableton Live", "Mixing & mastering", "Sound design", "Live performance"],
      projects: [
        { name: "Static Bloom EP", description: "A five-track EP exploring texture over melody.", tags: ["EP", "2025"] },
        { name: "Mixed for others", description: "Mix/master credits on 40+ independent releases since 2022.", tags: ["Engineering"] }
      ],
      achievements: ["1M+ streams across platforms", "Featured on a national radio night mix"],
      interests: ["Modular synths", "Vinyl digging", "City nights"],
      experience: [],
      education: [],
      socials: [
        { platform: "Spotify", url: "https://spotify.com" },
        { platform: "Instagram", url: "https://instagram.com" }
      ],
      sections: [
        { id: "now-playing", title: "Currently", kind: "text", content: "Mixing a friend's debut album, way behind schedule, not stressed about it." }
      ],
      design: { layout: "split", animation: "subtle", typography: "sans", visualStyle: "glowing gradient mesh, glassy cards, deep purple night" }
    }
  },
  {
    id: "designer",
    label: "Designer",
    spec: {
      site: {
        title: "Priya Anand",
        tagline: "Systems thinker. Pixel perfectionist.",
        description: "Product designer focused on design systems and dev-friendly handoff.",
        theme: "studio",
        mood: "precise, structured, warm underneath",
        accent: "#2F5D50",
        background: "light"
      },
      hero: {
        headline: "I make complicated products feel obvious.",
        subheadline: "Product designer. Six years. Mostly B2B tools nobody thought could feel good to use.",
        cta: "See selected work"
      },
      about:
        "I care more about the fortieth screen in a flow than the first one — that's usually where products fall apart. I've spent my career making dense, complicated software feel calm, and I still believe good design systems are an act of kindness to your future self.",
      skills: ["Figma", "Design systems", "Prototyping", "User research", "Front-end (React basics)"],
      projects: [
        { name: "Ledger design system", description: "Built a 200+ component design system adopted across 12 product teams.", tags: ["Systems"] },
        { name: "Onboarding redesign", description: "Cut new-user time-to-value from 9 minutes to under 2.", tags: ["Product"] }
      ],
      achievements: ["Speaker, regional design conference 2024"],
      interests: ["Type design", "Ceramics", "Long-distance running"],
      experience: [
        { role: "Senior Product Designer", place: "B2B SaaS company", period: "2022–present" },
        { role: "Product Designer", place: "Early-stage startup", period: "2019–2022" }
      ],
      education: ["B.Des, Industrial Design"],
      socials: [
        { platform: "LinkedIn", url: "https://linkedin.com" },
        { platform: "Portfolio", url: "https://example.com" }
      ],
      sections: [],
      design: { layout: "grid", animation: "subtle", typography: "sans", visualStyle: "structured grid, muted forest green accent, confident whitespace" }
    }
  },
  {
    id: "gamer",
    label: "Gamer",
    spec: {
      site: {
        title: "Kez",
        tagline: "Top 200 on a game you've never heard of.",
        description: "Competitive gamer and small-time streamer.",
        theme: "cyber",
        mood: "hyped, chaotic-good, sleep-deprived",
        accent: "#39FF88",
        background: "dark"
      },
      hero: {
        headline: "I peaked at 4am and I'm not sorry.",
        subheadline: "Competitive player. Occasional streamer. Full-time menace in ranked.",
        cta: "Watch clips"
      },
      about:
        "I've put an unreasonable number of hours into being good at video games and I regret none of it. I stream sometimes, mostly for the three friends who watch, and I will absolutely explain my rotations to you whether you asked or not.",
      skills: ["Ranked strategy", "VOD review", "Team shotcalling", "Stream editing"],
      projects: [],
      achievements: ["Top 200 regional ranked", "Ran a 15-win tournament streak, 2025"],
      interests: ["Fighting games", "Energy drinks", "Discord culture", "Speedrunning"],
      experience: [],
      education: [],
      socials: [
        { platform: "Twitch", url: "https://twitch.tv" },
        { platform: "X", url: "https://x.com" }
      ],
      sections: [
        { id: "mood", title: "Mood", kind: "text", content: "Locked in." },
        { id: "fun-facts", title: "Fun facts", kind: "list", content: ["Once played 11 hours straight on a dare", "My main has never been meta and I refuse to switch"] }
      ],
      design: { layout: "grid", animation: "energetic", typography: "mono", visualStyle: "neon green terminal aesthetic, scanlines, chaotic energy" }
    }
  },
  {
    id: "scientist",
    label: "Scientist",
    spec: {
      site: {
        title: "Dr. Elena Kwan",
        tagline: "Studying how coral remembers heat.",
        description: "Marine biologist researching coral thermal resilience.",
        theme: "midnight",
        mood: "measured, quietly passionate",
        accent: "#E8C468",
        background: "dark"
      },
      hero: {
        headline: "Some corals remember the last heatwave. I want to know why.",
        subheadline: "Marine biologist. Coral thermal resilience & reef restoration.",
        cta: "Read my research"
      },
      about:
        "My research looks at why some coral colonies survive repeated marine heatwaves while genetically similar neighbors don't. It's slow, unglamorous fieldwork — a lot of tagging, diving, and waiting — but I think it matters more now than it ever has.",
      skills: ["Field research diving", "Statistical modeling (R)", "Grant writing", "Science communication"],
      projects: [
        { name: "Thermal memory in Acropora", description: "Three-year longitudinal study across two reef systems, published 2025.", tags: ["Research"] }
      ],
      achievements: ["Published in a peer-reviewed marine biology journal", "Early-career research grant recipient"],
      interests: ["Freediving", "Science illustration", "Reef restoration volunteering"],
      experience: [
        { role: "Postdoctoral Researcher", place: "Marine biology institute", period: "2023–present" }
      ],
      education: ["Ph.D. Marine Biology", "B.Sc. Environmental Science"],
      socials: [
        { platform: "Google Scholar", url: "https://scholar.google.com" }
      ],
      sections: [],
      design: { layout: "centered", animation: "minimal", typography: "serif", visualStyle: "deep navy-black, gold accent like a museum plaque, spotlight hero" }
    }
  },
  {
    id: "vibe-genz",
    label: "Just vibes",
    spec: {
      site: {
        title: "juno",
        tagline: "17, extremely online, unbothered.",
        description: "A personal corner for whatever I'm into this week.",
        theme: "dream",
        mood: "soft, chaotic, sincere",
        accent: "#D98CC0",
        background: "light"
      },
      hero: {
        headline: "this is just my little corner of the internet",
        subheadline: "no niche, no brand, just me",
        cta: "come in"
      },
      about:
        "i don't really know how to describe myself in a normal way so here's the truth: i cry at pixar movies, i have strong opinions about font pairings, and i've rewatched the same three shows more times than i'll admit. this site is just a place that's mine.",
      skills: [],
      projects: [],
      achievements: [],
      interests: ["Pinterest boards", "Studio Ghibli", "Thrifting", "Journaling", "Matcha"],
      experience: [],
      education: [],
      socials: [
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "Spotify", url: "https://spotify.com" }
      ],
      sections: [
        { id: "obsession", title: "Current obsession", kind: "text", content: "re-watching Spirited Away for the ninth time, no explanation needed" },
        { id: "quote", title: "Quote I live by", kind: "quote", content: "\"be a whole person, not a highlight reel\"" },
        { id: "fun-facts", title: "Fun facts", kind: "list", content: ["I've never finished a journal", "I talk to my plants", "My camera roll is 90% my dog"] }
      ],
      design: { layout: "asymmetric", animation: "subtle", typography: "display-heavy", visualStyle: "soft pastel blur shapes, dreamy serif display, rounded everything" }
    }
  }
];

export function getDemoById(id: string): DemoProfile | undefined {
  return DEMO_PROFILES.find((d) => d.id === id);
}
