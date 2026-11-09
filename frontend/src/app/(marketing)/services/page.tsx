import type { Metadata } from "next";

import { MarketingPageCanvas } from "@/components/marketing/MarketingPageHero";
import { ServicesPageBody } from "@/components/marketing/pages/services/ServicesPageBody";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description: `What ${siteConfig.name} delivers - branding, growth, and profit systems.`,
};

export default function ServicesPage() {
  return (
    <MarketingPageCanvas>
      <ServicesPageBody />
    </MarketingPageCanvas>
  );
}
