import type { Metadata } from "next";

import { IndustrySolutionPage } from "@/components/marketing/IndustrySolutionPage";

export const metadata: Metadata = {
  title: "Fintech",
  description: "Acquisition and activation systems for African fintech teams.",
};

export default function SolutionPage() {
  return (
    <IndustrySolutionPage
      eyebrow="Solutions · Fintech"
      title={
        <>
          Trust and conversion.{" "}
          <span className="font-semibold text-neutral-600">
            Not vanity traffic.
          </span>
        </>
      }
      description="Help the right users find you, trust you, and finish signup or activation."
      body={[
        "We map brand, demand, sales, and product conversion - then fix the stuck step first.",
        "Typical work starts with a free check, then a focused plan for acquisition and activation.",
      ]}
      focus={[
        {
          title: "Trust first",
          body: "Clear proof and a clean offer before more ad spend.",
        },
        {
          title: "Activation",
          body: "Users who sign up actually complete the next step.",
        },
        {
          title: "Measured growth",
          body: "Spend tied to activated users - not only clicks.",
        },
      ]}
      industryLabel="Fintech"
    />
  );
}
