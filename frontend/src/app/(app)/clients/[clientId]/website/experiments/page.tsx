"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { ExperimentCard, ExperimentForm, useExperiments } from "@/features/website";

export default function ClientWebsiteExperimentsPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useExperiments(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Website", href: `/clients/${clientId}/website` },
            { label: "Experiments" },
          ]}
        />
        <PageHeader title="Experiments" description="A/B and split tests." />
      </div>

      <ExperimentForm clientId={clientId} />

      {isLoading ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : data.length === 0 ? (
        <p className="text-400 text-neutral-600">No experiments yet.</p>
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2">
          {data.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      )}
    </div>
  );
}
