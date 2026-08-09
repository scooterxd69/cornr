"use client";

import { Wand2 } from "lucide-react";

const OPTIONS = [
  { id: "minimal", label: "Minimal", detail: "Clean, quiet, lots of space" },
  { id: "futuristic", label: "Futuristic", detail: "Glowing, gradient, next-gen" },
  { id: "cinematic", label: "Cinematic", detail: "Dark, dramatic, premium" },
  { id: "playful", label: "Playful", detail: "Fun, colorful, a little chaotic" },
  { id: "elegant", label: "Elegant", detail: "Refined type, restrained color" },
  { id: "dark", label: "Dark", detail: "Moody, high-contrast" },
  { id: "colorful", label: "Colorful", detail: "Bold, saturated, alive" },
  { id: "experimental", label: "Experimental", detail: "Unexpected, a little weird" }
];

interface PersonalityGridProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PersonalityGrid({ value, onChange }: PersonalityGridProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {OPTIONS.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={active}
              className={`rounded-[6px] border p-4 text-left transition-colors focus-ring ${
                active ? "border-ink bg-ink text-chalk" : "border-ink/20 hover:border-ink/50"
              }`}
            >
              <p className="font-display text-base">{opt.label}</p>
              <p className={`mt-1 text-xs ${active ? "text-chalk/70" : "text-ink-soft"}`}>{opt.detail}</p>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => onChange("ai-decide")}
        className={`mt-3 inline-flex items-center gap-2 rounded-[6px] border px-4 py-3 text-sm transition-colors focus-ring ${
          value === "ai-decide" ? "border-indigo bg-indigo-soft text-indigo" : "border-ink/20 text-ink-soft hover:border-ink/50"
        }`}
      >
        <Wand2 size={16} /> Let AI decide
      </button>
    </div>
  );
}
