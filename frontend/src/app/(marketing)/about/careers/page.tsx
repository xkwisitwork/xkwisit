import type { Metadata } from "next";

import {
  MarketingPageCanvas,
  MarketingPageHero,
} from "@/components/marketing/MarketingPageHero";
import { CareersPageBody } from "@/components/marketing/pages/careers/CareersPageBody";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a consultancy that diagnoses first and executes with operators in the room.",
};

export default function Page() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        eyebrow="Careers"
        title="Build systems that ship"
        description="Join a consultancy that diagnoses first and executes with owners in the room."
        primaryHref={`mailto:${siteConfig.contact.email}`}
        primaryLabel="Email the team"
        secondaryHref="/about"
        secondaryLabel="About Xkwisit"
      />
      <CareersPageBody />
    </MarketingPageCanvas>
  );
}
