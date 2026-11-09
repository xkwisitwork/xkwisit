"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Approvals"
      description="Client portal view for approvals."
      crumbs={["Approvals"]}
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
      filters={["Pending", "Approved", "Changes", "Rejected"]}
      columns={[
        {
          key: "name",
          label: "Item",
        },
        {
          key: "client",
          label: "Client",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "priority",
          label: "Priority",
        },
        {
          key: "due",
          label: "Due",
        },
      ]}
      rows={[]}
      searchPlaceholder="Search approvals…"
    />
  );
}
