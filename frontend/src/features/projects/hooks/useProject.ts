"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getProject,
  getProjectDeliverables,
  getProjectMilestones,
} from "../api/projects.api";
import { projectKeys } from "../api/queryKeys";

export function useProject(id: string, enabled = true) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: ({ signal }) => getProject(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useProjectMilestones(id: string, enabled = true) {
  return useQuery({
    queryKey: projectKeys.milestones(id),
    queryFn: ({ signal }) => getProjectMilestones(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useProjectDeliverables(id: string, enabled = true) {
  return useQuery({
    queryKey: projectKeys.deliverables(id),
    queryFn: ({ signal }) => getProjectDeliverables(id, signal),
    enabled: enabled && Boolean(id),
  });
}
