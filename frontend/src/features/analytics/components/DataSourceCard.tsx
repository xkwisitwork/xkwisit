"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import { useDisconnectDataSource } from "../hooks/useDataSources";
import { providerLabel } from "../lib/providers";
import type { DataSource, DataSourceStatus } from "../types";
import { formatDate } from "@/lib/utils/date";

function statusTone(status: DataSourceStatus) {
  if (status === "CONNECTED") return "success" as const;
  if (status === "SYNCING") return "info" as const;
  if (status === "ERROR") return "destructive" as const;
  return "muted" as const;
}

export function DataSourceCard({ source }: { source: DataSource }) {
  const disconnect = useDisconnectDataSource();

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{source.name}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            {providerLabel(source.provider)}
            {source.accountLabel ? ` · ${source.accountLabel}` : ""}
          </p>
        </div>
        <StatusBadge tone={statusTone(source.status)}>{source.status}</StatusBadge>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        <p className="text-200 text-neutral-600">
          {source.lastSyncAt
            ? `Synced ${formatDate(source.lastSyncAt, "d MMM yyyy")}`
            : "Never synced"}
        </p>
        {source.status !== "DISCONNECTED" ? (
          <Button
            variant="outlined"
            size="sm"
            loading={disconnect.isPending}
            onClick={() => disconnect.mutate(source.id)}
          >
            Disconnect
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
