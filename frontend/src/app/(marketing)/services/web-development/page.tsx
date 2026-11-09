import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WebDevelopmentView } from "@/components/marketing/pages/service-detail/WebDevelopmentView";
import { getServiceBySlug } from "@/config/services";
import { siteConfig } from "@/config/site";

const service = getServiceBySlug("web-development");

export const metadata: Metadata = {
  title: service?.name ?? "Web Development",
  description: service?.tagline ?? siteConfig.description,
};

export default function ServicePage() {
  if (!service) notFound();
  return <WebDevelopmentView service={service} />;
}
