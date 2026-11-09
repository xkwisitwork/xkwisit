"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Clients"
      description="Manage clients inside your Xkwisit workspace."
      crumbs={["Finance", "Profitability", "Clients"]}
      primaryHref="/finance/invoices/new"
      primaryLabel="New invoice"
      secondaryHref="/dashboard"
      secondaryLabel="Dashboard"
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
      searchPlaceholder="Search clients…"
    />
  );
}
