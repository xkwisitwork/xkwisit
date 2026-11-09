"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReviewFeed, useReviews } from "@/features/reputation";

export default function ClientReputationReviewsPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useReviews(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Reputation", href: `/clients/${clientId}/reputation` },
            { label: "Reviews" },
          ]}
        />
        <PageHeader title="Reviews" description="All platform reviews." />
      </div>
      <ReviewFeed reviews={data} loading={isLoading} />
    </div>
  );
}
