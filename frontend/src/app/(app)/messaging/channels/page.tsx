"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Channels"
      description="Manage channels inside your Xkwisit workspace."
      crumbs={["Messaging", "Channels"]}
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
      filters={["Open", "Waiting", "Resolved"]}
      columns={[
        {
          key: "name",
          label: "Thread",
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
          key: "updated",
          label: "Updated",
        },
      ]}
      rows={[]}
      searchPlaceholder="Search channels…"
    />
  );
}
