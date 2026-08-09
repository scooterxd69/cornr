"use client";

import { SocialLink } from "@/types/site";
import { Plus, X } from "lucide-react";

const PLATFORM_PRESETS = ["GitHub", "Instagram", "LinkedIn", "YouTube", "Spotify", "X", "Website"];

interface LinksEditorProps {
  links: SocialLink[];
  onChange: (next: SocialLink[]) => void;
}

export default function LinksEditor({ links, onChange }: LinksEditorProps) {
  const update = (index: number, patch: Partial<SocialLink>) => {
    const next = links.slice();
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  const add = () => {
    if (links.length >= 8) return;
    onChange([...links, { platform: "Website", url: "" }]);
  };

  return (
    <div className="space-y-3">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2">
          <select
            value={link.platform}
            onChange={(e) => update(i, { platform: e.target.value })}
            className="rounded-[4px] border border-ink/20 bg-white px-3 py-2.5 text-sm focus-ring"
          >
            {PLATFORM_PRESETS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input
            value={link.url}
            onChange={(e) => update(i, { url: e.target.value })}
            placeholder="https://..."
            maxLength={300}
            className="w-full rounded-[4px] border border-ink/20 bg-white px-4 py-2.5 text-sm focus-ring placeholder:text-ink-soft/60"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[4px] border border-ink/20 text-ink-soft hover:border-ink/50 hover:text-ink focus-ring"
            aria-label="Remove link"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      {links.length < 8 && (
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 text-sm text-indigo hover:underline focus-ring"
        >
          <Plus size={15} /> Add a link
        </button>
      )}
    </div>
  );
}
