"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  ApprovalCenter,
  ApprovalEmptyState,
  ApprovalPagination,
  useApprovalFilters,
  useApprovals,
} from "@/features/approvals";

export default function PendingApprovalsPage() {
  const { filters, page, pageSize, setPage } = useApprovalFilters({
    statuses: ["PENDING", "CHANGES_REQUESTED"],
  });

  const { data, isLoading } = useApprovals({ filters, page, pageSize });

  return (
    <>
      <PageHeader
        title="Pending approvals"
        description="Items waiting on a decision."
        actions={
          <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />} asChild>
            <Link href="/approvals">All approvals</Link>
          </Button>
        }
      />

      <div className="space-y-4">
        <ApprovalCenter
          items={data?.items ?? []}
          loading={isLoading}
          emptyState={<ApprovalEmptyState hasFilters={false} />}
        />
        {data?.meta && data.meta.total > 0 ? (
          <ApprovalPagination meta={data.meta} onPageChange={setPage} />
        ) : null}
      </div>
    </>
  );
}
