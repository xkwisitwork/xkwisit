"use client";

import { useState } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  ANALYTICS_PROVIDERS,
  DataSourcesPanel,
  useConnectDataSource,
  useDataSources,
  type AnalyticsProvider,
} from "@/features/analytics";

export default function AnalyticsDataSourcesPage() {
  const { data = [], isLoading } = useDataSources();
  const connect = useConnectDataSource();
  const [provider, setProvider] = useState<AnalyticsProvider>("GOOGLE_ANALYTICS");
  const [name, setName] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Analytics", href: "/analytics" }, { label: "Data sources" }]}
        />
        <PageHeader title="Data sources" description="Connected analytics providers." />
      </div>

      <div className="grid gap-3 rounded-2xl border border-neutral-400 p-4 tablet:grid-cols-3">
        <Select
          value={provider}
          onValueChange={(v) => setProvider(v as AnalyticsProvider)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ANALYTICS_PROVIDERS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Display name"
        />
        <Button
          variant="contained"
          loading={connect.isPending}
          onClick={() => {
            if (!name.trim()) return;
            void connect.mutateAsync({ provider, name }).then(() => setName(""));
          }}
        >
          Connect
        </Button>
      </div>

      <DataSourcesPanel sources={data} loading={isLoading} />
    </div>
  );
}
