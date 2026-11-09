import type { MetadataRoute } from "next";

export function buildSitemap(paths: string[]): MetadataRoute.Sitemap {
  const base = "https://xkwisit.com";
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
}
