"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function ExecutiveSummary({ summary }: { summary: string | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Executive summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-400 text-neutral-700">
          {summary?.trim() || "No summary yet."}
        </p>
      </CardContent>
    </Card>
  );
}
