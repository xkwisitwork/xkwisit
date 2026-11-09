"use client";

import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/currency";

import type { PipelineColumnData as PipelineColumnType, PipelineStageId } from "../types";
import { PipelineCard } from "./PipelineCard";

export type PipelineColumnProps = {
  column: PipelineColumnType;
  isOver?: boolean;
  draggingCardId?: string | null;
  onDragStart?: (cardId: string, stage: PipelineStageId) => void;
  onDragEnd?: () => void;
  onDropCard?: (toStage: PipelineStageId) => void;
  onDragEnter?: (stage: PipelineStageId) => void;
};

export function PipelineColumn({
  column,
  isOver,
  draggingCardId,
  onDragStart,
  onDragEnd,
  onDropCard,
  onDragEnter,
}: PipelineColumnProps) {
  return (
    <section
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-2xl border border-neutral-400/50 bg-neutral-100/80",
        isOver && "border-mint bg-mint-soft/40 ring-1 ring-mint/30",
      )}
      onDragOver={(e) => {
        e.preventDefault();
        onDragEnter?.(column.stage);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDropCard?.(column.stage);
      }}
    >
      <header className="sticky top-0 z-10 flex items-start justify-between gap-2 border-b border-neutral-400/40 bg-neutral-100/95 px-3 py-3 backdrop-blur">
        <div>
          <p className="text-300 font-semibold uppercase tracking-wide text-neutral-600">
            {column.label}
          </p>
          <p className="mt-0.5 text-200 tabular-nums text-neutral-600">
            {column.cards.length} ·{" "}
            {formatCurrency(column.totalValue.amount, {
              currency: column.totalValue.currency,
              compact: true,
              fractionDigits: 1,
            })}
          </p>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-200 font-semibold tabular-nums text-neutral-700 shadow-sm">
          {column.cards.length}
        </span>
      </header>

      <div className="flex max-h-[calc(100vh-16rem)] flex-col gap-2 overflow-y-auto p-2">
        {column.cards.length === 0 ? (
          <p className="px-2 py-8 text-center text-300 text-neutral-600">
            Drop deals here
          </p>
        ) : (
          column.cards.map((card) => (
            <PipelineCard
              key={card.id}
              card={card}
              dragging={draggingCardId === card.id}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </section>
  );
}
