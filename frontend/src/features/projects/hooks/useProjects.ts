"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { listProjects } from "../api/projects.api";
import { projectKeys } from "../api/queryKeys";
import type { ProjectFilterState } from "../types";

export type UseProjectsOptions = {
  filters?: Partial<ProjectFilterState>;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
};

export function useProjects({
  filters = {},
  page = 1,
  pageSize = 20,
  enabled = true,
}: UseProjectsOptions = {}) {
  return useQuery({
    queryKey: projectKeys.list(filters, page, pageSize),
    queryFn: ({ signal }) => listProjects(filters, page, pageSize, signal),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
