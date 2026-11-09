/**
 * Pricing packages.
 * Public-facing pricing tiers and the internal package catalog.
 */

export type PackageTier =
  "FOUNDATION" | "GROWTH_STARTER" | "GROWTH_ENGINE" | "GROWTH_PARTNER" | "ENTERPRISE";

export type BillingPeriod = "MONTHLY" | "QUARTERLY" | "ANNUAL";

export type Package = {
  id: PackageTier;
  name: string;
  tagline: string;
  description: string;
  priceMonthly: number;
  currency: "NGN";
  billingPeriod: BillingPeriod;
  featured: boolean;
  bestFor: string;
  includes: string[];
  excludes: string[];
  servicesIncluded: string[];
  supportLevel: "email" | "email-and-whatsapp" | "priority" | "dedicated";
  onboardingWeeks: number;
  order: number;
};

export const packages: Package[] = [
  {
    id: "FOUNDATION",
    name: "Foundation",
    tagline: "Get the diagnostic and the roadmap.",
    description:
      "The Xkwisit diagnostic engagement. We audit your business, identify growth leaks, and hand you a 90-day roadmap you can execute with or without us.",
    priceMonthly: 1200000,
    currency: "NGN",
    billingPeriod: "MONTHLY",
    featured: false,
    bestFor: "Founders who need clarity before committing to execution.",
    includes: [
      "Full business diagnostic across 7 dimensions",
      "Funnel and revenue leak analysis",
      "Competitor and market review",
      "90-day growth roadmap",
      "KPI framework and tracking setup",
      "Two strategic workshops",
      "One monthly review call",
    ],
    excludes: [
      "Execution of campaigns",
      "Content production",
      "Ongoing hands-on management",
    ],
    servicesIncluded: ["business-growth"],
    supportLevel: "email",
    onboardingWeeks: 1,
    order: 1,
  },
  {
    id: "GROWTH_STARTER",
    name: "Growth Starter",
    tagline: "One channel, done properly.",
    description:
      "For businesses that want one acquisition channel running well before expanding. Pick paid media, SEO, or content. We focus and execute.",
    priceMonthly: 900000,
    currency: "NGN",
    billingPeriod: "MONTHLY",
    featured: false,
    bestFor: "Businesses generating ₦5M–₦30M/month.",
    includes: [
      "Strategy and channel selection",
      "One acquisition channel fully managed",
      "Landing page or content optimisation support",
      "Conversion tracking",
      "Monthly performance review",
      "Access to Xkwisit dashboard",
    ],
    excludes: ["Multi-channel execution", "Branding", "CRM build"],
    servicesIncluded: ["paid-media", "seo", "content"],
    supportLevel: "email-and-whatsapp",
    onboardingWeeks: 2,
    order: 2,
  },
  {
    id: "GROWTH_ENGINE",
    name: "Growth Engine",
    tagline: "Multi-channel execution with reporting.",
    description:
      "The core Xkwisit execution package. Multiple acquisition channels, conversion optimisation, and full attribution. This is where most clients land.",
    priceMonthly: 2400000,
    currency: "NGN",
    billingPeriod: "MONTHLY",
    featured: true,
    bestFor: "Businesses generating ₦30M–₦200M/month.",
    includes: [
      "Two to three acquisition channels managed",
      "Landing page design and CRO",
      "Content production (blog, social)",
      "SEO foundation",
      "Full attribution and analytics setup",
      "Bi-weekly performance reviews",
      "Executive brief every Monday",
      "Access to Xkwisit dashboard + Slack/WhatsApp",
    ],
    excludes: ["CRM build", "Fractional CMO", "Full rebrand"],
    servicesIncluded: ["paid-media", "seo", "content", "web-development"],
    supportLevel: "priority",
    onboardingWeeks: 3,
    order: 3,
  },
  {
    id: "GROWTH_PARTNER",
    name: "Growth Partner",
    tagline: "Full-stack growth team on demand.",
    description:
      "For businesses that want a full growth team without the headcount. Everything in Growth Engine plus CRM, brand support, and quarterly strategy sprints.",
    priceMonthly: 4800000,
    currency: "NGN",
    billingPeriod: "MONTHLY",
    featured: false,
    bestFor: "Businesses generating ₦200M+/month.",
    includes: [
      "Everything in Growth Engine",
      "CRM build and lifecycle automation",
      "Brand and creative support",
      "Paid + SEO + Content + CRM",
      "Attribution across full funnel",
      "Weekly performance reviews",
      "Quarterly strategy sprints",
      "Dedicated account manager",
      "Priority WhatsApp channel",
    ],
    excludes: ["Full rebrand", "Fractional CMO (add-on)"],
    servicesIncluded: [
      "paid-media",
      "seo",
      "content",
      "web-development",
      "crm-automation",
      "branding",
    ],
    supportLevel: "dedicated",
    onboardingWeeks: 4,
    order: 4,
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    tagline: "Custom engagement, custom scope.",
    description:
      "For multi-market, multi-brand, or multi-product organisations. Everything is scoped to your operating reality. Talk to us.",
    priceMonthly: 0,
    currency: "NGN",
    billingPeriod: "MONTHLY",
    featured: false,
    bestFor: "Multi-market or multi-brand organisations.",
    includes: [
      "Custom scope",
      "Multi-market execution",
      "Multi-brand management",
      "Dedicated pods",
      "Executive-level reporting",
      "Custom integrations",
      "SLAs and contract terms",
    ],
    excludes: [],
    servicesIncluded: [],
    supportLevel: "dedicated",
    onboardingWeeks: 6,
    order: 5,
  },
];

export function getPackage(id: PackageTier): Package | undefined {
  return packages.find((p) => p.id === id);
}

export const featuredPackage: Package | undefined = packages.find((p) => p.featured);
