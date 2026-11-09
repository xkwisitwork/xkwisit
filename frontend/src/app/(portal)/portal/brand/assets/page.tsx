"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { BrandAssetGrid, useBrandAssets } from "@/features/brand";

export default function PortalBrandAssetsPage() {
  const { data = [], isLoading } = useBrandAssets();

  return (
    <div className="space-y-6">
      <PageHeader title="Brand assets" description="Approved assets for your brand." />
      <BrandAssetGrid assets={data} loading={isLoading} />
    </div>
  );
}
