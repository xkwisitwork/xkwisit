"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function ScopeSection({ scope }: { scope: string | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Scope</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-400 text-neutral-700">
          {scope?.trim() || "No scope defined."}
        </p>
      </CardContent>
    </Card>
  );
}
