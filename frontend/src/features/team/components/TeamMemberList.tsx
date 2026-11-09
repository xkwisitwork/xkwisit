"use client";

import Link from "next/link";

import { Skeleton } from "@/components/ui/Skeleton";

import type { TeamMemberListItem } from "../types";
import { TeamMemberCard } from "./TeamMemberCard";

export function TeamMemberList({
  members,
  loading,
}: {
  members: TeamMemberListItem[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return <p className="text-400 text-neutral-600">No team members yet.</p>;
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2">
      {members.map((member) => (
        <Link key={member.id} href={`/team/${member.id}`}>
          <TeamMemberCard member={member} />
        </Link>
      ))}
    </div>
  );
}
