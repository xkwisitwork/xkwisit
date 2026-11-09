"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { TeamMemberListItem, TeamMemberStatus } from "../types";

function statusTone(status: TeamMemberStatus) {
  if (status === "ACTIVE") return "success" as const;
  if (status === "INVITED") return "warning" as const;
  return "muted" as const;
}

export function TeamMemberCard({ member }: { member: TeamMemberListItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{member.name}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            {member.title ?? member.role} · {member.email}
          </p>
        </div>
        <StatusBadge tone={statusTone(member.status)} size="sm">
          {member.status}
        </StatusBadge>
      </CardHeader>
      <CardContent className="text-300">
        Utilization {member.utilizationPercent}% · Capacity {member.capacityHoursPerWeek}
        h/wk
      </CardContent>
    </Card>
  );
}
