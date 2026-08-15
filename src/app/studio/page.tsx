"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Sparkles, Download, Pencil, Eye, Loader2, AlertCircle, X } from "lucide-react";
import { useSite } from "@/lib/siteContext";
import SiteRenderer from "@/components/renderer/SiteRenderer";
import { Logo } from "@/components/ui/atoms";
import ViewportToggle, { Viewport, VIEWPORT_WIDTHS } from "@/components/editor/ViewportToggle";
import EditorPanel from "@/components/editor/EditorPanel";
import AiCommandBox from "@/components/editor/AiCommandBox";
import { SiteSpec } from "@/types/site";

type PanelTab = "preview" | "edit";

export default function StudioPage() {
  const router = useRouter();
  const { spec, setSpec, lastInput, isHydrated } = useSite();

  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [tab, setTab] = useState<PanelTab>("preview");
  const [busy, setBusy] = useState<"regenerate" | "style" | "edit" | "export" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isHydrated && !spec) router.replace("/create");
  }, [isHydrated, spec, router]);

  if (!isHydrated || !spec) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-chalk">
        <Loader2 className="animate-spin text-indigo" size={24} />
      </div>
    );
  }

  const applyEdit = async (instruction: string) => {
    setError(null);
    setBusy("edit");
    try {
      const res = await fetch("/api/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spec, instruction })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message ?? "That edit didn't work. Try again.");
        return;
      }
      setSpec(data.spec as SiteSpec);
    } catch {
      setError("We couldn't reach our AI. Check your connection and try again.");
    } finally {
      setBusy(null);
    }
  };

  const regenerate = async () => {
    if (!lastInput) {
      setError("We don't have your original answers this session — try creating a new site.");
      return;
    }
    setError(null);
    setBusy("regenerate");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lastInput)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message ?? "Regeneration didn't work. Try again.");
        return;
      }
      setSpec(data.spec as SiteSpec);
    } catch {
      setError("We couldn't reach our AI. Check your connection and try again.");
    } finally {
      setBusy(null);
    }
  };

  const changeStyle = async () => {
    setError(null);
    setBusy("style");
    try {
      const res = await fetch("/api/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spec,
          instruction:
            "Try a genuinely different theme, layout and visual style from what's currently set, while keeping all the same content."
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message ?? "Couldn't change the style. Try again.");
        return;
      }
      setSpec(data.spec as SiteSpec);
    } catch {
      setError("We couldn't reach our AI. Check your connection and try again.");
    } finally {
      setBusy(null);
    }
  };

  const publish = async () => {
    setError(null);
    setBusy("export");
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spec })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "Export failed. Try again.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${spec.site.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Export failed. Check your connection and try again.");
    } finally {
      setBusy(null);
    }
  };

  const width = VIEWPORT_WIDTHS[viewport];

  return (
    <div className="flex min-h-screen flex-col bg-chalk-dim text-ink">
      <header className="border-b border-white/10 bg-chalk/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <Logo className="hidden sm:flex" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab("preview")}
              aria-pressed={tab === "preview"}
              className={`inline-flex items-center gap-1.5 rounded-[4px] px-3 py-2 text-sm focus-ring ${
                tab === "preview" ? "bg-white/10 text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              <Eye size={14} /> Preview
            </button>
            <button
              type="button"
              onClick={() => setTab("edit")}
              aria-pressed={tab === "edit"}
              className={`inline-flex items-center gap-1.5 rounded-[4px] px-3 py-2 text-sm focus-ring ${
                tab === "edit" ? "bg-white/10 text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              <Pencil size={14} /> Edit
            </button>
          </div>

          <div className="hidden md:block">
            <ViewportToggle value={viewport} onChange={setViewport} />
          </div>

          <div className="flex items-center gap-2">
            <ToolbarButton
              onClick={regenerate}
              busy={busy === "regenerate"}
              icon={RefreshCw}
              label="Regenerate"
              hideLabelOnMobile
            />
            <ToolbarButton
              onClick={changeStyle}
              busy={busy === "style"}
              icon={Sparkles}
              label="Change Style"
              hideLabelOnMobile
            />
            <button
              type="button"
              onClick={publish}
              disabled={busy === "export"}
              className="inline-flex items-center gap-1.5 rounded-[4px] bg-coral px-3 py-2 text-sm font-medium text-chalk transition-opacity focus-ring disabled:opacity-50"
            >
              {busy === "export" ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              <span className="hidden sm:inline">Publish</span>
            </button>
          </div>
        </div>
        <div className="flex justify-center border-t border-ink/10 py-2 md:hidden">
          <ViewportToggle value={viewport} onChange={setViewport} />
        </div>
      </header>

      {error && (
        <div className="flex items-center justify-between gap-3 bg-coral-soft px-4 py-2.5 text-sm text-coral sm:px-6">
          <span className="flex items-center gap-2">
            <AlertCircle size={15} /> {error}
          </span>
          <button onClick={() => setError(null)} aria-label="Dismiss" className="focus-ring">
            <X size={15} />
          </button>
        </div>
      )}

      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex flex-1 justify-center overflow-auto bg-[radial-gradient(circle_at_50%_0%,rgba(130,148,255,.12),transparent_40%)] p-4 sm:p-8">
          <div
            className="h-fit overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_24px_80px_rgba(0,0,0,.45)] transition-all duration-300"
            style={{ width: "100%", maxWidth: width }}
          >
            <SiteRenderer spec={spec} />
          </div>
        </div>

        {tab === "edit" && (
          <aside className="w-full border-t border-white/10 bg-chalk p-5 sm:p-6 md:w-[380px] md:border-l md:border-t-0">
            <div className="mb-6">
              <AiCommandBox onSubmit={applyEdit} disabled={busy !== null} />
            </div>
            <EditorPanel spec={spec} onChange={setSpec} />
          </aside>
        )}
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  busy,
  icon: Icon,
  label,
  hideLabelOnMobile
}: {
  onClick: () => void;
  busy: boolean;
  icon: typeof RefreshCw;
  label: string;
  hideLabelOnMobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-[4px] border border-ink/15 px-3 py-2 text-sm text-ink-soft transition-colors hover:text-ink focus-ring disabled:opacity-50"
    >
      {busy ? <Loader2 size={14} className="animate-spin" /> : <Icon size={14} />}
      <span className={hideLabelOnMobile ? "hidden lg:inline" : ""}>{label}</span>
    </button>
  );
}
