import { packages } from "@/config/packages";
import { services } from "@/config/services";
import { ROUTES } from "@/config/site";

export type VoiceGuideCta = {
  label: string;
  href: string;
};

export type KnowledgeChunk = {
  id: string;
  title: string;
  body: string;
  keywords: string[];
  cta?: VoiceGuideCta;
};

function naira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compact product knowledge used to ground Voice Guide answers. */
export function buildVoiceGuideKnowledge(): KnowledgeChunk[] {
  const serviceChunks: KnowledgeChunk[] = services.map((service) => {
    const fromCopy = [
      service.tagline,
      service.description,
      ...service.deliverables,
      ...service.outcomes,
      ...service.goodFor.map((g) => `${g.title} ${g.body}`),
    ]
      .join(" ")
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 2);

    const keywords = Array.from(
      new Set([
        service.name.toLowerCase(),
        service.slug.replace(/-/g, " "),
        ...fromCopy,
        "service",
        "services",
        "pricing",
        "cost",
        "price",
        "build",
        "offer",
      ]),
    );

    return {
      id: `service-${service.slug}`,
      title: service.name,
      body: `${service.name}: ${service.tagline} ${service.description} Starting from ${naira(service.startingFrom)}. Ideal for ${service.idealFor.join(", ")}. Outcomes include ${service.outcomes.slice(0, 3).join("; ")}.`,
      keywords,
      cta: {
        label: `See ${service.name}`,
        href: `/services/${service.slug}`,
      },
    };
  });

  const packageChunks: KnowledgeChunk[] = packages.map((pkg) => ({
    id: `package-${pkg.id}`,
    title: pkg.name,
    body: `${pkg.name} package: ${pkg.tagline} ${pkg.description} From ${naira(pkg.priceMonthly)} monthly. Best for ${pkg.bestFor}.`,
    keywords: [
      pkg.name.toLowerCase(),
      "pricing",
      "package",
      "tier",
      "monthly",
      "cost",
      "price",
    ],
    cta: { label: "View pricing", href: ROUTES.pricing },
  }));

  // Core “about / pricing / book” answers live in voiceFaq.ts (spoken, curated).
  // Keep service + package chunks here as fallback detail.
  return [...serviceChunks, ...packageChunks];
}
