import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cornr.example.com";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/create`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/examples`, changeFrequency: "weekly", priority: 0.7 }
  ];
}
