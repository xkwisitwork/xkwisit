"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  archiveProject,
  createProject,
  deleteProject,
  updateProject,
} from "../api/projects.api";
import { projectKeys } from "../api/queryKeys";
import type { CreateProjectPayload, Project, UpdateProjectPayload } from "../types";

export function useCreateProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Project, Error, CreateProjectPayload>({
    mutationFn: async (payload) => {
      try {
        return await createProject(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project created.");

      if (project?.id) {
        router.push(`/projects/${project.id}`);
      } else {
        router.push("/projects");
      }
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, UpdateProjectPayload>({
    mutationFn: async (payload) => {
      try {
        return await updateProject(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (project) => {
      queryClient.setQueryData(projectKeys.detail(id), project);
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      toast.success("Project updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useArchiveProject() {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, string>({
    mutationFn: async (id) => {
      try {
        return await archiveProject(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project archived.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        return await deleteProject(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project deleted.");
      router.push("/projects");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
