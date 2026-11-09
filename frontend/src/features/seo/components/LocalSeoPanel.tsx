"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import type { LocalSeoSnapshot } from "../types";
import { BusinessProfileCard } from "./BusinessProfileCard";
import { NapConsistency } from "./NapConsistency";

export function LocalSeoPanel({
  snapshot,
  loading,
}: {
  snapshot?: LocalSeoSnapshot | null;
  loading?: boolean;
}) {
  if (loading || !snapshot) {
    return <Skeleton variant="rectangle" className="h-64 w-full" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>NAP consistency</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-600 font-medium tabular-nums">
            {snapshot.consistencyScore}%
          </p>
          <NapConsistency listings={snapshot.napListings} />
        </CardContent>
      </Card>
      <BusinessProfileCard profile={snapshot.profile} />
    </div>
  );
}
