"use client";

import Link from "next/link";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import type { AttentionItem } from "../types";

export function AttentionPanel({
  items,
  loading,
}: {
  items: AttentionItem[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Needs attention</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-300 text-neutral-600">Nothing urgent.</p>
        ) : (
          items.map((item) => {
            const body = (
              <div className="flex items-center justify-between gap-3">
                <p className="text-400">{item.title}</p>
                <StatusBadge
                  tone={
                    item.severity === "HIGH"
                      ? "destructive"
                      : item.severity === "MEDIUM"
                        ? "warning"
                        : "muted"
                  }
                  size="sm"
                >
                  {item.severity}
                </StatusBadge>
              </div>
            );
            return item.href ? (
              <Link key={item.id} href={item.href} className="block">
                {body}
              </Link>
            ) : (
              <div key={item.id}>{body}</div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
