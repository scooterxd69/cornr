"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";

export type Viewport = "desktop" | "tablet" | "mobile";

export const VIEWPORT_WIDTHS: Record<Viewport, number> = {
  desktop: 1200,
  tablet: 768,
  mobile: 390
};

const OPTIONS: { id: Viewport; icon: typeof Monitor; label: string }[] = [
  { id: "desktop", icon: Monitor, label: "Desktop" },
  { id: "tablet", icon: Tablet, label: "Tablet" },
  { id: "mobile", icon: Smartphone, label: "Mobile" }
];

export default function ViewportToggle({
  value,
  onChange
}: {
  value: Viewport;
  onChange: (v: Viewport) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-[6px] border border-ink/15 bg-white p-1">
      {OPTIONS.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          aria-label={label}
          title={label}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-[4px] transition-colors focus-ring ${
            value === id ? "bg-ink text-chalk" : "text-ink-soft hover:text-ink"
          }`}
        >
          <Icon size={15} />
        </button>
      ))}
    </div>
  );
}
