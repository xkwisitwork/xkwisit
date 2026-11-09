"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Pipeline"
      description="Manage pipeline inside your Xkwisit workspace."
      crumbs={["Clients", "Client", "Content", "Pipeline"]}
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"

      stats={[
        { label: "Records", value: 0, hint: "Empty", tone: "muted" },
        { label: "Active", value: 0, hint: "-", tone: "info" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
        { label: "Owners", value: 0, hint: "-", tone: "muted" },
      ]}
      filters={["Active", "Paused", "Draft", "Completed"]}
      columns={[
        {
          key: "name",
          label: "Asset",
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
          key: "channel",
          label: "Channel",
        },
        {
          key: "metric",
          label: "Metric",
          align: "right",
        },
      ]}
      rows={[]}
      searchPlaceholder="Search pipeline…"
    />
  );
}
