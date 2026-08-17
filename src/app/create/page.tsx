"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Briefcase, Sparkles, ChevronDown } from "lucide-react";
import StepShell from "@/components/onboarding/StepShell";
import ChipSelect from "@/components/onboarding/ChipSelect";
import LinksEditor from "@/components/onboarding/LinksEditor";
import PersonalityGrid from "@/components/onboarding/PersonalityGrid";
import { GeneratingScreen, ErrorScreen } from "@/components/onboarding/GeneratingScreen";
import { useSite } from "@/lib/siteContext";
import { OnboardingInput, SocialLink } from "@/types/site";

const INTEREST_PRESETS = [
  "Coding",
  "Music",
  "Football",
  "Art",
  "Gaming",
  "Photography",
  "Fashion",
  "Science",
  "Cars",
  "Travel"
];

const TOTAL_STEPS = 7;

type Status = "editing" | "generating" | "error";

export default function CreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSpec, setLastInput } = useSite();

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("editing");
  const [errorMessage, setErrorMessage] = useState("");
  const [showExtras, setShowExtras] = useState(false);

  const [form, setForm] = useState<OnboardingInput>({
    name: "",
    about: searchParams.get("story") ?? "",
    interests: [],
    achievements: "",
    links: [],
    personality: "ai-decide",
    mode: "portfolio",
    age: "",
    education: "",
    skills: "",
    favoriteColors: "",
    favoriteMusic: "",
    photoDescription: "",
    extra: ""
  });

  const patch = (fields: Partial<OnboardingInput>) => setForm((f) => ({ ...f, ...fields }));

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const generate = async () => {
    setStatus("generating");
    const payload: OnboardingInput = {
      ...form,
      links: form.links.filter((l) => l.url.trim().length > 0)
    };
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data?.message ?? "Something went wrong generating your site.");
        setStatus("error");
        return;
      }
      setSpec(data.spec);
      setLastInput(payload);
      router.push("/studio");
    } catch {
      setErrorMessage("We couldn't reach our AI. Check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "generating") return <GeneratingScreen />;
  if (status === "error") {
    return <ErrorScreen message={errorMessage} onRetry={() => setStatus("editing")} />;
  }

  return (
    <>
      {step === 0 && (
        <StepShell
          step={step}
          totalSteps={TOTAL_STEPS}
          title="What's your name?"
          onNext={goNext}
          nextDisabled={form.name.trim().length === 0}
        >
          <input
            autoFocus
            value={form.name}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="Naitik"
            maxLength={80}
            className="w-full border-b-2 border-ink/20 bg-transparent py-3 font-display text-2xl focus:border-indigo focus-ring outline-none"
          />
        </StepShell>
      )}

      {step === 1 && (
        <StepShell
          step={step}
          totalSteps={TOTAL_STEPS}
          title="Tell us about yourself."
          subtitle="Write like you're texting a friend, not writing a resume."
          onBack={goBack}
          onNext={goNext}
          nextDisabled={form.about.trim().length === 0}
        >
          <textarea
            autoFocus
            value={form.about}
            onChange={(e) => patch({ about: e.target.value })}
            placeholder="I'm a third-year CS student who'd rather be building things than sitting through lectures..."
            maxLength={2000}
            rows={7}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[.035] p-4 text-base text-ink focus-ring placeholder:text-ink-soft/60"
          />
          <p className="mt-2 text-right text-xs text-ink-soft/60">{form.about.length}/2000</p>
        </StepShell>
      )}

      {step === 2 && (
        <StepShell
          step={step}
          totalSteps={TOTAL_STEPS}
          title="What are you into?"
          subtitle="Pick a few, or add your own."
          onBack={goBack}
          onNext={goNext}
          nextDisabled={form.interests.length === 0}
        >
          <ChipSelect
            presets={INTEREST_PRESETS}
            selected={form.interests}
            onChange={(interests) => patch({ interests })}
          />
        </StepShell>
      )}

      {step === 3 && (
        <StepShell
          step={step}
          totalSteps={TOTAL_STEPS}
          title="What have you achieved?"
          subtitle="Optional — awards, launches, milestones, whatever you're proud of."
          onBack={goBack}
          onNext={goNext}
        >
          <textarea
            value={form.achievements}
            onChange={(e) => patch({ achievements: e.target.value })}
            placeholder="1st place campus hackathon, published a paper, hit 10k followers..."
            maxLength={600}
            rows={4}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[.035] p-4 text-base text-ink focus-ring placeholder:text-ink-soft/60"
          />

          <button
            type="button"
            onClick={() => setShowExtras((s) => !s)}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-indigo focus-ring"
          >
            <ChevronDown size={15} className={`transition-transform ${showExtras ? "rotate-180" : ""}`} />
            A few more details (optional)
          </button>

          {showExtras && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <LabeledInput label="Age" value={form.age ?? ""} onChange={(v) => patch({ age: v })} maxLength={10} />
              <LabeledInput label="Favorite colors" value={form.favoriteColors ?? ""} onChange={(v) => patch({ favoriteColors: v })} maxLength={120} />
              <LabeledInput label="Education" value={form.education ?? ""} onChange={(v) => patch({ education: v })} maxLength={400} />
              <LabeledInput label="Skills" value={form.skills ?? ""} onChange={(v) => patch({ skills: v })} maxLength={400} />
              <LabeledInput label="Favorite music/artists" value={form.favoriteMusic ?? ""} onChange={(v) => patch({ favoriteMusic: v })} maxLength={200} />
              <LabeledInput label="What you look like (for tone, not a photo)" value={form.photoDescription ?? ""} onChange={(v) => patch({ photoDescription: v })} maxLength={300} />
              <div className="sm:col-span-2">
                <LabeledInput label="Anything else?" value={form.extra ?? ""} onChange={(v) => patch({ extra: v })} maxLength={1000} />
              </div>
            </div>
          )}
        </StepShell>
      )}

      {step === 4 && (
        <StepShell
          step={step}
          totalSteps={TOTAL_STEPS}
          title="Your links"
          subtitle="Optional — add anywhere people can find you."
          onBack={goBack}
          onNext={goNext}
        >
          <LinksEditor links={form.links} onChange={(links: SocialLink[]) => patch({ links })} />
        </StepShell>
      )}

      {step === 5 && (
        <StepShell
          step={step}
          totalSteps={TOTAL_STEPS}
          title="Choose your personality"
          subtitle="This steers the look and feel — you can always change it later."
          onBack={goBack}
          onNext={goNext}
        >
          <PersonalityGrid value={form.personality} onChange={(personality) => patch({ personality })} />
        </StepShell>
      )}

      {step === 6 && (
        <StepShell
          step={step}
          totalSteps={TOTAL_STEPS}
          title="Choose your mode"
          onBack={goBack}
          onNext={generate}
          nextLabel="Create My Website"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <ModeCard
              icon={Briefcase}
              title="Portfolio"
              detail="For students, developers, designers, freelancers."
              active={form.mode === "portfolio"}
              onClick={() => patch({ mode: "portfolio" })}
            />
            <ModeCard
              icon={Sparkles}
              title="Vibe"
              detail="A personal corner built around who you are."
              active={form.mode === "vibe"}
              onClick={() => patch({ mode: "vibe" })}
            />
          </div>
        </StepShell>
      )}
    </>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  maxLength
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="w-full rounded-xl border border-white/10 bg-white/[.035] px-3.5 py-2.5 text-sm text-ink focus-ring"
      />
    </label>
  );
}

function ModeCard({
  icon: Icon,
  title,
  detail,
  active,
  onClick
}: {
  icon: typeof Briefcase;
  title: string;
  detail: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-[8px] border p-6 text-left transition-colors focus-ring ${
        active ? "border-coral bg-coral/10 text-ink shadow-[0_0_26px_rgba(250,204,21,.12)]" : "border-white/10 bg-white/[.02] hover:border-coral/50"
      }`}
    >
      <Icon size={22} aria-hidden="true" />
      <p className="mt-3 font-display text-xl">{title}</p>
      <p className={`mt-1 text-sm ${active ? "text-chalk/70" : "text-ink-soft"}`}>{detail}</p>
    </button>
  );
}
