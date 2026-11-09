"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { WhyDidResult } from "../../types";
import { sortFactorsByImpact } from "../utils/analyzeChange";
import { ContributingFactorRow } from "./ContributingFactor";

export function WhyDidResultView({ result }: { result: WhyDidResult }) {
  const factors = sortFactorsByImpact(result.factors);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{result.metric}</CardTitle>
        <p className="text-300 text-neutral-600">
          {result.periodLabel} · {formatDate(result.generatedAt, "d MMM yyyy HH:mm")}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-400">{result.summary}</p>
        <p className="text-300 font-medium tabular-nums">
          Delta {result.deltaPercent > 0 ? "+" : ""}
          {result.deltaPercent.toFixed(1)}%
        </p>
        <div>
          {factors.map((factor) => (
            <ContributingFactorRow key={factor.id} factor={factor} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { WhyDidResultView as WhyDidResult };
