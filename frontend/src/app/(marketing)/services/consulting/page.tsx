import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailView } from "@/components/marketing/ServiceDetailView";
import { getServiceBySlug } from "@/config/services";
import { siteConfig } from "@/config/site";

const service = getServiceBySlug("consulting");

export const metadata: Metadata = {
  title: service?.name ?? "Service",
  description: service?.tagline ?? siteConfig.description,
};

export default function ServicePage() {
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
