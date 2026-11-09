"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  LeadEmptyState,
  LeadPagination,
  LeadTable,
  useLeadFilters,
  useLeads,
} from "@/features/leads";

export default function ArchivedLeadsPage() {
  const { page, pageSize, setPage, setPageSize } = useLeadFilters();

  const { data, isLoading } = useLeads({
    filters: { search: "" },
    page,
    pageSize,
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "CRM", href: "/crm" },
            { label: "Leads", href: "/crm/leads" },
            { label: "Archived" },
          ]}
        />

        <PageHeader
          title="Archived leads"
          description="Leads that have been archived and removed from the active pipeline."
          actions={
            <Button variant="outlined" asChild={false}>
              <Link href="/crm/leads">Back to active leads</Link>
            </Button>
          }
        />
      </div>

      <LeadTable
        items={data?.items ?? []}
        loading={isLoading}
        emptyState={<LeadEmptyState hasFilters={false} />}
      />

      {data?.meta && data.meta.total > 0 ? (
        <LeadPagination
          meta={data.meta}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      ) : null}
    </div>
  );
}
