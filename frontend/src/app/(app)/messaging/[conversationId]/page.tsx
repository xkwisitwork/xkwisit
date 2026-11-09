"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Conversation"
      description="Manage conversation inside your Xkwisit workspace."
      crumbs={["Messaging", "Conversation"]}
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"

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
      searchPlaceholder="Search conversation…"
    />
  );
}
