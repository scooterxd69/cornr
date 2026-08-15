"use client";

import { ReactNode } from "react";
import { SiteSpec, ProjectItem } from "@/types/site";
import { THEME_LIST } from "@/lib/themes";
import LinksEditor from "@/components/onboarding/LinksEditor";
import { ImageOff, Plus, Trash2 } from "lucide-react";

interface EditorPanelProps {
  spec: SiteSpec;
  onChange: (next: SiteSpec) => void;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus-ring";

export default function EditorPanel({ spec, onChange }: EditorPanelProps) {
  const update = (patch: Partial<SiteSpec>) => onChange({ ...spec, ...patch });

  const updateSite = (patch: Partial<SiteSpec["site"]>) =>
    update({ site: { ...spec.site, ...patch } });

  const updateHero = (patch: Partial<SiteSpec["hero"]>) =>
    update({ hero: { ...spec.hero, ...patch } });

  const updateProject = (index: number, patch: Partial<ProjectItem>) => {
    const next = spec.projects.slice();
    next[index] = { ...next[index], ...patch };
    update({ projects: next });
  };

  const removeProject = (index: number) => {
    update({ projects: spec.projects.filter((_, i) => i !== index) });
  };

  const addProject = () => {
    if (spec.projects.length >= 12) return;
    update({ projects: [...spec.projects, { name: "New project", description: "", tags: [] }] });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-medium text-ink-soft">Theme</p>
        <div className="grid grid-cols-3 gap-2">
          {THEME_LIST.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => updateSite({ theme: t.id })}
              aria-pressed={spec.site.theme === t.id}
              className={`rounded-[6px] border p-2.5 text-left transition-colors focus-ring ${
                spec.site.theme === t.id ? "border-indigo ring-1 ring-indigo/40" : "border-white/10 hover:border-white/30"
              }`}
              style={{ background: t.bg }}
            >
              <span
                className="block h-2 w-8 rounded-full"
                style={{ background: t.accent }}
                aria-hidden="true"
              />
              <span className="mt-2 block text-[11px]" style={{ color: t.text, fontFamily: t.fontDisplay }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Name / site title">
          <input
            value={spec.site.title}
            onChange={(e) => updateSite({ title: e.target.value })}
            maxLength={80}
            className={inputClass}
          />
        </Field>
        <Field label="Headline">
          <input
            value={spec.hero.headline}
            onChange={(e) => updateHero({ headline: e.target.value })}
            maxLength={140}
            className={inputClass}
          />
        </Field>
        <Field label="Subheadline">
          <input
            value={spec.hero.subheadline}
            onChange={(e) => updateHero({ subheadline: e.target.value })}
            maxLength={220}
            className={inputClass}
          />
        </Field>
        <Field label="About">
          <textarea
            value={spec.about}
            onChange={(e) => update({ about: e.target.value })}
            maxLength={1200}
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </Field>
        <Field label="Accent color">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={spec.site.accent}
              onChange={(e) => updateSite({ accent: e.target.value })}
              maxLength={40}
              placeholder="#4F46E5"
              className={inputClass}
            />
            <span
              className="h-9 w-9 flex-shrink-0 rounded-[4px] border border-ink/15"
              style={{ background: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(spec.site.accent) ? spec.site.accent : "transparent" }}
              aria-hidden="true"
            />
          </div>
        </Field>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-ink-soft">Skills (comma-separated)</p>
        <input
          value={spec.skills.join(", ")}
          onChange={(e) =>
            update({
              skills: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .slice(0, 24)
            })
          }
          className={inputClass}
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-ink-soft">Interests (comma-separated)</p>
        <input
          value={spec.interests.join(", ")}
          onChange={(e) =>
            update({
              interests: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .slice(0, 20)
            })
          }
          className={inputClass}
        />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-ink-soft">Projects</p>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-1 text-xs text-indigo hover:underline focus-ring"
          >
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="space-y-3">
          {spec.projects.map((p, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[.025] p-3">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    value={p.name}
                    onChange={(e) => updateProject(i, { name: e.target.value })}
                    maxLength={120}
                    className={inputClass}
                    placeholder="Project name"
                  />
                  <textarea
                    value={p.description}
                    onChange={(e) => updateProject(i, { description: e.target.value })}
                    maxLength={500}
                    rows={2}
                    className={`${inputClass} resize-none`}
                    placeholder="What it does"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeProject(i)}
                  className="mt-1 text-ink-soft hover:text-coral focus-ring"
                  aria-label="Remove project"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {spec.projects.length === 0 && (
            <p className="text-xs text-ink-soft/70">No projects yet — add one above.</p>
          )}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-ink-soft">Social links</p>
        <LinksEditor links={spec.socials} onChange={(socials) => update({ socials })} />
      </div>

      <div className="rounded-xl border border-dashed border-white/20 bg-white/[.025] p-4 text-xs text-ink-soft">
        <ImageOff size={14} className="mb-1.5" />
        Photo uploads aren&apos;t part of this MVP yet — there&apos;s no file storage
        wired up. The architecture leaves room for it once accounts and hosting land.
      </div>
    </div>
  );
}
