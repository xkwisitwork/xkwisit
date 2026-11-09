"use client";

import { useCallback, useMemo, useState } from "react";

import { emptyApprovalFilters, type ApprovalFilterState } from "../types";

export function useApprovalFilters(initial: Partial<ApprovalFilterState> = {}) {
  const [filters, setFilters] = useState<ApprovalFilterState>({
    ...emptyApprovalFilters,
    ...initial,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.search) count += 1;
    if (filters.statuses.length) count += 1;
    if (filters.resourceTypes.length) count += 1;
    if (filters.clientId) count += 1;
    if (filters.assigneeId) count += 1;
    if (filters.priority) count += 1;
    return count;
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof ApprovalFilterState>(key: K, value: ApprovalFilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters({ ...emptyApprovalFilters });
    setPage(1);
  }, []);

  return {
    filters,
    page,
    pageSize,
    activeCount,
    setFilters,
    updateFilter,
    setPage,
    setPageSize,
    reset,
  };
}
