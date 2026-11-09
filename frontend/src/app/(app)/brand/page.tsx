"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { BrandWorkspace } from "@/features/brand";

export default function BrandPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Brand"
        description="Assets, guidelines, approvals, and revisions."
      />
      <BrandWorkspace />
    </div>
  );
}
