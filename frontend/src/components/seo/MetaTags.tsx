import type { Metadata } from "next";

export type MetaTagsProps = {
  title?: string;
  description?: string;
  url?: string;
};

/** Head/SEO helper for Meta Tags. */
export function buildMetaTagsMetadata({
  title = "Xkwisit",
  description = "We find the gap in African brands, then we fix that.",
  url = "https://xkwisit.com",
}: MetaTagsProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, url },
  };
}

export function MetaTags(props: MetaTagsProps = {}) {
  const meta = buildMetaTagsMetadata(props);
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
