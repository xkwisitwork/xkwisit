"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function TermsSection({ terms }: { terms: string | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Terms</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-400 text-neutral-700">
          {terms?.trim() || "Standard terms apply."}
        </p>
      </CardContent>
    </Card>
  );
}
