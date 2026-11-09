"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import type { ReputationTheme } from "../types";

export function PositiveThemes({
  themes,
  loading,
}: {
  themes: ReputationTheme[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Positive themes</CardTitle>
      </CardHeader>
      <CardContent>
        {themes.length === 0 ? (
          <p className="text-300 text-neutral-600">No positive themes yet.</p>
        ) : (
          <ul className="space-y-3">
            {themes.map((theme) => (
              <li
                key={theme.id}
                className="border-b border-neutral-300 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-400 font-medium">{theme.label}</p>
                  <span className="text-200 tabular-nums text-neutral-600">
                    {theme.mentionCount}
                  </span>
                </div>
                {theme.exampleSnippet ? (
                  <p className="mt-1 text-300 text-neutral-600">
                    “{theme.exampleSnippet}”
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
