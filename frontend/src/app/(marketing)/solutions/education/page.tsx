import type { Metadata } from "next";

import { IndustrySolutionPage } from "@/components/marketing/IndustrySolutionPage";

export const metadata: Metadata = {
  title: "Education",
  description: "Enrolment growth systems for schools and learning brands.",
};

export default function SolutionPage() {
  return (
    <IndustrySolutionPage
      eyebrow="Solutions · Education"
      title={
        <>
          Clear offers. Clear enquiry paths.{" "}
          <span className="font-semibold text-neutral-600">
            Built for schools.
          </span>
        </>
      }
      description="Help parents and students understand what you offer - and how to enrol."
      body={[
        "We map brand, demand, sales, and content - then spend only where enrolment is stuck.",
        "Typical work starts with a free check, then a focused plan for enquiries and enrolments.",
      ]}
      focus={[
        {
          title: "Offer clarity",
          body: "One clear sentence for what you teach and who it is for.",
        },
        {
          title: "Enquiry path",
          body: "A simple way to ask, visit, or enrol without confusion.",
        },
        {
          title: "Follow-up",
          body: "Warm leads get called back before they cool off.",
        },
      ]}
      industryLabel="Education"
    />
  );
}
