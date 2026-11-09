"use client";

import { useCallback, useMemo, useState } from "react";

import { emptyProjectFilters, type ProjectFilterState } from "../types";

export function useProjectFilters(initial: Partial<ProjectFilterState> = {}) {
  const [filters, setFilters] = useState<ProjectFilterState>({
    ...emptyProjectFilters,
    ...initial,
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const activeCount = useMemo(() => {
    let count = 0;

    if (filters.search) count += 1;
    if (filters.statuses.length) count += 1;
    if (filters.clientId) count += 1;
    if (filters.ownerId) count += 1;

    return count;
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof ProjectFilterState>(key: K, value: ProjectFilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters({ ...emptyProjectFilters });
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
