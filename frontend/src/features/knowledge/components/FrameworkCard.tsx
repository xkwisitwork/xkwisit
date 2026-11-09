"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { Framework } from "../types";

export function FrameworkCard({ framework }: { framework: Framework }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">{framework.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-300 text-neutral-700">{framework.summary}</p>
        <ul className="flex flex-wrap gap-2">
          {framework.pillars.map((pillar) => (
            <li key={pillar} className="rounded-lg bg-neutral-200/60 px-2 py-1 text-200">
              {pillar}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
