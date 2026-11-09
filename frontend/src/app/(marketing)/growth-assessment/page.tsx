import type { Metadata } from "next";

import { MarketingPageCanvas, MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { AssessmentComposer } from "@/components/marketing/pages/assessment/AssessmentComposer";
import { AssessmentPageBody } from "@/components/marketing/pages/assessment/AssessmentPageBody";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Growth Assessment",
  description:
    "Two free doors. Answer the Growth Assessment, or paste your website into the Business X-Ray.",
};

export default function GrowthAssessmentLandingPage() {
  return (
    <MarketingPageCanvas className="overflow-x-clip">
      <MarketingPageHero
        introOnly
        imageSrc="/images/people/method-monday.jpg"
        imageAlt="Monday review"
        eyebrow="Free tools"
        title={
          <>
            Answer the questions.{" "}
            <span className="font-semibold text-neutral-600">
              Or just paste the site.
            </span>
          </>
        }
        description={`Two free doors into ${siteConfig.name}. The assessment makes you think. The X-Ray looks at what the public can already see. The score is our reading, not a lab result.`}
        primaryHref="#composer"
        primaryLabel="Open the desk"
        secondaryHref="/growth-assessment/start"
        secondaryLabel="Start assessment"
      />

      <section
        id="composer"
        className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F4FF_38%,#FFFFFF_100%)]"
      >
        <Container className="px-4 py-10 mobile-sm:px-5 tablet:px-8 tablet:py-14">
          <AssessmentComposer />
        </Container>
      </section>

      <AssessmentPageBody />
    </MarketingPageCanvas>
  );
}
