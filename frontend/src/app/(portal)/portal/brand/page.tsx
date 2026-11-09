"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { BrandGuidelinesView, useBrandGuidelines } from "@/features/brand";

export default function PortalBrandPage() {
  const { data, isLoading } = useBrandGuidelines();

  return (
    <div className="space-y-6">
      <PageHeader title="Brand" description="Your brand guidelines and identity." />
      <BrandGuidelinesView guidelines={data} loading={isLoading} />
    </div>
  );
}
