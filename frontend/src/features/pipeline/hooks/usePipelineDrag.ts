"use client";

import { useCallback, useState } from "react";

import type { PipelineStageId } from "../types";

export type DragState = {
  cardId: string;
  fromStage: PipelineStageId;
} | null;

/**
 * Lightweight drag helpers for the pipeline board (HTML5 DnD).
 * Pair with `useMovePipelineCard` for persistence.
 */
export function usePipelineDrag() {
  const [dragging, setDragging] = useState<DragState>(null);
  const [overStage, setOverStage] = useState<PipelineStageId | null>(null);

  const onDragStart = useCallback((cardId: string, fromStage: PipelineStageId) => {
    setDragging({ cardId, fromStage });
  }, []);

  const onDragEnd = useCallback(() => {
    setDragging(null);
    setOverStage(null);
  }, []);

  const onDragEnterColumn = useCallback((stage: PipelineStageId) => {
    setOverStage(stage);
  }, []);

  return {
    dragging,
    overStage,
    onDragStart,
    onDragEnd,
    onDragEnterColumn,
  };
}
