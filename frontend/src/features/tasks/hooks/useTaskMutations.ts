"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import { createTask, deleteTask, moveTask, updateTask } from "../api/tasks.api";
import { taskKeys } from "../api/queryKeys";
import { projectKeys } from "@/features/projects/api/queryKeys";
import type { CreateTaskPayload, Task, UpdateTaskPayload } from "../types";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, CreateTaskPayload>({
    mutationFn: async (payload) => {
      try {
        return await createTask(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Task created.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateTask(id: string) {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, UpdateTaskPayload>({
    mutationFn: async (payload) => {
      try {
        return await updateTask(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Task updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useMoveTask() {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, { id: string; status: string }>({
    mutationFn: async ({ id, status }) => {
      try {
        return await moveTask(id, status);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        return await deleteTask(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Task deleted.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
