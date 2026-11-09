"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { ReportSection } from "../types";

export function ReportSectionView({ section }: { section: ReportSection }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-400 text-neutral-700">
          {section.body || "-"}
        </p>
      </CardContent>
    </Card>
  );
}
