"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getPipelineBoard,
  getPipelineForecast,
  getPipelineSummary,
  movePipelineCard,
} from "../api/pipeline.api";
import { pipelineKeys } from "../api/queryKeys";
import type {
  MovePipelineCardPayload,
  PipelineBoardData,
  PipelineFilterState,
  PipelineStageId,
} from "../types";

export type UsePipelineBoardOptions = {
  filters?: Partial<PipelineFilterState>;
  enabled?: boolean;
};

export function usePipelineBoard({
  filters = {},
  enabled = true,
}: UsePipelineBoardOptions = {}) {
  return useQuery({
    queryKey: pipelineKeys.board(filters),
    queryFn: ({ signal }) => getPipelineBoard(filters, signal),
    enabled,
    staleTime: 30_000,
  });
}

export function usePipelineSummary(enabled = true) {
  return useQuery({
    queryKey: pipelineKeys.summary(),
    queryFn: ({ signal }) => getPipelineSummary(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function usePipelineForecast(enabled = true) {
  return useQuery({
    queryKey: pipelineKeys.forecast(),
    queryFn: ({ signal }) => getPipelineForecast(signal),
    enabled,
    staleTime: 60_000,
  });
}

export function useMovePipelineCard() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: MovePipelineCardPayload) => movePipelineCard(payload),
    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: pipelineKeys.all });
      const previous = qc.getQueriesData<PipelineBoardData>({
        queryKey: [...pipelineKeys.all, "board"],
      });

      qc.setQueriesData<PipelineBoardData>(
        { queryKey: [...pipelineKeys.all, "board"] },
        (board) => {
          if (!board) return board;
          return moveCardLocally(board, payload);
        },
      );

      return { previous };
    },
    onError: (_err, _payload, ctx) => {
      ctx?.previous.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
      toast.error("Couldn't move deal. Try again.");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: pipelineKeys.all });
    },
  });
}

function moveCardLocally(
  board: PipelineBoardData,
  payload: MovePipelineCardPayload,
): PipelineBoardData {
  let moved = null as PipelineBoardData["columns"][0]["cards"][0] | null;
  const without = board.columns.map((col) => {
    if (col.stage !== payload.fromStage) return col;
    const cards = col.cards.filter((c) => {
      if (c.id === payload.cardId) {
        moved = { ...c, stage: payload.toStage as PipelineStageId, daysInStage: 0 };
        return false;
      }
      return true;
    });
    return recount(col, cards, board.currency);
  });

  if (!moved) return board;

  return {
    ...board,
    columns: without.map((col) => {
      if (col.stage !== payload.toStage) return col;
      const cards = [...col.cards];
      const idx =
        payload.index != null ? Math.min(payload.index, cards.length) : cards.length;
      cards.splice(idx, 0, moved!);
      return recount(col, cards, board.currency);
    }),
  };
}

function recount(
  col: PipelineBoardData["columns"][number],
  cards: PipelineBoardData["columns"][number]["cards"],
  currency: PipelineBoardData["currency"],
) {
  const total = cards.reduce((s, c) => s + c.value.amount, 0);
  const weighted = cards.reduce((s, c) => s + c.value.amount * (c.probability / 100), 0);
  return {
    ...col,
    cards,
    totalValue: { amount: total, currency },
    weightedValue: { amount: Math.round(weighted), currency },
  };
}
