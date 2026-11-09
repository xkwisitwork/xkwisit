import type { Metadata } from "next";

import { IndustrySolutionPage } from "@/components/marketing/IndustrySolutionPage";

export const metadata: Metadata = {
  title: "Healthcare",
  description: "Patient acquisition and follow-up systems for clinics and health brands.",
};

export default function SolutionPage() {
  return (
    <IndustrySolutionPage
      eyebrow="Solutions · Healthcare"
      title={
        <>
          Enquiries that become booked visits.{" "}
          <span className="font-semibold text-neutral-600">
            Built for clinics.
          </span>
        </>
      }
      description="Ads, WhatsApp follow-up, and a clear offer - so interest turns into appointments."
      body={[
        "We map brand, demand, sales, and content - then fix the stuck part before more spend.",
        "Typical work starts with a free check, then a focused plan for patient enquiries and booking.",
      ]}
      focus={[
        {
          title: "Same-day reply",
          body: "Every enquiry gets a clear next step the same day.",
        },
        {
          title: "Trust & offer",
          body: "Patients understand what you offer and why to book now.",
        },
        {
          title: "Local presence",
          body: "People nearby can find you and leave a booking request.",
        },
      ]}
      industryLabel="Healthcare"
    />
  );
}
