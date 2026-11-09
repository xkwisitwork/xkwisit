"use client";

import { Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

import { useDeleteBrandAsset } from "../hooks/useBrandAssets";
import type { BrandAsset } from "../types";

export type BrandAssetGridProps = {
  assets: BrandAsset[];
  loading?: boolean;
  canDelete?: boolean;
};

const TYPE_LABELS: Record<BrandAsset["type"], string> = {
  LOGO: "Logo",
  ICON: "Icon",
  COLOR_PALETTE: "Colors",
  FONT: "Font",
  IMAGE: "Image",
  TEMPLATE: "Template",
  DOCUMENT: "Document",
  OTHER: "Other",
};

export function BrandAssetGrid({
  assets,
  loading = false,
  canDelete = false,
}: BrandAssetGridProps) {
  const deleteMutation = useDeleteBrandAsset();

  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-44 w-full" />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return <p className="text-400 text-neutral-600">No brand assets uploaded yet.</p>;
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100"
        >
          <div className="relative flex h-36 items-center justify-center bg-neutral-200">
            {asset.thumbnailUrl || asset.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset.thumbnailUrl ?? asset.url}
                alt={asset.name}
                className="max-h-full max-w-full object-contain p-4"
              />
            ) : (
              <span className="text-300 text-neutral-600">No preview</span>
            )}
          </div>
          <div className="space-y-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-400 font-medium">{asset.name}</p>
                <p className="text-200 text-neutral-600">{asset.clientName}</p>
              </div>
              {canDelete ? (
                <IconButton
                  aria-label="Delete asset"
                  icon={<Trash2 className="h-4 w-4" />}
                  variant="ghost"
                  size="icon-sm"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(asset.id)}
                />
              ) : null}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="muted" size="sm">
                {TYPE_LABELS[asset.type]}
              </Badge>
              <Badge variant="muted" size="sm">
                v{asset.version}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
