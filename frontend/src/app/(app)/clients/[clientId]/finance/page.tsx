"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Finance"
      description="Manage finance inside your Xkwisit workspace."
      crumbs={["Clients", "Client", "Finance"]}
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"

      stats={[
        { label: "Records", value: 0, hint: "Empty", tone: "muted" },
        { label: "Active", value: 0, hint: "-", tone: "info" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
        { label: "Owners", value: 0, hint: "-", tone: "muted" },
      ]}
      filters={["Draft", "Sent", "Paid", "Overdue"]}
      columns={[
        {
          key: "name",
          label: "Document",
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
          key: "amount",
          label: "Amount",
          align: "right",
        },
        {
          key: "due",
          label: "Due",
        },
      ]}
      rows={[]}
      searchPlaceholder="Search finance…"
    />
  );
}
