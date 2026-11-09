import type { Metadata } from "next";

export type JsonLdProps = {
  title?: string;
  description?: string;
  url?: string;
};

/** Head/SEO helper for Json Ld. */
export function buildJsonLdMetadata({
  title = "Xkwisit",
  description = "We find the gap in African brands, then we fix that.",
  url = "https://xkwisit.com",
}: JsonLdProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, url },
  };
}

export function JsonLd(props: JsonLdProps = {}) {
  const meta = buildJsonLdMetadata(props);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: meta.title,
          description: meta.description,
        }),
      }}
    />
  );
}
