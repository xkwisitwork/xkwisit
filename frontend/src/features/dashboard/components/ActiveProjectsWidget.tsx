"use client";

import Link from "next/link";
import { FolderKanban } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export function ActiveProjectsWidget({
  count = 0,
  items = [],
}: {
  count?: number;
  items?: Array<{ id: string; name: string; client: string; status: string }>;
}) {
  const total = count ?? items.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-500">
              <FolderKanban className="h-4 w-4 text-mint" />
              Active projects
            </CardTitle>
            <CardDescription>
              {total === 0
                ? "No projects yet - create one when you’re ready."
                : `${total} in delivery`}
            </CardDescription>
          </div>
          <Badge variant="info" size="sm">
            {total}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-300 text-neutral-600">Nothing to show yet.</p>
        ) : (
          items.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href={`/projects/${item.id}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-neutral-300/80 bg-neutral-50 px-3 py-2.5 hover:border-mint/40"
            >
              <div className="min-w-0">
                <p className="truncate text-400 font-medium text-neutral-900">
                  {item.name}
                </p>
                <p className="truncate text-200 text-neutral-600">{item.client}</p>
              </div>
              <Badge
                variant={item.status === "At risk" ? "warning" : "success"}
                size="sm"
              >
                {item.status}
              </Badge>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
