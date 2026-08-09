"use client";

import { useState, KeyboardEvent } from "react";
import { Wand2, Loader2 } from "lucide-react";

const EXAMPLES = [
  "Make my website more futuristic.",
  "Make it more professional.",
  "Make the colors darker.",
  "Make this feel more like me."
];

interface AiCommandBoxProps {
  onSubmit: (instruction: string) => Promise<void>;
  disabled?: boolean;
}

export default function AiCommandBox({ onSubmit, disabled }: AiCommandBoxProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (instruction: string) => {
    const trimmed = instruction.trim();
    if (!trimmed || loading || disabled) return;
    setLoading(true);
    try {
      await onSubmit(trimmed);
      setValue("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(value);
    }
  };

  return (
    <div className="rounded-[8px] border border-ink/15 bg-white p-4">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
        <Wand2 size={13} /> Tell the AI what to change
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='"Make my portfolio look more impressive."'
        rows={2}
        maxLength={300}
        disabled={disabled || loading}
        className="w-full resize-none rounded-[4px] border border-ink/15 bg-chalk px-3 py-2 text-sm focus-ring placeholder:text-ink-soft/50 disabled:opacity-60"
      />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => send(ex)}
            disabled={disabled || loading}
            className="rounded-full border border-ink/15 px-2.5 py-1 text-[11px] text-ink-soft hover:border-ink/40 hover:text-ink focus-ring disabled:opacity-50"
          >
            {ex}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => send(value)}
        disabled={disabled || loading || value.trim().length === 0}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-indigo px-4 py-2.5 text-sm font-medium text-chalk transition-opacity focus-ring disabled:opacity-40"
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Wand2 size={15} />}
        {loading ? "Updating..." : "Apply"}
      </button>
    </div>
  );
}
