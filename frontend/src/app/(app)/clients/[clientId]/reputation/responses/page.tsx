"use client";

import { useMemo } from "react";
import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { ReviewResponseForm, useReviews } from "@/features/reputation";

export default function ClientReputationResponsesPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useReviews(clientId);

  const pending = useMemo(
    () =>
      data.filter(
        (r) => r.responseStatus === "PENDING" || r.responseStatus === "DRAFTED",
      ),
    [data],
  );

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Reputation", href: `/clients/${clientId}/reputation` },
            { label: "Responses" },
          ]}
        />
        <PageHeader title="Responses" description="Draft and publish replies." />
      </div>

      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : pending.length === 0 ? (
        <p className="text-400 text-neutral-600">No responses pending.</p>
      ) : (
        <div className="space-y-4">
          {pending.map((review) => (
            <ReviewResponseForm key={review.id} clientId={clientId} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
