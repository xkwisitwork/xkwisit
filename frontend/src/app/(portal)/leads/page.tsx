"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Leads"
      description="Client portal view for leads."
      crumbs={["Leads"]}
      primaryHref="/crm/leads/new"
      primaryLabel="Add lead"
      secondaryHref="/portal"
      secondaryLabel="Dashboard"
      stats={[
        { label: "Records", value: 0, hint: "Empty", tone: "muted" },
        { label: "Active", value: 0, hint: "-", tone: "info" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
        { label: "Owners", value: 0, hint: "-", tone: "muted" },
      ]}
      filters={["New", "Qualified", "Warm", "Cold"]}
      columns={[
        {
          key: "name",
          label: "Name",
        },
        {
          key: "company",
          label: "Company",
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
      searchPlaceholder="Search leads…"
    />
  );
}
