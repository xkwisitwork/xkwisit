"use client";

import { useQuery } from "@tanstack/react-query";

import { listBoardTasks, listMyTasks, listTasks } from "../api/tasks.api";
import { taskKeys } from "../api/queryKeys";
import type { TaskFilters } from "../types";

export function useTasks(filters: Partial<TaskFilters> = {}, enabled = true) {
  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: ({ signal }) => listTasks(filters, signal),
    enabled,
    staleTime: 20_000,
  });
}

export function useMyTasks(enabled = true) {
  return useQuery({
    queryKey: taskKeys.myTasks(),
    queryFn: ({ signal }) => listMyTasks(signal),
    enabled,
    staleTime: 20_000,
  });
}

export function useBoardTasks(filters: Partial<TaskFilters> = {}, enabled = true) {
  return useQuery({
    queryKey: taskKeys.board(filters),
    queryFn: ({ signal }) => listBoardTasks(filters, signal),
    enabled,
    staleTime: 20_000,
  });
}
