"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import { InvoiceForm } from "@/features/invoices";

export default function NewInvoicePage() {
  return (
    <>
      <PageHeader
        title="New invoice"
        description="Create a draft invoice for a client."
        actions={
          <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />} asChild>
            <Link href="/finance/invoices">Back to invoices</Link>
          </Button>
        }
      />
      <InvoiceForm />
    </>
  );
}
