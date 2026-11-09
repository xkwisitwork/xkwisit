"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  CampaignEmptyState,
  CampaignFilterBar,
  CampaignList,
  CampaignPagination,
  CampaignStatsStrip,
  useCampaignFilters,
  useCampaigns,
} from "@/features/campaigns";

export default function CampaignsPage() {
  const {
    filters,
    page,
    pageSize,
    activeCount,
    updateFilter,
    setPage,
    setPageSize,
    reset,
  } = useCampaignFilters();

  const { data, isLoading, isFetching } = useCampaigns({
    filters,
    page,
    pageSize,
  });

  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Acquisition campaigns across every client."
        actions={
          <Button variant="contained" leftIcon={<Plus className="h-4 w-4" />}>
            <Link href="/campaigns/new">New campaign</Link>
          </Button>
        }
      />

      <CampaignStatsStrip />

      <div className="space-y-4">
        <CampaignFilterBar
          filters={filters}
          activeCount={activeCount}
          onUpdate={updateFilter}
          onReset={reset}
        />

        <CampaignList
          items={data?.items ?? []}
          loading={isLoading}
          emptyState={<CampaignEmptyState hasFilters={activeCount > 0} />}
        />

        {data?.meta && data.meta.total > 0 ? (
          <CampaignPagination
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
