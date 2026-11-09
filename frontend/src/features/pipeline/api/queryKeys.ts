import type { PipelineFilterState } from "../types";

export const pipelineKeys = {
  all: ["pipeline"] as const,
  board: (filters: Partial<PipelineFilterState> = {}) =>
    [...pipelineKeys.all, "board", filters] as const,
  summary: () => [...pipelineKeys.all, "summary"] as const,
  forecast: () => [...pipelineKeys.all, "forecast"] as const,
} as const;
