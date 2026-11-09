"use client";

import Link from "next/link";
import { use } from "react";
import { ExternalLink, Pencil, Globe } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils/date";
import { humanize } from "@/lib/utils/format";

import {
  ClientHealthBadge,
  ClientStatusBadge,
  useClient,
  useClientHealth,
} from "@/features/clients";

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data: client, isLoading } = useClient(clientId);
  const { data: health } = useClientHealth(clientId);

  if (isLoading || !client) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <div className="grid gap-6 laptop:grid-cols-3">
          <div className="space-y-6 laptop:col-span-2">
            <Skeleton variant="rectangle" className="h-64" />
          </div>
          <Skeleton variant="rectangle" className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Breadcrumbs
          items={[{ label: "Clients", href: "/clients" }, { label: client.name }]}
        />

        <PageHeader
          title={client.name}
          description={`${client.industry} · ${humanize(client.lifecycleStage)}`}
          actions={
            <Button
              variant="contained"
              leftIcon={<Pencil className="h-4 w-4" />}
              asChild={false}
            >
              <Link href={`/clients/${client.id}/edit`}>Edit client</Link>
            </Button>
          }
        />
      </div>

      <div className="grid gap-6 laptop:grid-cols-3">
        <div className="space-y-6 laptop:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar src={client.logoUrl ?? undefined} name={client.name} size="lg" />
                <div className="min-w-0 flex-1">
                  <CardTitle>{client.name}</CardTitle>
                  {client.legalName ? (
                    <CardDescription>{client.legalName}</CardDescription>
                  ) : null}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <ClientStatusBadge status={client.status} />
                    <ClientHealthBadge
                      level={client.healthLevel}
                      score={client.healthScore}
                    />
                    <Badge variant="outline" size="md">
                      {client.tier}
                    </Badge>
                  </div>

                  {client.website ? (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-4 inline-flex items-center gap-1.5 text-300 text-primary hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      {client.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-4 tablet:grid-cols-2">
                <div>
                  <dt className="text-200 font-semibold uppercase tracking-wide text-neutral-600">
                    Account manager
                  </dt>
                  <dd className="mt-1 text-400">
                    {client.accountManagerName ?? "Unassigned"}
                  </dd>
                </div>

                <div>
                  <dt className="text-200 font-semibold uppercase tracking-wide text-neutral-600">
                    Strategist
                  </dt>
                  <dd className="mt-1 text-400">
                    {client.strategistName ?? "Unassigned"}
                  </dd>
                </div>

                {client.contractStartDate ? (
                  <div>
                    <dt className="text-200 font-semibold uppercase tracking-wide text-neutral-600">
                      Contract start
                    </dt>
                    <dd className="mt-1 text-400">
                      {formatDate(client.contractStartDate)}
                    </dd>
                  </div>
                ) : null}

                {client.contractEndDate ? (
                  <div>
                    <dt className="text-200 font-semibold uppercase tracking-wide text-neutral-600">
                      Contract end
                    </dt>
                    <dd className="mt-1 text-400">
                      {formatDate(client.contractEndDate)}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {health ? (
            <Card>
              <CardHeader>
                <CardTitle>Health score</CardTitle>
                <CardDescription>
                  Weighted across acquisition, conversion, and retention.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-800 leading-none text-primary">
                    {health.overall}
                  </p>
                  <ClientHealthBadge level={health.level} />
                </div>

                <Progress
                  value={health.overall}
                  tone={
                    health.level === "EXCELLENT" || health.level === "STABLE"
                      ? "success"
                      : health.level === "ATTENTION"
                        ? "warning"
                        : "destructive"
                  }
                  size="sm"
                />

                <div className="space-y-2.5 pt-2">
                  {Object.entries(health.dimensions).map(([key, value]) => (
                    <Progress key={key} value={value} label={humanize(key)} size="sm" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
}
