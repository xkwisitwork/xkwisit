import type { BrandAssetFilters } from "../types";

export const brandKeys = {
  all: ["brand"] as const,

  assets: () => [...brandKeys.all, "assets"] as const,
  assetList: (filters: Partial<BrandAssetFilters>) =>
    [...brandKeys.assets(), { filters }] as const,

  guidelines: (clientId?: string | null) =>
    [...brandKeys.all, "guidelines", clientId ?? "default"] as const,

  approvals: (clientId?: string | null) =>
    [...brandKeys.all, "approvals", clientId ?? "all"] as const,

  revisions: (clientId?: string | null) =>
    [...brandKeys.all, "revisions", clientId ?? "all"] as const,

  stats: () => [...brandKeys.all, "stats"] as const,
} as const;
