"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import type { ReportTemplate } from "../types";
import { periodLabel } from "../data/reportTemplates";

export function ReportTemplateCard({
  template,
  selected,
  onSelect,
}: {
  template: ReportTemplate;
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(template.id)}
      className={`w-full rounded-2xl border p-4 text-left transition-colors ${
        selected
          ? "border-primary bg-primary/5"
          : "border-neutral-400 bg-neutral-100 hover:border-primary/40"
      }`}
    >
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="text-500">{template.name}</CardTitle>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-3 p-0 text-200 text-neutral-600">
          {periodLabel(template.period)} · {template.sectionTitles.length} sections
        </CardContent>
      </Card>
    </button>
  );
}
