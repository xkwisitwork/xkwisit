"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { TeamMemberForm, TeamMemberList, useTeam } from "@/features/team";

export default function TeamMembersPage() {
  const { data = [], isLoading } = useTeam();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Team", href: "/team" }, { label: "Members" }]} />
        <PageHeader title="Members" description="Everyone on the workspace." />
      </div>
      <TeamMemberForm />
      <TeamMemberList members={data} loading={isLoading} />
    </div>
  );
}
