"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { BrandAssetGrid, BrandAssetUpload, useBrandAssets } from "@/features/brand";

export default function BrandAssetsPage() {
  const { data = [], isLoading } = useBrandAssets();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brand assets"
        description="Logos, templates, and shared brand files."
      />
      <BrandAssetUpload clientId="" />
      <BrandAssetGrid assets={data} loading={isLoading} canDelete />
    </div>
  );
}
