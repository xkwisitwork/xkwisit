import type { Metadata } from "next";

import { IndustrySolutionPage } from "@/components/marketing/IndustrySolutionPage";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Paid, SEO, CRM, and retention loops for African e-commerce brands.",
};

export default function SolutionPage() {
  return (
    <IndustrySolutionPage
      eyebrow="Solutions · E-commerce"
      title={
        <>
          Storefronts that convert.{" "}
          <span className="font-semibold text-neutral-600">
            Built for e-commerce owners.
          </span>
        </>
      }
      description="Paid, SEO, CRM, and retention loops for African e-commerce brands."
      body={[
        "We map brand, ads, the product page, and follow-up - then spend only on the part that is actually broken.",
        "Typical work starts with a free check, then a focused project tuned to how your shop sells.",
      ]}
      focus={[
        {
          title: "Offer clarity",
          body: "Fix the message on the page before buying more traffic.",
        },
        {
          title: "Checkout & payments",
          body: "Make sure a customer can finish buying online.",
        },
        {
          title: "Repeat sales",
          body: "Keep buyers coming back with clear follow-up.",
        },
      ]}
      industryLabel="E-commerce"
    />
  );
}
