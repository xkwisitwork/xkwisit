import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CrmAutomationView } from "@/components/marketing/pages/service-detail/CrmAutomationView";
import { getServiceBySlug } from "@/config/services";
import { siteConfig } from "@/config/site";

const service = getServiceBySlug("crm-automation");

export const metadata: Metadata = {
  title: service?.name ?? "CRM & Automation",
  description: service?.tagline ?? siteConfig.description,
};

export default function ServicePage() {
  if (!service) notFound();
  return <CrmAutomationView service={service} />;
}
