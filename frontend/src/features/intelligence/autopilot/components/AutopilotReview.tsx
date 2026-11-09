"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { AutopilotEvent, AutopilotRule } from "../../types";
import { AutopilotFeed } from "./AutopilotFeed";
import { AutopilotRuleCard } from "./AutopilotRuleCard";

export function AutopilotReview({
  rules,
  events,
  loading,
}: {
  rules: AutopilotRule[];
  events: AutopilotEvent[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-48 w-full" />;
  }

  const reviewEvents = events.filter((e) => e.needsReview);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 tablet:grid-cols-2">
        {rules.map((rule) => (
          <AutopilotRuleCard key={rule.id} rule={rule} />
        ))}
      </div>
      <div>
        <h3 className="mb-3 text-500 font-medium">Needs review</h3>
        <AutopilotFeed events={reviewEvents} />
      </div>
    </div>
  );
}
