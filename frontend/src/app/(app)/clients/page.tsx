"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  ClientEmptyState,
  ClientFilters,
  ClientPagination,
  ClientStatsStrip,
  ClientTable,
  useClientFilters,
  useClients,
} from "@/features/clients";

export default function ClientsPage() {
  const {
    filters,
    page,
    pageSize,
    activeCount,
    updateFilter,
    setPage,
    setPageSize,
    reset,
  } = useClientFilters();

  const { data, isLoading, isFetching } = useClients({ filters, page, pageSize });

  return (
    <>
      <PageHeader
        title="Clients"
        description="Every business Xkwisit is working with."
        actions={
          <Button
            variant="contained"
            leftIcon={<Plus className="h-4 w-4" />}
            asChild={false}
          >
            <Link href="/clients/new">New client</Link>
          </Button>
        }
      />

      <ClientStatsStrip />

      <div className="space-y-4">
        <ClientFilters
          filters={filters}
          activeCount={activeCount}
          onUpdate={updateFilter}
          onReset={reset}
        />

        <ClientTable
          items={data?.items ?? []}
          loading={isLoading}
          emptyState={<ClientEmptyState hasFilters={activeCount > 0} />}
        />

        {data?.meta && data.meta.total > 0 ? (
          <ClientPagination
            meta={data.meta}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        ) : null}

        {isFetching && !isLoading ? (
          <p className="text-center text-300 text-neutral-600">Updating…</p>
        ) : null}
      </div>
    </>
  );
}
