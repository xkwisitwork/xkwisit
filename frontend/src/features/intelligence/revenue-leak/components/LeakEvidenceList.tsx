"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";

import type { RevenueLeak } from "../../types";

export function LeakEvidenceList({ leak }: { leak: RevenueLeak }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">{leak.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-300">
        <p className="font-medium tabular-nums">
          {formatCurrencyCompact(leak.estimatedMonthlyLoss, leak.currency)}
          /mo · {leak.stage}
        </p>
        {leak.evidence.length === 0 ? (
          <p className="text-neutral-600">No evidence listed.</p>
        ) : (
          <ul className="list-disc space-y-1 pl-5">
            {leak.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
