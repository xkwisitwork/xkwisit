"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Profile"
      description="Client portal view for profile."
      crumbs={["Settings", "Profile"]}
      primaryHref="#"
      primaryLabel="Create new"
      secondaryHref="/home"
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
      searchPlaceholder="Search profile…"
    />
  );
}
