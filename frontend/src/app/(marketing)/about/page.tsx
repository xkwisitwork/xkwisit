import type { Metadata } from "next";

import {
  MarketingPageCanvas,
  MarketingPageHero,
} from "@/components/marketing/MarketingPageHero";
import { AboutPageBody } from "@/components/marketing/pages/about/AboutPageBody";
import { ROUTES, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name} is a branding, sales, and business-growth consultancy for African operators.`,
};

export default function AboutPage() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        eyebrow="About"
        title={
          <>
            {siteConfig.name}.{" "}
            <span className="font-semibold text-neutral-600">
              Growth systems for African brands.
            </span>
          </>
        }
        description={siteConfig.description}
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref="/about/team"
        secondaryLabel="Meet the team"
        imageSrc="/images/people/founder-smile.jpg"
        imageAlt="Xkwisit team member"
        stats={[
          { value: "2 sides", label: "Your login + our system" },
          { value: "90 days", label: "Typical work period" },
          { value: "Free", label: "Assessment & X-Ray" },
        ]}
      />
      <AboutPageBody />
    </MarketingPageCanvas>
  );
}
