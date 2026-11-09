"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { useUpdateTeamMember } from "../hooks/useTeam";
import type { TeamRole } from "../types";

export function RoleAssignmentDialog({
  memberId,
  currentRole,
}: {
  memberId: string;
  currentRole: TeamRole;
}) {
  const update = useUpdateTeamMember(memberId);
  const [role, setRole] = useState<TeamRole>(currentRole);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Assign role</CardTitle>
        <CardDescription>Update this member’s workspace role.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        <Select value={role} onValueChange={(v) => setRole(v as TeamRole)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(
              ["OWNER", "ADMIN", "MANAGER", "SPECIALIST", "CONTRACTOR"] as TeamRole[]
            ).map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="contained"
          loading={update.isPending}
          onClick={() => void update.mutateAsync({ role })}
        >
          Save role
        </Button>
      </CardContent>
    </Card>
  );
}
