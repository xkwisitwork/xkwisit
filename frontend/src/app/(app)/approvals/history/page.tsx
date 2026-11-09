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

export default function ApprovalHistoryPage() {
  const { filters, page, pageSize, setPage } = useApprovalFilters({
    statuses: ["APPROVED", "REJECTED"],
  });

  const { data, isLoading } = useApprovals({ filters, page, pageSize });

  return (
    <>
      <PageHeader
        title="Approval history"
        description="Past decisions across the agency."
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
