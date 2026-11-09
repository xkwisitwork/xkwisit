"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { ReportTemplate } from "../types";
import { ReportTemplateCard } from "./ReportTemplateCard";

export function ReportTemplateList({
  templates,
  loading,
  selectedId,
  onSelect,
}: {
  templates: ReportTemplate[];
  loading?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  if (loading) {
    return (
      <div className="grid gap-3 tablet:grid-cols-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return <p className="text-400 text-neutral-600">No templates.</p>;
  }

  return (
    <div className="grid gap-3 tablet:grid-cols-2">
      {templates.map((template) => (
        <ReportTemplateCard
          key={template.id}
          template={template}
          selected={selectedId === template.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
