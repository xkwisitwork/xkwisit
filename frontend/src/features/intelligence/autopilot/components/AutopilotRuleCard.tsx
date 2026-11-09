"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { AutopilotRule } from "../../types";
import { autopilotStatusTone } from "../utils/autopilotEngine";

export function AutopilotRuleCard({ rule }: { rule: AutopilotRule }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{rule.name}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            {rule.triggerLabel} → {rule.actionLabel}
          </p>
        </div>
        <StatusBadge tone={autopilotStatusTone(rule.status)} size="sm">
          {rule.status}
        </StatusBadge>
      </CardHeader>
      <CardContent className="text-300 text-neutral-600">
        {rule.description}
        {rule.lastFiredAt
          ? ` · Last fired ${formatDate(rule.lastFiredAt, "d MMM yyyy")}`
          : " · Never fired"}
      </CardContent>
    </Card>
  );
}
