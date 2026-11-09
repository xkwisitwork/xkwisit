"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  approveBrandItem,
  getBrandGuidelines,
  getBrandStats,
  listBrandApprovals,
  listBrandRevisions,
  requestBrandChanges,
  updateBrandGuidelines,
} from "../api/brand.api";
import { brandKeys } from "../api/queryKeys";
import type { BrandApprovalAction, UpdateBrandGuidelinesPayload } from "../types";

export function useBrandGuidelines(clientId?: string | null, enabled = true) {
  return useQuery({
    queryKey: brandKeys.guidelines(clientId),
    queryFn: ({ signal }) => getBrandGuidelines(clientId, signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useUpdateBrandGuidelines(clientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateBrandGuidelinesPayload) => {
      try {
        return await updateBrandGuidelines(clientId, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(brandKeys.guidelines(clientId), data);
      toast.success("Guidelines updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useBrandApprovals(clientId?: string | null, enabled = true) {
  return useQuery({
    queryKey: brandKeys.approvals(clientId),
    queryFn: ({ signal }) => listBrandApprovals(clientId, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useApproveBrandItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload?: BrandApprovalAction;
    }) => {
      try {
        return await approveBrandItem(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all });
      toast.success("Approved.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useRequestBrandChanges() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: BrandApprovalAction }) => {
      try {
        return await requestBrandChanges(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all });
      toast.success("Changes requested.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useBrandRevisions(clientId?: string | null, enabled = true) {
  return useQuery({
    queryKey: brandKeys.revisions(clientId),
    queryFn: ({ signal }) => listBrandRevisions(clientId, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useBrandStats(enabled = true) {
  return useQuery({
    queryKey: brandKeys.stats(),
    queryFn: ({ signal }) => getBrandStats(signal),
    enabled,
    staleTime: 60_000,
  });
}
