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
  approveContent,
  createContent,
  deleteContent,
  getContent,
  getContentPerformance,
  getContentStats,
  listContent,
  listContentCalendar,
  listContentLibrary,
  listContentPipeline,
  requestContentChanges,
  updateContent,
} from "../api/content.api";
import { contentKeys } from "../api/queryKeys";
import type {
  ContentFilters,
  ContentItem,
  CreateContentPayload,
  UpdateContentPayload,
} from "../types";
import type { ContentApprovalAction } from "../api/content.api";

export type UseContentListOptions = {
  filters?: Partial<ContentFilters>;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
};

export function useContentList({
  filters = {},
  page = 1,
  pageSize = 20,
  enabled = true,
}: UseContentListOptions = {}) {
  return useQuery({
    queryKey: contentKeys.list(filters, page, pageSize),
    queryFn: ({ signal }) => listContent(filters, page, pageSize, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useContent(id: string, enabled = true) {
  return useQuery({
    queryKey: contentKeys.detail(id),
    queryFn: ({ signal }) => getContent(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useContentPipeline(
  filters: Partial<ContentFilters> = {},
  enabled = true,
) {
  return useQuery({
    queryKey: contentKeys.pipeline(filters),
    queryFn: ({ signal }) => listContentPipeline(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useContentCalendar(
  filters: Partial<ContentFilters> = {},
  enabled = true,
) {
  return useQuery({
    queryKey: contentKeys.calendar(filters),
    queryFn: ({ signal }) => listContentCalendar(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useContentLibrary(filters: Partial<ContentFilters> = {}, enabled = true) {
  return useQuery({
    queryKey: contentKeys.library(filters),
    queryFn: ({ signal }) => listContentLibrary(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useContentPerformance(
  filters: Partial<ContentFilters> = {},
  enabled = true,
) {
  return useQuery({
    queryKey: contentKeys.performance(filters),
    queryFn: ({ signal }) => getContentPerformance(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useContentStats(enabled = true) {
  return useQuery({
    queryKey: contentKeys.stats(),
    queryFn: ({ signal }) => getContentStats(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useCreateContent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ContentItem, Error, CreateContentPayload>({
    mutationFn: async (payload) => {
      try {
        return await createContent(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (item) => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
      toast.success("Content created.");
      if (item?.id) router.push(`/content/${item.id}`);
      else router.push("/content");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateContent(id: string) {
  const queryClient = useQueryClient();

  return useMutation<ContentItem, Error, UpdateContentPayload>({
    mutationFn: async (payload) => {
      try {
        return await updateContent(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (item) => {
      queryClient.setQueryData(contentKeys.detail(id), item);
      queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
      toast.success("Content updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useApproveContent() {
  const queryClient = useQueryClient();

  return useMutation<ContentItem, Error, { id: string; payload?: ContentApprovalAction }>(
    {
      mutationFn: async ({ id, payload }) => {
        try {
          return await approveContent(id, payload);
        } catch (error) {
          throw normalizeError(error);
        }
      },
      onSuccess: (item) => {
        if (item?.id) queryClient.setQueryData(contentKeys.detail(item.id), item);
        queryClient.invalidateQueries({ queryKey: contentKeys.all });
        toast.success("Content approved.");
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    },
  );
}

export function useRequestContentChanges() {
  const queryClient = useQueryClient();

  return useMutation<ContentItem, Error, { id: string; payload: ContentApprovalAction }>({
    mutationFn: async ({ id, payload }) => {
      try {
        return await requestContentChanges(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (item) => {
      if (item?.id) queryClient.setQueryData(contentKeys.detail(item.id), item);
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
      toast.success("Changes requested.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteContent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        return await deleteContent(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
      toast.success("Content deleted.");
      router.push("/content");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
