"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";

import { InvoicePreview, InvoiceSendDialog, useInvoice } from "@/features/invoices";

export default function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = use(params);
  const { data, isLoading, isError } = useInvoice(invoiceId);

  return (
    <>
      <PageHeader
        title={data?.number ?? "Invoice"}
        description={data ? `${data.clientName} · ${data.currency}` : "Invoice detail"}
        actions={
          <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />} asChild>
            <Link href="/finance/invoices">Back to invoices</Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton variant="rectangle" className="h-40 w-full" />
          <Skeleton variant="rectangle" className="h-64 w-full" />
        </div>
      ) : isError || !data ? (
        <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
          <p className="font-display text-600">Invoice not found</p>
          <p className="mt-2 text-400 text-neutral-600">
            It may have been voided or the ID is invalid.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <InvoicePreview invoice={data} />
          {data.status !== "VOID" && data.status !== "PAID" ? (
            <InvoiceSendDialog invoiceId={data.id} invoiceNumber={data.number} />
          ) : null}
        </div>
      )}
    </>
  );
}
