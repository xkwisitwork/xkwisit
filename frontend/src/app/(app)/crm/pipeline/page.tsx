"use client";

import Link from "next/link";
import { BarChart3, KanbanSquare } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  PipelineBoard,
  PipelineFilters,
  PipelineValueSummary,
  usePipelineBoard,
  usePipelineFilters,
  usePipelineSummary,
} from "@/features/pipeline";

export default function PipelinePage() {
  const { filters, updateFilter, toggleStage, reset, activeCount } = usePipelineFilters();
  const { data: board, isLoading: boardLoading } = usePipelineBoard({ filters });
  const { data: summary, isLoading: summaryLoading } = usePipelineSummary();

  return (
    <>
      <PageHeader
        title="Pipeline"
        description="Every open opportunity staged from first touch to closed-won."
        actions={
          <>
            <Button
              variant="outlined"
              leftIcon={<BarChart3 className="h-4 w-4" />}
              asChild
            >
              <Link href="/crm/pipeline/forecast">Forecast</Link>
            </Button>
            <Button
              variant="contained"
              leftIcon={<KanbanSquare className="h-4 w-4" />}
              asChild
            >
              <Link href="/crm/pipeline/board">Full board</Link>
            </Button>
          </>
        }
      />

      <div className="space-y-6">
        <PipelineValueSummary summary={summary} loading={summaryLoading} />
        <PipelineFilters
          filters={filters}
          activeCount={activeCount}
          onUpdate={updateFilter}
          onToggleStage={toggleStage}
          onReset={reset}
        />
        <PipelineBoard board={board} loading={boardLoading} />
      </div>
    </>
  );
}
