"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Report"
      description="Client portal view for report."
      crumbs={["Reports", "Report"]}
      primaryHref="/home"
      primaryLabel="Back to dashboard"

      stats={[
        { label: "Records", value: 0, hint: "Empty", tone: "muted" },
        { label: "Active", value: 0, hint: "-", tone: "info" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
        { label: "Owners", value: 0, hint: "-", tone: "muted" },
      ]}
      filters={["Open", "In progress", "Done"]}
      columns={[
        {
          key: "name",
          label: "Item",
        },
        {
          key: "area",
          label: "Area",
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
      searchPlaceholder="Search report…"
    />
  );
}
