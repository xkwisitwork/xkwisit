/**
 * Industry taxonomy.
 * Used across lead creation, client onboarding, and content tagging.
 */

export const INDUSTRIES = [
  "E-commerce",
  "Real Estate",
  "Healthcare",
  "Education",
  "Fintech",
  "Hospitality",
  "Professional Services",
  "Technology / SaaS",
  "Manufacturing",
  "Retail",
  "Beauty & Wellness",
  "Fashion",
  "Food & Beverage",
  "Logistics & Transport",
  "Construction",
  "Energy",
  "Agriculture",
  "Media & Entertainment",
  "Non-profit",
  "Government",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const INDUSTRY_SLUGS: Record<Industry, string> = {
  "E-commerce": "ecommerce",
  "Real Estate": "real-estate",
  Healthcare: "healthcare",
  Education: "education",
  Fintech: "fintech",
  Hospitality: "hospitality",
  "Professional Services": "professional-services",
  "Technology / SaaS": "technology-saas",
  Manufacturing: "manufacturing",
  Retail: "retail",
  "Beauty & Wellness": "beauty-wellness",
  Fashion: "fashion",
  "Food & Beverage": "food-beverage",
  "Logistics & Transport": "logistics-transport",
  Construction: "construction",
  Energy: "energy",
  Agriculture: "agriculture",
  "Media & Entertainment": "media-entertainment",
  "Non-profit": "non-profit",
  Government: "government",
  Other: "other",
};
