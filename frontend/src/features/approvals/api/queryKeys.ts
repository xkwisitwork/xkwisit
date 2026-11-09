import type { ApprovalFilterState } from "../types";

export const approvalKeys = {
  all: ["approvals"] as const,
  lists: () => [...approvalKeys.all, "list"] as const,
  list: (filters: Partial<ApprovalFilterState>, page: number, pageSize: number) =>
    [...approvalKeys.lists(), { filters, page, pageSize }] as const,
  details: () => [...approvalKeys.all, "detail"] as const,
  detail: (id: string) => [...approvalKeys.details(), id] as const,
  timeline: (id: string) => [...approvalKeys.detail(id), "timeline"] as const,
  stats: () => [...approvalKeys.all, "stats"] as const,
} as const;
