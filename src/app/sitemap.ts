import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

const paths = [
  "/",
  "/services",
  "/work-with-us",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path, index) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.7,
  }));
}
