import type { Metadata } from "next";

import { MarketingPageCanvas } from "@/components/marketing/MarketingPageHero";
import { SolutionsFrames } from "@/components/marketing/pages/solutions/SolutionsFrames";
import { SolutionsPageBody } from "@/components/marketing/pages/solutions/SolutionsPageBody";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Industry growth systems - e-commerce, real estate, healthcare, education, fintech, hospitality.",
};

const industries = [
  {
    href: "/solutions/ecommerce",
    title: "E-commerce",
    tagline: "Storefronts that convert - and keep customers.",
    image: "/images/levers/brand-storefront.jpg",
  },
  {
    href: "/solutions/real-estate",
    title: "Real estate",
    tagline: "One story for brand and sales before the next launch spend.",
    image: "/images/levers/real-estate-court.jpg",
  },
  {
    href: "/solutions/healthcare",
    title: "Healthcare",
    tagline: "Enquiries that become booked visits - same-day follow-up.",
    image: "/images/people/smile-b.jpg",
  },
  {
    href: "/solutions/education",
    title: "Education",
    tagline: "Clear offers and enquiry paths for schools and programmes.",
    image: "/images/people/desk-review.jpg",
  },
  {
    href: "/solutions/fintech",
    title: "Fintech",
    tagline: "Trust, conversion, and activation - not vanity traffic.",
    image: "/images/desks/intelligence.jpg",
  },
  {
    href: "/solutions/hospitality",
    title: "Hospitality",
    tagline: "Local presence and a clear path from view to booking.",
    image: "/images/levers/hospitality-table.jpg",
  },
] as const;

export default function SolutionsPage() {
  return (
    <MarketingPageCanvas>
      <SolutionsFrames industries={industries} />
      <SolutionsPageBody />
    </MarketingPageCanvas>
  );
}
