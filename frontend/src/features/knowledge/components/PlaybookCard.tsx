"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { Playbook } from "../types";

export function PlaybookCard({ playbook }: { playbook: Playbook }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">{playbook.title}</CardTitle>
        <p className="text-200 text-neutral-600">{playbook.audience ?? "General"}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-300 text-neutral-700">{playbook.summary}</p>
        <p className="text-200 text-neutral-600">{playbook.steps.length} steps</p>
      </CardContent>
    </Card>
  );
}
