"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

import type { ProposalMilestone } from "../types";

export function MilestonesSection({
  milestones,
  currency,
}: {
  milestones: ProposalMilestone[];
  currency: "NGN" | "USD" | "GBP" | "EUR";
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        {milestones.length === 0 ? (
          <p className="text-300 text-neutral-600">No milestones.</p>
        ) : (
          <ul className="divide-y divide-neutral-300">
            {milestones.map((m) => (
              <li key={m.id} className="flex items-center justify-between py-2 text-300">
                <span>
                  {m.title}
                  {m.dueDate ? ` · ${formatDate(m.dueDate, "d MMM yyyy")}` : ""}
                </span>
                <span className="font-medium tabular-nums">
                  {formatCurrencyCompact(m.amount, currency)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
