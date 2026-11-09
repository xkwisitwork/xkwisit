"use client";

import Link from "next/link";
import { History, Inbox } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  ApprovalCenter,
  ApprovalEmptyState,
  ApprovalFilters,
  ApprovalPagination,
  ApprovalStatsStrip,
  useApprovalFilters,
  useApprovals,
} from "@/features/approvals";

export default function ApprovalsPage() {
  const { filters, page, pageSize, activeCount, updateFilter, setPage, reset } =
    useApprovalFilters();

  const { data, isLoading, isFetching } = useApprovals({
    filters,
    page,
    pageSize,
  });

  return (
    <>
      <PageHeader
        title="Approvals"
        description="Sign-offs across content, creatives, proposals, and deliverables."
        actions={
          <>
            <Button variant="outlined" leftIcon={<Inbox className="h-4 w-4" />} asChild>
              <Link href="/approvals/pending">Pending queue</Link>
            </Button>
            <Button variant="ghost" leftIcon={<History className="h-4 w-4" />} asChild>
              <Link href="/approvals/history">History</Link>
            </Button>
          </>
        }
      />

      <ApprovalStatsStrip />

      <div className="mt-6 space-y-4">
        <ApprovalFilters
          filters={filters}
          activeCount={activeCount}
          onUpdate={updateFilter}
          onReset={reset}
        />

        <ApprovalCenter
          items={data?.items ?? []}
          loading={isLoading}
          emptyState={<ApprovalEmptyState hasFilters={activeCount > 0} />}
        />

        {data?.meta && data.meta.total > 0 ? (
          <ApprovalPagination meta={data.meta} onPageChange={setPage} />
        ) : null}

        {isFetching && !isLoading ? (
          <p className="text-center text-300 text-neutral-600">Updating…</p>
        ) : null}
      </div>
    </>
  );
}
