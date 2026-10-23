import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-red-xi-76.vercel.app";
  return ["", "/about", "/projects", "/skills", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
