"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function ExperimentHypothesis({ hypothesis }: { hypothesis: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Hypothesis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-400 text-neutral-700">{hypothesis}</p>
      </CardContent>
    </Card>
  );
}
