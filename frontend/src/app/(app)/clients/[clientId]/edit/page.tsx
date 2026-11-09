"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";

import { ClientForm, useClient } from "@/features/clients";

export default function EditClientPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data: client, isLoading } = useClient(clientId);

  if (isLoading || !client) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-6 w-64" />
        <Skeleton variant="rectangle" className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: client.name, href: `/clients/${client.id}` },
            { label: "Edit" },
          ]}
        />

        <PageHeader
          title={`Edit ${client.name}`}
          description="Update company details, contract, and settings."
        />
      </div>

      <ClientForm mode="edit" client={client} cancelHref={`/clients/${client.id}`} />
    </div>
  );
}
