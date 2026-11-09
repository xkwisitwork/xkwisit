"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { PipelineBoardData, PipelineStageId } from "../types";
import { useMovePipelineCard } from "../hooks/usePipeline";
import { usePipelineDrag } from "../hooks/usePipelineDrag";
import { PipelineColumn } from "./PipelineColumn";

export type PipelineBoardProps = {
  board?: PipelineBoardData;
  loading?: boolean;
};

export function PipelineBoard({ board, loading }: PipelineBoardProps) {
  const { dragging, overStage, onDragStart, onDragEnd, onDragEnterColumn } =
    usePipelineDrag();
  const move = useMovePipelineCard();

  if (loading || !board) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangle"
            className="h-[28rem] w-72 shrink-0 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  const handleDrop = (toStage: PipelineStageId) => {
    if (!dragging || dragging.fromStage === toStage) {
      onDragEnd();
      return;
    }
    move.mutate({
      cardId: dragging.cardId,
      fromStage: dragging.fromStage,
      toStage,
    });
    onDragEnd();
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {board.columns.map((column) => (
        <PipelineColumn
          key={column.stage}
          column={column}
          isOver={overStage === column.stage}
          draggingCardId={dragging?.cardId}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragEnter={onDragEnterColumn}
          onDropCard={handleDrop}
        />
      ))}
    </div>
  );
}
