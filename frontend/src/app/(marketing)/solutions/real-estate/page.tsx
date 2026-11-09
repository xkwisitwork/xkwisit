import type { Metadata } from "next";

import { IndustrySolutionPage } from "@/components/marketing/IndustrySolutionPage";

export const metadata: Metadata = {
  title: "Real estate",
  description: "Brand, demand, and sales alignment for African property teams.",
};

export default function SolutionPage() {
  return (
    <IndustrySolutionPage
      eyebrow="Solutions · Real estate"
      title={
        <>
          One story before the launch spend.{" "}
          <span className="font-semibold text-neutral-600">
            Built for property teams.
          </span>
        </>
      }
      description="Brand, ads, and sales saying the same thing - so enquiries turn into viewings and deals."
      body={[
        "We map brand, demand, sales, and content - then agree the weekly numbers so the team spends on what is stuck.",
        "Typical work starts with a free check, then a focused plan for your next launch or pipeline.",
      ]}
      focus={[
        {
          title: "Aligned story",
          body: "Brand and sales tell the same story before ads go live.",
        },
        {
          title: "Enquiry follow-up",
          body: "Every lead has an owner and a same-day reply rule.",
        },
        {
          title: "Launch readiness",
          body: "Hold spend until the offer and landing page are clear.",
        },
      ]}
      industryLabel="Real estate"
    />
  );
}
