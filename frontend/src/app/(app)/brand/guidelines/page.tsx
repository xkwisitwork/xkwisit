"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { BrandGuidelinesView, useBrandGuidelines } from "@/features/brand";

export default function BrandGuidelinesPage() {
  const { data, isLoading } = useBrandGuidelines();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brand guidelines"
        description="Colors, type, voice, and usage rules."
      />
      <BrandGuidelinesView guidelines={data} loading={isLoading} />
    </div>
  );
}
