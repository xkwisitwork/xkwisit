"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { AiInsight } from "../types";

export function AiInsightCard({ insight }: { insight: AiInsight }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">{insight.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-300">
        <p>{insight.body}</p>
        {insight.confidence != null ? (
          <p className="text-200 text-neutral-600">
            Confidence {Math.round(insight.confidence * 100)}%
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
