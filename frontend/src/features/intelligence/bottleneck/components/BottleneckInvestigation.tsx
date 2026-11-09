"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { Bottleneck } from "../../types";

export function BottleneckInvestigation({ bottleneck }: { bottleneck: Bottleneck }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{bottleneck.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-300">
        <p className="text-neutral-600">
          {bottleneck.stage} · detected {formatDate(bottleneck.detectedAt, "d MMM yyyy")}
        </p>
        {bottleneck.evidence.length === 0 ? (
          <p className="text-neutral-600">No evidence listed.</p>
        ) : (
          <ul className="list-disc space-y-1 pl-5">
            {bottleneck.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
