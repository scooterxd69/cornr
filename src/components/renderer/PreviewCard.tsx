"use client";

import Link from "next/link";
import SiteRenderer from "./SiteRenderer";
import { DemoProfile } from "@/lib/demoData";
import { THEMES } from "@/lib/themes";

export default function PreviewCard({ demo }: { demo: DemoProfile }) {
  const theme = THEMES[demo.spec.site.theme];
  return (
    <Link
      href={`/examples#${demo.id}`}
      className="group block overflow-hidden rounded-corner border border-ink/10 bg-white/60 transition-shadow hover:shadow-lg focus-ring"
    >
      <div
        className="relative h-56 overflow-hidden"
        style={{ background: theme.bg }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ width: "250%", transform: "scale(0.4)" }}
        >
          <SiteRenderer spec={demo.spec} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>
      <div className="flex items-center justify-between p-5">
        <div>
          <p className="font-display text-base">{demo.spec.site.title}</p>
          <p className="text-xs text-ink-soft">{demo.label}</p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide"
          style={{ background: theme.accent + "22", color: "#14161C" }}
        >
          {theme.label}
        </span>
      </div>
    </Link>
  );
}
