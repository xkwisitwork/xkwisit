"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils/currency";

import {
  OpportunityTable,
  useOpportunities,
  useOpportunityStats,
} from "@/features/opportunities";

export default function OpportunitiesPage() {
  const { data, isLoading } = useOpportunities();
  const { data: stats, isLoading: statsLoading } = useOpportunityStats();

  return (
    <>
      <PageHeader
        title="Opportunities"
        description="Qualified deals with value, probability, and next steps."
        actions={
          <Button variant="contained" leftIcon={<Plus className="h-4 w-4" />} asChild>
            <Link href="/crm/pipeline">Open pipeline</Link>
          </Button>
        }
      />

      <div className="sm:grid-cols-2 xl:grid-cols-4 mb-6 grid gap-3">
        <Card className="border-neutral-400/60 shadow-none">
          <CardHeader className="pb-2">
            <CardDescription>Open deals</CardDescription>
            <CardTitle className="tabular-nums">
              {statsLoading ? "…" : (stats?.open ?? 0)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-neutral-400/60 shadow-none">
          <CardHeader className="pb-2">
            <CardDescription>Pipeline value</CardDescription>
            <CardTitle className="tabular-nums">
              {statsLoading || !stats
                ? "…"
                : formatCurrency(stats.totalValue.amount, {
                    currency: stats.totalValue.currency,
                    compact: true,
                    fractionDigits: 1,
                  })}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-neutral-400/60 shadow-none">
          <CardHeader className="pb-2">
            <CardDescription>Weighted</CardDescription>
            <CardTitle className="tabular-nums">
              {statsLoading || !stats
                ? "…"
                : formatCurrency(stats.weightedValue.amount, {
                    currency: stats.weightedValue.currency,
                    compact: true,
                    fractionDigits: 1,
                  })}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-neutral-400/60 shadow-none">
          <CardHeader className="pb-2">
            <CardDescription>Won</CardDescription>
            <CardTitle className="tabular-nums">
              {statsLoading ? "…" : (stats?.won ?? 0)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <OpportunityTable
        items={data?.items ?? []}
        loading={isLoading}
        emptyState={
          <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
            <p className="font-display text-600">No opportunities yet</p>
            <p className="mt-2 text-400 text-neutral-600">
              Qualify a lead to create your first opportunity.
            </p>
          </div>
        }
      />
    </>
  );
}
