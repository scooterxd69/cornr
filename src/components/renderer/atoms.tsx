import { ThemeTokens } from "@/lib/themes";

export function Chip({ children }: { children: string }) {
  return (
    <span
      className="inline-block rounded-full border px-3 py-1.5 text-xs"
      style={{ borderColor: "var(--border)", fontFamily: "var(--font-mono)" }}
    >
      {children}
    </span>
  );
}

export function SectionHeading({ children, theme }: { children: string; theme: ThemeTokens }) {
  return (
    <h2
      className="mb-6 text-2xl sm:text-3xl"
      style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
    >
      {theme.id === "cyber" ? <span style={{ color: "var(--accent)" }}>/&nbsp;</span> : null}
      {children}
    </h2>
  );
}

export function Divider() {
  return <div className="my-14 sm:my-20 border-t" style={{ borderColor: "var(--border)" }} />;
}

export function Muted({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: "var(--muted)" }}>{children}</span>
  );
}
