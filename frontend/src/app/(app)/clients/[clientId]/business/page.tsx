"use client";

import { ModuleWorkspace } from "@/components/app/ModuleWorkspace";

export default function Page() {
  return (
    <ModuleWorkspace
      title="Business"
      description="Manage business inside your Xkwisit workspace."
      crumbs={["Clients", "Client", "Business"]}
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"

      stats={[
        { label: "Records", value: 0, hint: "Empty", tone: "muted" },
        { label: "Active", value: 0, hint: "-", tone: "info" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
        { label: "Owners", value: 0, hint: "-", tone: "muted" },
      ]}
      filters={["Active", "Onboarding", "Paused", "At risk"]}
      columns={[
        {
          key: "name",
          label: "Client",
        },
        {
          key: "tier",
          label: "Tier",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "am",
          label: "Account lead",
        },
        {
          key: "health",
          label: "Health",
        },
      ]}
      rows={[]}
      searchPlaceholder="Search business…"
    />
  );
}
