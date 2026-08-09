"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { SiteSpec, OnboardingInput } from "@/types/site";

const STORAGE_KEY = "cornr:current-site";
const INPUT_STORAGE_KEY = "cornr:current-input";

interface SiteContextValue {
  spec: SiteSpec | null;
  setSpec: (spec: SiteSpec | null) => void;
  lastInput: OnboardingInput | null;
  setLastInput: (input: OnboardingInput | null) => void;
  isHydrated: boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [spec, setSpecState] = useState<SiteSpec | null>(null);
  const [lastInput, setLastInputState] = useState<OnboardingInput | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) setSpecState(JSON.parse(raw));
      const rawInput = window.sessionStorage.getItem(INPUT_STORAGE_KEY);
      if (rawInput) setLastInputState(JSON.parse(rawInput));
    } catch {
      // Ignore corrupt storage — the user just starts fresh.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setSpec = (next: SiteSpec | null) => {
    setSpecState(next);
    try {
      if (next) {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } else {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // sessionStorage can fail in private modes — the UI still works,
      // it just won't survive a refresh.
    }
  };

  const setLastInput = (next: OnboardingInput | null) => {
    setLastInputState(next);
    try {
      if (next) {
        window.sessionStorage.setItem(INPUT_STORAGE_KEY, JSON.stringify(next));
      } else {
        window.sessionStorage.removeItem(INPUT_STORAGE_KEY);
      }
    } catch {
      // Ignore — regenerate will just be unavailable this session.
    }
  };

  const value = useMemo(
    () => ({ spec, setSpec, lastInput, setLastInput, isHydrated }),
    [spec, lastInput, isHydrated]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
