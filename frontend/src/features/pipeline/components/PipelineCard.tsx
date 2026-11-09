"use client";

import Link from "next/link";
import { Clock, GripVertical, User } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/currency";

import type { PipelineCardData as PipelineCardType, PipelineStageId } from "../types";

const PRIORITY_TONE: Record<
  PipelineCardType["priority"],
  "muted" | "info" | "warning" | "destructive"
> = {
  LOW: "muted",
  MEDIUM: "info",
  HIGH: "warning",
  URGENT: "destructive",
};

export type PipelineCardProps = {
  card: PipelineCardType;
  onDragStart?: (cardId: string, stage: PipelineStageId) => void;
  onDragEnd?: () => void;
  dragging?: boolean;
};

export function PipelineCard({
  card,
  onDragStart,
  onDragEnd,
  dragging,
}: PipelineCardProps) {
  const href = card.opportunityId
    ? `/crm/opportunities/${card.opportunityId}`
    : card.leadId
      ? `/crm/leads/${card.leadId}`
      : undefined;

  const overdue =
    card.nextFollowUpAt != null && new Date(card.nextFollowUpAt).getTime() < Date.now();

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", card.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart?.(card.id, card.stage);
      }}
      onDragEnd={() => onDragEnd?.()}
      className={cn(
        "group cursor-grab rounded-xl border border-neutral-400/70 bg-white p-3 shadow-sm transition",
        "hover:border-mint/40 hover:shadow-md active:cursor-grabbing",
        dragging && "opacity-50 ring-2 ring-mint/40",
        overdue && "border-l-4 border-l-destructive",
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 opacity-0 transition group-hover:opacity-100" />
        <div className="min-w-0 flex-1">
          {href ? (
            <Link
              href={href}
              className="font-display text-400 font-semibold leading-snug text-neutral-900 hover:text-mint"
              onClick={(e) => e.stopPropagation()}
            >
              {card.title}
            </Link>
          ) : (
            <p className="font-display text-400 font-semibold leading-snug text-neutral-900">
              {card.title}
            </p>
          )}
          <p className="mt-0.5 truncate text-300 text-neutral-600">{card.company}</p>
        </div>
        <Badge variant={PRIORITY_TONE[card.priority]} size="sm">
          {card.priority}
        </Badge>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-400 font-semibold tabular-nums text-neutral-900">
          {formatCurrency(card.value.amount, {
            currency: card.value.currency,
            compact: true,
            fractionDigits: 1,
          })}
        </p>
        <p className="text-200 tabular-nums text-neutral-600">{card.probability}%</p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-200 text-neutral-600">
        <span className="inline-flex items-center gap-1 truncate">
          <User className="h-3 w-3" />
          {card.ownerName ?? "Unassigned"}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {card.daysInStage}d
        </span>
      </div>
    </article>
  );
}
