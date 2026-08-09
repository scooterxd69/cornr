"use client";

import { useState, KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";

interface ChipSelectProps {
  presets: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  max?: number;
}

export default function ChipSelect({ presets, selected, onChange, max = 12 }: ChipSelectProps) {
  const [customValue, setCustomValue] = useState("");

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else if (selected.length < max) {
      onChange([...selected, value]);
    }
  };

  const addCustom = () => {
    const trimmed = customValue.trim();
    if (!trimmed || selected.includes(trimmed) || selected.length >= max) return;
    onChange([...selected, trimmed]);
    setCustomValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
    }
  };

  const customSelected = selected.filter((s) => !presets.includes(s));

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {presets.map((preset) => {
          const active = selected.includes(preset);
          return (
            <button
              key={preset}
              type="button"
              onClick={() => toggle(preset)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm transition-colors focus-ring ${
                active
                  ? "border-ink bg-ink text-chalk"
                  : "border-ink/20 text-ink-soft hover:border-ink/50 hover:text-ink"
              }`}
            >
              {preset}
            </button>
          );
        })}
        {customSelected.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => toggle(c)}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-ink px-4 py-2 text-sm text-chalk focus-ring"
          >
            {c} <X size={13} />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add your own"
          maxLength={40}
          className="w-full max-w-xs rounded-[4px] border border-ink/20 bg-white px-4 py-2.5 text-sm focus-ring placeholder:text-ink-soft/60"
        />
        <button
          type="button"
          onClick={addCustom}
          className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-ink/20 text-ink-soft hover:border-ink/50 hover:text-ink focus-ring"
          aria-label="Add"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
