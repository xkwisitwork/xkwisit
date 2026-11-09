"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import { deleteBrandAsset, listBrandAssets, uploadBrandAsset } from "../api/brand.api";
import { brandKeys } from "../api/queryKeys";
import type { BrandAssetFilters, UploadBrandAssetPayload } from "../types";

export function useBrandAssets(filters: Partial<BrandAssetFilters> = {}, enabled = true) {
  return useQuery({
    queryKey: brandKeys.assetList(filters),
    queryFn: ({ signal }) => listBrandAssets(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useUploadBrandAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UploadBrandAssetPayload) => {
      try {
        return await uploadBrandAsset(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.assets() });
      toast.success("Asset uploaded.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteBrandAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await deleteBrandAsset(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.assets() });
      toast.success("Asset deleted.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
