import type { Metadata } from "next";

const SITE = "Xkwisit Services International";

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title: `${title} | ${SITE}`,
    description,
    openGraph: { title, description, url: path },
  };
}
