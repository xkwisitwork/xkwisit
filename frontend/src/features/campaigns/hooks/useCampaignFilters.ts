"use client";

import { useCallback, useMemo, useState } from "react";

import { emptyCampaignFilters, type CampaignFilters } from "../types";

export function useCampaignFilters(initial: Partial<CampaignFilters> = {}) {
  const [filters, setFilters] = useState<CampaignFilters>({
    ...emptyCampaignFilters,
    ...initial,
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.search) count += 1;
    if (filters.statuses.length) count += 1;
    if (filters.channels.length) count += 1;
    if (filters.objectives.length) count += 1;
    if (filters.clientId) count += 1;
    return count;
  }, [filters]);

  const updateFilter = useCallback(
    <K extends keyof CampaignFilters>(key: K, value: CampaignFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [],
  );

  const reset = useCallback(() => {
    setFilters({ ...emptyCampaignFilters });
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
