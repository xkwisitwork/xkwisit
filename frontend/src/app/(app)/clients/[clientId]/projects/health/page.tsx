"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Health"
      description="Manage health inside your Xkwisit workspace."
      crumbs={["Clients", "Client", "Projects", "Health"]}
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"

      stats={[
        { label: "Records", value: 0, hint: "Empty", tone: "muted" },
        { label: "Active", value: 0, hint: "-", tone: "info" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
        { label: "Owners", value: 0, hint: "-", tone: "muted" },
      ]}
      filters={["On track", "At risk", "Blocked", "Done"]}
      columns={[
        {
          key: "name",
          label: "Work item",
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
          key: "owner",
          label: "Owner",
        },
        {
          key: "due",
          label: "Due",
        },
      ]}
      rows={[]}
      searchPlaceholder="Search health…"
    />
  );
}
