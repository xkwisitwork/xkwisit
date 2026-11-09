"use client";

import { useCallback, useMemo, useState } from "react";

import {
  emptyPipelineFilters,
  type PipelineFilterState,
  type PipelineStageId,
} from "../types";

export function usePipelineFilters(initial: Partial<PipelineFilterState> = {}) {
  const [filters, setFilters] = useState<PipelineFilterState>({
    ...emptyPipelineFilters,
    ...initial,
  });

  const updateFilter = useCallback(
    <K extends keyof PipelineFilterState>(key: K, value: PipelineFilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleStage = useCallback((stage: PipelineStageId) => {
    setFilters((prev) => {
      const has = prev.stages.includes(stage);
      return {
        ...prev,
        stages: has ? prev.stages.filter((s) => s !== stage) : [...prev.stages, stage],
      };
    });
  }, []);

  const reset = useCallback(() => {
    setFilters(emptyPipelineFilters);
  }, []);

  const activeCount = useMemo(() => {
    let n = 0;
    if (filters.search.trim()) n += 1;
    if (filters.ownerId) n += 1;
    if (filters.stages.length) n += 1;
    if (filters.priority) n += 1;
    if (filters.minValue != null || filters.maxValue != null) n += 1;
    return n;
  }, [filters]);

  return {
    filters,
    setFilters,
    updateFilter,
    toggleStage,
    reset,
    activeCount,
  };
}
