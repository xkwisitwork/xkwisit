import type { MetadataRoute } from "next";

export function buildRobots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://xkwisit.com/sitemap.xml",
  };
}
