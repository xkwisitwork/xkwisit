"use client";

import Link from "next/link";
import { Plus, Upload } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  LeadEmptyState,
  LeadFilters,
  LeadPagination,
  LeadStatsStrip,
  LeadTable,
  useLeadFilters,
  useLeads,
} from "@/features/leads";

export default function LeadsPage() {
  const {
    filters,
    page,
    pageSize,
    activeFilterCount,
    updateFilter,
    setPage,
    setPageSize,
    reset,
  } = useLeadFilters();

  const { data, isLoading, isFetching } = useLeads({ filters, page, pageSize });

  const items = data?.items ?? [];
  const meta = data?.meta;

  return (
    <>
      <PageHeader
        title="Leads"
        description="Every prospect your team is tracking through the pipeline."
        actions={
          <>
            <Button
              variant="outlined"
              leftIcon={<Upload className="h-4 w-4" />}
              asChild={false}
            >
              <Link href="/crm/leads/import">Import</Link>
            </Button>
            <Button
              variant="contained"
              leftIcon={<Plus className="h-4 w-4" />}
              asChild={false}
            >
              <Link href="/crm/leads/new">New lead</Link>
            </Button>
          </>
        }
      />

      <LeadStatsStrip />

      <div className="space-y-4">
        <LeadFilters
          filters={filters}
          activeCount={activeFilterCount}
          onUpdate={updateFilter}
          onReset={reset}
        />

        <LeadTable
          items={items}
          loading={isLoading}
          emptyState={<LeadEmptyState hasFilters={activeFilterCount > 0} />}
        />

        {meta && meta.total > 0 ? (
          <LeadPagination
            meta={meta}
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
