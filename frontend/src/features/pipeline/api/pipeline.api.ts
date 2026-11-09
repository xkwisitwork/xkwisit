import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  MovePipelineCardPayload,
  PipelineBoardData,
  PipelineFilterState,
  PipelineForecastData,
  PipelineSummary,
} from "../types";
import { PIPELINE_BOARD_STAGES } from "../types";

const EMPTY_MONEY = { amount: 0, currency: "NGN" as const };

function emptyBoard(): PipelineBoardData {
  return {
    currency: "NGN",
    updatedAt: new Date().toISOString(),
    columns: PIPELINE_BOARD_STAGES.map((stage) => ({
      stage,
      label: stage,
      cards: [],
      totalValue: EMPTY_MONEY,
      weightedValue: EMPTY_MONEY,
    })),
  };
}

function emptySummary(): PipelineSummary {
  return {
    openDeals: 0,
    totalPipeline: EMPTY_MONEY,
    weightedPipeline: EMPTY_MONEY,
    avgDealSize: EMPTY_MONEY,
    winRate: 0,
    avgDaysToClose: 0,
    closingThisMonth: 0,
  };
}

function emptyForecast(): PipelineForecastData {
  return {
    currency: "NGN",
    points: [],
    summary: emptySummary(),
  };
}

function withFilters(
  board: PipelineBoardData,
  filters: Partial<PipelineFilterState>,
): PipelineBoardData {
  const search = filters.search?.trim().toLowerCase() ?? "";
  const columns = board.columns.map((col) => {
    if (filters.stages?.length && !filters.stages.includes(col.stage)) {
      return { ...col, cards: [] };
    }
    let cards = col.cards;
    if (search) {
      cards = cards.filter(
        (c) =>
          c.title.toLowerCase().includes(search) ||
          c.company.toLowerCase().includes(search) ||
          (c.contactName?.toLowerCase().includes(search) ?? false),
      );
    }
    if (filters.ownerId) {
      cards = cards.filter((c) => c.ownerId === filters.ownerId);
    }
    if (filters.priority) {
      cards = cards.filter((c) => c.priority === filters.priority);
    }
    if (filters.minValue != null) {
      cards = cards.filter((c) => c.value.amount >= filters.minValue!);
    }
    if (filters.maxValue != null) {
      cards = cards.filter((c) => c.value.amount <= filters.maxValue!);
    }
    const total = cards.reduce((s, c) => s + c.value.amount, 0);
    const weighted = cards.reduce(
      (s, c) => s + c.value.amount * (c.probability / 100),
      0,
    );
    return {
      ...col,
      cards,
      totalValue: { amount: total, currency: board.currency },
      weightedValue: { amount: Math.round(weighted), currency: board.currency },
    };
  });

  return { ...board, columns };
}

export async function getPipelineBoard(
  filters: Partial<PipelineFilterState> = {},
  signal?: AbortSignal,
): Promise<PipelineBoardData> {
  try {
    const data = await apiClient<PipelineBoardData>(endpoints.pipeline.board, {
      method: "GET",
      query: {
        search: filters.search,
        ownerId: filters.ownerId ?? undefined,
        stages: filters.stages?.join(","),
        priority: filters.priority ?? undefined,
        minValue: filters.minValue ?? undefined,
        maxValue: filters.maxValue ?? undefined,
      },
      signal,
    });
    return withFilters(data, filters);
  } catch {
    return withFilters(emptyBoard(), filters);
  }
}

export async function getPipelineSummary(signal?: AbortSignal): Promise<PipelineSummary> {
  try {
    return await apiClient<PipelineSummary>(endpoints.pipeline.summary, {
      method: "GET",
      signal,
    });
  } catch {
    return emptySummary();
  }
}

export async function getPipelineForecast(
  signal?: AbortSignal,
): Promise<PipelineForecastData> {
  try {
    return await apiClient<PipelineForecastData>(endpoints.pipeline.forecast, {
      method: "GET",
      signal,
    });
  } catch {
    return emptyForecast();
  }
}

export async function movePipelineCard(payload: MovePipelineCardPayload): Promise<void> {
  await apiClient(endpoints.opportunities.moveStage(payload.cardId), {
    method: "POST",
    body: {
      stage: payload.toStage,
      fromStage: payload.fromStage,
      index: payload.index,
    },
  });
}
