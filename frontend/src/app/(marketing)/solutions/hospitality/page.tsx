import type { Metadata } from "next";

import { IndustrySolutionPage } from "@/components/marketing/IndustrySolutionPage";

export const metadata: Metadata = {
  title: "Hospitality",
  description: "Booking and reputation systems for hotels and restaurants.",
};

export default function SolutionPage() {
  return (
    <IndustrySolutionPage
      eyebrow="Solutions · Hospitality"
      title={
        <>
          From view to booking.{" "}
          <span className="font-semibold text-neutral-600">
            Built for hotels and restaurants.
          </span>
        </>
      }
      description="Local presence, clear booking paths, and follow-up that fills tables and rooms."
      body={[
        "We map brand, demand, sales, and content - then fix the stuck part before more spend.",
        "Typical work starts with a free check, then a focused plan for bookings and reputation.",
      ]}
      focus={[
        {
          title: "Local findability",
          body: "Nearby guests can find you and leave a booking request.",
        },
        {
          title: "Booking path",
          body: "A clear next step from the page, WhatsApp, or call.",
        },
        {
          title: "Reputation",
          body: "Reviews and replies that support trust and repeat visits.",
        },
      ]}
      industryLabel="Hospitality"
    />
  );
}
