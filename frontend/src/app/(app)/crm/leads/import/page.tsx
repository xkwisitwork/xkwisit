"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";

import { LeadImportDialog } from "@/features/leads";

export default function ImportLeadsPage() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div>
        <Breadcrumbs
          items={[
            { label: "CRM", href: "/crm" },
            { label: "Leads", href: "/crm/leads" },
            { label: "Import" },
          ]}
        />

        <PageHeader
          title="Import leads"
          description="Upload a CSV file to add multiple leads at once."
          actions={
            <Button
              variant="outlined"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              asChild={false}
            >
              <Link href="/crm/leads">Back to leads</Link>
            </Button>
          }
        />
      </div>

      <LeadImportDialog open={open} onOpenChange={setOpen} />

      {!open ? (
        <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-8 text-center">
          <p className="text-400 text-neutral-600">
            Import cancelled.{" "}
            <Link href="/crm/leads" className="font-medium text-primary hover:underline">
              Return to leads
            </Link>{" "}
            or{" "}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="font-medium text-primary hover:underline"
            >
              try again
            </button>
            .
          </p>
        </div>
      ) : null}
    </>
  );
}
