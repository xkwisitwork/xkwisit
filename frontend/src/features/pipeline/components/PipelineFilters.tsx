"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LEAD_STATUS_LABELS } from "@/lib/constants/statuses";
import { cn } from "@/lib/utils/cn";

import { PIPELINE_BOARD_STAGES, type PipelineFilterState } from "../types";

export type PipelineFiltersProps = {
  filters: PipelineFilterState;
  activeCount: number;
  onUpdate: <K extends keyof PipelineFilterState>(
    key: K,
    value: PipelineFilterState[K],
  ) => void;
  onToggleStage: (stage: PipelineFilterState["stages"][number]) => void;
  onReset: () => void;
};

export function PipelineFilters({
  filters,
  activeCount,
  onUpdate,
  onToggleStage,
  onReset,
}: PipelineFiltersProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-neutral-400/60 bg-white p-4">
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
          <Input
            value={filters.search}
            onChange={(e) => onUpdate("search", e.target.value)}
            placeholder="Search company, deal, or contact…"
            className="pl-9"
          />
        </div>
        {activeCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<X className="h-4 w-4" />}
            onClick={onReset}
          >
            Clear ({activeCount})
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {PIPELINE_BOARD_STAGES.map((stage) => {
          const active = filters.stages.includes(stage);
          return (
            <button
              key={stage}
              type="button"
              onClick={() => onToggleStage(stage)}
              className={cn(
                "rounded-full border px-3 py-1 text-300 font-medium transition",
                active
                  ? "border-mint bg-mint text-white"
                  : "border-neutral-400 bg-white text-neutral-600 hover:border-mint/50",
              )}
            >
              {LEAD_STATUS_LABELS[stage]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
