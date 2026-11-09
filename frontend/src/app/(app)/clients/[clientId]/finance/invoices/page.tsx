"use client";

import { use } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  InvoiceEmptyState,
  InvoiceList,
  InvoicePagination,
  useInvoiceFilters,
  useInvoices,
} from "@/features/invoices";

export default function ClientFinanceInvoicesPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { filters, page, pageSize, setPage } = useInvoiceFilters({
    clientId,
  });
  const { data, isLoading } = useInvoices({ filters, page, pageSize });

  return (
    <>
      <PageHeader
        title="Client invoices"
        description="Billing for this account."
        actions={
          <Button variant="contained" leftIcon={<Plus className="h-4 w-4" />} asChild>
            <Link href="/finance/invoices/new">New invoice</Link>
          </Button>
        }
      />
      <div className="space-y-4">
        <InvoiceList
          items={data?.items ?? []}
          loading={isLoading}
          emptyState={<InvoiceEmptyState hasFilters={false} />}
        />
        {data?.meta && data.meta.total > 0 ? (
          <InvoicePagination meta={data.meta} onPageChange={setPage} />
        ) : null}
      </div>
    </>
  );
}
