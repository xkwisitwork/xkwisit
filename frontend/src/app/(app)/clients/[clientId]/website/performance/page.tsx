"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatNumber } from "@/lib/utils/format";
import {
  ConversionFunnelWidget,
  PagePerformanceTable,
  useWebsitePerformance,
} from "@/features/website";

export default function ClientWebsitePerformancePage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data, isLoading } = useWebsitePerformance(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Website", href: `/clients/${clientId}/website` },
            { label: "Performance" },
          ]}
        />
        <PageHeader
          title="Performance"
          description={data?.periodLabel ?? "Website conversion performance."}
        />
      </div>

      {isLoading || !data ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <>
          <div className="grid gap-4 tablet:grid-cols-3">
            <Card>
              <CardStat label="Sessions" value={formatNumber(data.sessions)} />
            </Card>
            <Card>
              <CardStat label="Conversions" value={formatNumber(data.conversions)} />
            </Card>
            <Card>
              <CardStat label="Revenue" value={formatCurrencyCompact(data.revenue)} />
            </Card>
          </div>
          <ConversionFunnelWidget steps={data.funnel} />
          <PagePerformanceTable pages={data.pages} />
        </>
      )}
    </div>
  );
}
