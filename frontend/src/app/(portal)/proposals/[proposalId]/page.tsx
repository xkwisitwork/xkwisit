"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Proposal"
      description="Client portal view for proposal."
      crumbs={["Proposals", "Proposal"]}
      primaryHref="/portal"
      primaryLabel="Back to dashboard"

      stats={[
        { label: "Records", value: 0, hint: "Empty", tone: "muted" },
        { label: "Active", value: 0, hint: "-", tone: "info" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
        { label: "Owners", value: 0, hint: "-", tone: "muted" },
      ]}
      filters={["Draft", "Sent", "Negotiation", "Won"]}
      columns={[
        {
          key: "name",
          label: "Record",
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
          key: "value",
          label: "Value",
          align: "right",
        },
        {
          key: "owner",
          label: "Owner",
        },
      ]}
      rows={[]}
      searchPlaceholder="Search proposal…"
    />
  );
}
