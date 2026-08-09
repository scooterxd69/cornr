import type { Metadata } from "next";
import { SiteProvider } from "@/lib/siteContext";
import "./globals.css";

const SITE_URL = "https://cornr.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cornr — Turn yourself into a website",
    template: "%s · Cornr"
  },
  description:
    "Cornr is an AI personal website builder. Tell it who you are and get a genuinely beautiful personal website or portfolio in minutes — no code, no templates that look like everyone else's.",
  keywords: [
    "personal website builder",
    "AI portfolio builder",
    "personal portfolio",
    "student portfolio",
    "AI website builder",
    "personal website generator"
  ],
  openGraph: {
    title: "Cornr — Turn yourself into a website",
    description: "Tell us who you are. We'll turn it into a website.",
    url: SITE_URL,
    siteName: "Cornr",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornr — Turn yourself into a website",
    description: "Tell us who you are. We'll turn it into a website."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Newsreader:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&family=Sora:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
