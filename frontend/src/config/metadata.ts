import type { Metadata } from "next";

import { siteConfig } from "./site";

/**
 * Reusable metadata builders.
 * Use these in page/layout files to produce consistent SEO metadata.
 */

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} - ${siteConfig.tagline}`,
      template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: `${siteConfig.name} - ${siteConfig.tagline}`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: "/og/default.png",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} - ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: ["/og/default.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...overrides,
  };
}

/**
 * Builds metadata for a marketing page with a specific title and description.
 */
export function buildMarketingMetadata({
  title,
  description,
  path,
  image = "/og/default.png",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return buildMetadata({
    title,
    description,
    alternates: { canonical: `${siteConfig.url}${path}` },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: `${siteConfig.url}${path}`,
      title: `${title} · ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
      images: [image],
    },
  });
}

/**
 * Builds metadata for a case study or insight article page.
 */
export function buildContentMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
  authors = [],
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): Metadata {
  return buildMetadata({
    title,
    description,
    alternates: { canonical: `${siteConfig.url}${path}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}${path}`,
      title: `${title} · ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      publishedTime,
      modifiedTime,
      authors,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
      images: image ? [image] : undefined,
    },
  });
}

/**
 * Default noindex robots policy for authenticated areas.
 */
export const noIndexMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};
