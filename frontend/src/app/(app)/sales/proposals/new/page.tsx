"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { ProposalBuilder } from "@/features/proposals";

export default function SalesNewProposalPage() {
  const router = useRouter();
  const [clientId, setClientId] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Sales", href: "/sales" },
            { label: "Proposals", href: "/sales/proposals" },
            { label: "New" },
          ]}
        />
        <PageHeader title="New proposal" description="Build and send a proposal." />
      </div>
      <Input
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        placeholder="Client ID"
      />
      <ProposalBuilder
        clientId={clientId}
        onCreated={(id) => router.push(`/sales/proposals/${id}`)}
      />
    </div>
  );
}
