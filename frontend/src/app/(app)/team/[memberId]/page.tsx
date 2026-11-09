"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { RoleAssignmentDialog, TeamMemberCard, useTeamMember } from "@/features/team";

export default function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = use(params);
  const { data, isLoading } = useTeamMember(memberId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Team", href: "/team" },
            { label: "Members", href: "/team/members" },
            { label: data?.name ?? "Member" },
          ]}
        />
        <PageHeader
          title={data?.name ?? "Member"}
          description={data?.email ?? "Team member detail"}
        />
      </div>
      {isLoading || !data ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : (
        <>
          <TeamMemberCard member={data} />
          <RoleAssignmentDialog memberId={memberId} currentRole={data.role} />
        </>
      )}
    </div>
  );
}
