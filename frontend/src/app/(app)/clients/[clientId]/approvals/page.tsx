"use client";

import { use } from "react";

import { PageHeader } from "@/components/layout/PageHeader";

import {
  ApprovalCenter,
  ApprovalEmptyState,
  ApprovalPagination,
  useApprovalFilters,
  useApprovals,
} from "@/features/approvals";

export default function ClientApprovalsPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { filters, page, pageSize, setPage } = useApprovalFilters({
    clientId,
  });
  const { data, isLoading } = useApprovals({ filters, page, pageSize });

  return (
    <>
      <PageHeader
        title="Client approvals"
        description="Sign-offs scoped to this account."
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
