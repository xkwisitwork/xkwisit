"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";

import type { AttributionRow } from "../types";
import { attributionTouchLabel, hasConverted } from "../utils/attribution";

export type MultiTouchJourneyProps = {
  rows: AttributionRow[];
  currency?: "NGN" | "USD" | "GBP" | "EUR";
  limit?: number;
};

export function MultiTouchJourney({
  rows,
  currency = "NGN",
  limit = 8,
}: MultiTouchJourneyProps) {
  const items = rows.slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multi-touch journeys</CardTitle>
        <CardDescription>
          First and last touch for recent attributed leads.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-400 text-neutral-600">No journeys to show yet.</p>
        ) : (
          items.map((row) => (
            <div
              key={row.leadId}
              className="flex flex-col gap-2 rounded-xl border border-neutral-400 px-4 py-3 tablet:flex-row tablet:items-center tablet:justify-between"
            >
              <div className="min-w-0">
                <Link
                  href={`/crm/leads/${row.leadId}`}
                  className="text-400 font-medium hover:text-primary"
                >
                  {row.leadName}
                </Link>
                <p className="mt-1 text-300 text-neutral-600">
                  {attributionTouchLabel(row.firstTouch)}
                  <span className="mx-2 text-neutral-600">→</span>
                  {attributionTouchLabel(row.lastTouch)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {hasConverted(row) ? (
                  <Badge variant="success" size="sm">
                    {formatCurrencyCompact(row.revenue, currency)}
                  </Badge>
                ) : (
                  <Badge variant="muted" size="sm">
                    Open
                  </Badge>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
