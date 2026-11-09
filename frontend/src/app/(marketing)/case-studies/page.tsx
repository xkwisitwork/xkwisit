import type { Metadata } from "next";
import { MarketingPageCanvas } from "@/components/marketing/MarketingPageHero";
import { CaseStudiesPageBody } from "@/components/marketing/pages/cases/CaseStudiesPageBody";
import { CaseStudyGallery } from "@/components/marketing/pages/cases/CaseStudyGallery";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How Xkwisit rebuilt growth systems for African operators.",
};

const cases = [
  {
    slug: "northline-commerce",
    title: "Northline Commerce",
    result: "Offer clarity first",
    summary:
      "A clearer offer and a rebuilt landing page turned the same visitors into people ready to buy.",
    image: "/images/levers/brand-storefront.jpg",
  },
  {
    slug: "harbor-health",
    title: "Harbor Health",
    result: "Follow-up fixed",
    summary:
      "The brand, the content, and the follow-up finally pointed at the same patient bookings.",
    image: "/images/people/smile-b.jpg",
  },
  {
    slug: "ledger-labs",
    title: "Ledger Labs",
    result: "Sales stages cleared",
    summary: "Clearer sales stages, and ads that matched them, unstuck the deals.",
    image: "/images/levers/sales-pipeline.jpg",
  },
] as const;

export default function CaseStudiesPage() {
  return (
    <MarketingPageCanvas>
      <CaseStudyGallery cases={cases} />
      <CaseStudiesPageBody />
    </MarketingPageCanvas>
  );
}
