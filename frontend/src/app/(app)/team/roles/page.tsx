"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTeam } from "@/features/team";

export default function TeamRolesPage() {
  const { data = [], isLoading } = useTeam();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Team", href: "/team" }, { label: "Roles" }]} />
        <PageHeader title="Roles" description="Role distribution." />
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : (
        <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
          {data.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between px-4 py-3 text-300"
            >
              <span>{member.name}</span>
              <span className="text-neutral-600">{member.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
