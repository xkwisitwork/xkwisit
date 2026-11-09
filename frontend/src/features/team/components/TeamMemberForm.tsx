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
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { useInviteTeamMember } from "../hooks/useTeam";
import type { TeamRole } from "../types";

export function TeamMemberForm() {
  const invite = useInviteTeamMember();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamRole>("SPECIALIST");
  const [title, setTitle] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite member</CardTitle>
        <CardDescription>Send an invite to join the workspace.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 tablet:grid-cols-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <Select value={role} onValueChange={(v) => setRole(v as TeamRole)}>
          <SelectTrigger>
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
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
        />
        <div className="flex justify-end tablet:col-span-2">
          <Button
            variant="contained"
            loading={invite.isPending}
            onClick={() => {
              if (!name.trim() || !email.trim()) return;
              void invite
                .mutateAsync({
                  name: name.trim(),
                  email: email.trim(),
                  role,
                  title: title || undefined,
                })
                .then(() => {
                  setName("");
                  setEmail("");
                  setTitle("");
                });
            }}
          >
            Invite
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
