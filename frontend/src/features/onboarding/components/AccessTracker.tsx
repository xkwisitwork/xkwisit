"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export type AccessTrackerProps = {
  className?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
};

export function AccessTracker({
  className,
  title = "Access Tracker",
  description = "Module surface for your Xkwisit workspace.",
  children,
}: AccessTrackerProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant="muted" size="sm">
            Ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {children ?? (
          <div className="space-y-2 text-300 text-neutral-600">
            <p>Configured for operators - wire data when the API is live.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Filters and search-ready layout</li>
              <li>Status and ownership fields</li>
              <li>Actions aligned to Mission Control</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
