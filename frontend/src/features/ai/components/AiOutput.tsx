"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { AiRunResult } from "../types";
import { stripModelSeparators } from "../guardrails/separators";
import { AiInsightCard } from "./AiInsightCard";

export function AiOutput({
  result,
  loading,
}: {
  result?: AiRunResult | null;
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  if (!result) {
    return <p className="text-300 text-neutral-600">Run a prompt to see output.</p>;
  }

  return (
    <div className="space-y-4">
      <pre className="whitespace-pre-wrap rounded-xl border border-neutral-400 bg-neutral-200/40 p-4 text-300">
        {stripModelSeparators(result.output)}
      </pre>
      {result.insights.length > 0 ? (
        <div className="grid gap-3 tablet:grid-cols-2">
          {result.insights.map((insight) => (
            <AiInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
