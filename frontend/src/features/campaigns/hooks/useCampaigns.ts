"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  createCampaign,
  deleteCampaign,
  getCampaign,
  getCampaignStats,
  listCampaigns,
  pauseCampaign,
  resumeCampaign,
  updateCampaign,
} from "../api/campaigns.api";
import { campaignKeys } from "../api/queryKeys";
import type {
  Campaign,
  CampaignFilters,
  CreateCampaignPayload,
  UpdateCampaignPayload,
} from "../types";

export type UseCampaignsOptions = {
  filters?: Partial<CampaignFilters>;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
};

export function useCampaigns({
  filters = {},
  page = 1,
  pageSize = 20,
  enabled = true,
}: UseCampaignsOptions = {}) {
  return useQuery({
    queryKey: campaignKeys.list(filters, page, pageSize),
    queryFn: ({ signal }) => listCampaigns(filters, page, pageSize, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useCampaign(id: string, enabled = true) {
  return useQuery({
    queryKey: campaignKeys.detail(id),
    queryFn: ({ signal }) => getCampaign(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useCampaignStats(enabled = true) {
  return useQuery({
    queryKey: campaignKeys.stats(),
    queryFn: ({ signal }) => getCampaignStats(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Campaign, Error, CreateCampaignPayload>({
    mutationFn: async (payload) => {
      try {
        return await createCampaign(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (campaign) => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.all });
      toast.success("Campaign created.");

      if (campaign?.id) {
        router.push(`/campaigns/${campaign.id}`);
      } else {
        router.push("/campaigns");
      }
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateCampaign(id: string) {
  const queryClient = useQueryClient();

  return useMutation<Campaign, Error, UpdateCampaignPayload>({
    mutationFn: async (payload) => {
      try {
        return await updateCampaign(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (campaign) => {
      queryClient.setQueryData(campaignKeys.detail(id), campaign);
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
      toast.success("Campaign updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function usePauseCampaign() {
  const queryClient = useQueryClient();

  return useMutation<Campaign, Error, string>({
    mutationFn: async (id) => {
      try {
        return await pauseCampaign(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (campaign) => {
      if (campaign?.id) {
        queryClient.setQueryData(campaignKeys.detail(campaign.id), campaign);
      }
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
      toast.success("Campaign paused.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useResumeCampaign() {
  const queryClient = useQueryClient();

  return useMutation<Campaign, Error, string>({
    mutationFn: async (id) => {
      try {
        return await resumeCampaign(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (campaign) => {
      if (campaign?.id) {
        queryClient.setQueryData(campaignKeys.detail(campaign.id), campaign);
      }
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() });
      toast.success("Campaign resumed.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        return await deleteCampaign(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.all });
      toast.success("Campaign deleted.");
      router.push("/campaigns");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
