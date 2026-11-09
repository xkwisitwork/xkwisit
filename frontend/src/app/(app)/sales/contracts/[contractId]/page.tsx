"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  ContractPreview,
  ContractTimeline,
  SignaturePanel,
  useContract,
} from "@/features/contracts";

export default function SalesContractDetailPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  const { contractId } = use(params);
  const { data, isLoading } = useContract(contractId);

  const events =
    data == null
      ? []
      : [
          {
            id: "created",
            label: "Created",
            at: data.createdAt,
          },
          ...(data.signedAt
            ? [{ id: "signed", label: "Signed", at: data.signedAt }]
            : []),
        ];

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Sales", href: "/sales" },
            { label: "Contracts", href: "/sales/contracts" },
            { label: data?.title ?? "Contract" },
          ]}
        />
        <PageHeader
          title={data?.title ?? "Contract"}
          description={data?.clientName ?? "Contract detail"}
        />
      </div>
      <ContractPreview contract={data} loading={isLoading} />
      <ContractTimeline events={events} />
      <SignaturePanel contractId={contractId} />
    </div>
  );
}
