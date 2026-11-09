"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { KnowledgeTemplate } from "../types";

export function TemplateCard({ template }: { template: KnowledgeTemplate }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">{template.title}</CardTitle>
        <p className="text-200 text-neutral-600">{template.category}</p>
      </CardHeader>
      <CardContent>
        <p className="text-300 text-neutral-700">{template.summary}</p>
      </CardContent>
    </Card>
  );
}
