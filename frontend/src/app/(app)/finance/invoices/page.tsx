"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  InvoiceEmptyState,
  InvoiceFilters,
  InvoiceList,
  InvoicePagination,
  InvoiceStatsStrip,
  useInvoiceFilters,
  useInvoices,
} from "@/features/invoices";

export default function InvoicesPage() {
  const { filters, page, pageSize, activeCount, updateFilter, setPage, reset } =
    useInvoiceFilters();

  const { data, isLoading, isFetching } = useInvoices({
    filters,
    page,
    pageSize,
  });

  return (
    <>
      <PageHeader
        title="Invoices"
        description="Client billing ledger across retainers and projects."
        actions={
          <Button variant="contained" leftIcon={<Plus className="h-4 w-4" />} asChild>
            <Link href="/finance/invoices/new">New invoice</Link>
          </Button>
        }
      />

      <InvoiceStatsStrip />

      <div className="mt-6 space-y-4">
        <InvoiceFilters
          filters={filters}
          activeCount={activeCount}
          onUpdate={updateFilter}
          onReset={reset}
        />

        <InvoiceList
          items={data?.items ?? []}
          loading={isLoading}
          emptyState={<InvoiceEmptyState hasFilters={activeCount > 0} />}
        />

        {data?.meta && data.meta.total > 0 ? (
          <InvoicePagination meta={data.meta} onPageChange={setPage} />
        ) : null}

        {isFetching && !isLoading ? (
          <p className="text-center text-300 text-neutral-600">Updating…</p>
        ) : null}
      </div>
    </>
  );
}
