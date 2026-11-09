"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  PipelineBoard,
  PipelineFilters,
  usePipelineBoard,
  usePipelineFilters,
} from "@/features/pipeline";

export default function PipelineBoardPage() {
  const { filters, updateFilter, toggleStage, reset, activeCount } = usePipelineFilters();
  const { data: board, isLoading } = usePipelineBoard({ filters });

  return (
    <>
      <PageHeader
        title="Pipeline board"
        description="Drag deals across stages. Changes save optimistically."
        actions={
          <Button variant="outlined" leftIcon={<ArrowLeft className="h-4 w-4" />} asChild>
            <Link href="/crm/pipeline">Back to pipeline</Link>
          </Button>
        }
      />

      <div className="space-y-4">
        <PipelineFilters
          filters={filters}
          activeCount={activeCount}
          onUpdate={updateFilter}
          onToggleStage={toggleStage}
          onReset={reset}
        />
        <PipelineBoard board={board} loading={isLoading} />
      </div>
    </>
  );
}
