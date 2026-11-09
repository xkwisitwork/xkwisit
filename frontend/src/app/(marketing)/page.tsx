import type { Metadata } from "next";

import {
  BudgetAutopsy,
  CaseStudyPreview,
  ConstraintOracle,
  CtaSection,
  FaqSection,
  TeamShowcase,
  GrowthScoreTeaser,
  Hero,
  Methodology,
  CommercialTerms,
  ProjectsShowcase,
  ServicesGrid,
  Testimonials,
} from "@/components/marketing/sections";
import { PageWake } from "@/components/marketing/motion/Reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PageWake>
        <ConstraintOracle />
        <Methodology />
        <ServicesGrid />
        <ProjectsShowcase />
        <TeamShowcase />
        <GrowthScoreTeaser />
        <BudgetAutopsy />
        <CommercialTerms />
        <CaseStudyPreview />
        <Testimonials />
        <FaqSection />
        <CtaSection />
      </PageWake>
    </>
  );
}
