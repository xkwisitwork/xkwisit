"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  ClientEmptyState,
  ClientPagination,
  ClientTable,
  useClients,
} from "@/features/clients";

export default function ArchivedClientsPage() {
  const { data, isLoading } = useClients({
    filters: { statuses: ["ARCHIVED"] },
    page: 1,
    pageSize: 20,
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Clients", href: "/clients" }, { label: "Archived" }]}
        />

        <PageHeader
          title="Archived clients"
          description="Clients that have been archived and are no longer active."
          actions={
            <Button variant="outlined" asChild={false}>
              <Link href="/clients">Back to clients</Link>
            </Button>
          }
        />
      </div>

      <ClientTable
        items={data?.items ?? []}
        loading={isLoading}
        emptyState={<ClientEmptyState hasFilters={false} />}
      />

      {data?.meta && data.meta.total > 0 ? (
        <ClientPagination meta={data.meta} onPageChange={() => {}} />
      ) : null}
    </div>
  );
}
