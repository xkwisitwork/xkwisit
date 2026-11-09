"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import {
  TeamMemberForm,
  TeamMemberList,
  UtilizationWidget,
  useTeam,
  useUtilization,
} from "@/features/team";

const links = [
  ["Overview", "/team"],
  ["Members", "/team/members"],
  ["Capacity", "/team/capacity"],
  ["Timesheets", "/team/timesheets"],
  ["Roles", "/team/roles"],
] as const;

export default function TeamPage() {
  const team = useTeam();
  const utilization = useUtilization();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Team" }]} />
        <PageHeader title="Team" description="People, capacity, and roles." />
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
          >
            {label}
          </Link>
        ))}
      </div>
      <UtilizationWidget snapshot={utilization.data} loading={utilization.isLoading} />
      <TeamMemberForm />
      <TeamMemberList members={(team.data ?? []).slice(0, 6)} loading={team.isLoading} />
    </div>
  );
}
