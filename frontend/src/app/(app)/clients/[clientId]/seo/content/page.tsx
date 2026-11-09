"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { TableSkeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { formatNumber } from "@/lib/utils/format";
import { useSeoContent } from "@/features/seo";

export default function ClientSeoContentPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useSeoContent(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "SEO", href: `/clients/${clientId}/seo` },
            { label: "Content" },
          ]}
        />
        <PageHeader title="SEO content" description="Indexed pages and targets." />
      </div>

      {isLoading ? (
        <TableSkeleton rows={8} columns={5} />
      ) : data.length === 0 ? (
        <p className="text-400 text-neutral-600">No SEO content rows yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
                <TableHead>Title</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead className="text-right">Position</TableHead>
                <TableHead className="text-right">Words</TableHead>
                <TableHead className="text-right">Traffic</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-neutral-300 last:border-0"
                >
                  <TableCell>
                    <p className="font-medium">{row.title}</p>
                    <p className="max-w-[280px] truncate text-200 text-neutral-600">
                      {row.url}
                    </p>
                  </TableCell>
                  <TableCell>{row.targetKeyword ?? "-"}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.position ?? "-"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.wordCount ?? "-"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.trafficEstimate != null
                      ? formatNumber(row.trafficEstimate)
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
