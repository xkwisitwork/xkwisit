"use client";

import { useQuery } from "@tanstack/react-query";

import { getUtilization, listCapacity, listTimesheets } from "../api/team.api";
import { teamKeys } from "../api/queryKeys";

export function useCapacity(enabled = true) {
  return useQuery({
    queryKey: teamKeys.capacity(),
    queryFn: ({ signal }) => listCapacity(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useTimesheets(enabled = true) {
  return useQuery({
    queryKey: teamKeys.timesheets(),
    queryFn: ({ signal }) => listTimesheets(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useUtilization(enabled = true) {
  return useQuery({
    queryKey: teamKeys.utilization(),
    queryFn: ({ signal }) => getUtilization(signal),
    enabled,
    staleTime: 30_000,
  });
}
