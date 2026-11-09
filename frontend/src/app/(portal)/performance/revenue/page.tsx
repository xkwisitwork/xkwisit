"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Revenue"
      description="Client portal view for revenue."
      crumbs={["Performance", "Revenue"]}
      primaryHref="#"
      primaryLabel="Create new"
      secondaryHref="/portal"
      secondaryLabel="Dashboard"
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
      searchPlaceholder="Search revenue…"
    />
  );
}
