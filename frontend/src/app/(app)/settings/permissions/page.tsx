"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Permissions"
      description="Manage permissions inside your Xkwisit workspace."
      crumbs={["Settings", "Permissions"]}
      primaryHref="#"
      primaryLabel="Create new"
      secondaryHref="/dashboard"
      secondaryLabel="Dashboard"
      stats={[
        { label: "Records", value: 0, hint: "Empty", tone: "muted" },
        { label: "Active", value: 0, hint: "-", tone: "info" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
        { label: "Owners", value: 0, hint: "-", tone: "muted" },
      ]}
      filters={["Active", "Invited", "Disabled"]}
      columns={[
        {
          key: "name",
          label: "Item",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "owner",
          label: "Owner",
        },
        {
          key: "updated",
          label: "Updated",
        },
      ]}
      rows={[]}
      searchPlaceholder="Search permissions…"
    />
  );
}
