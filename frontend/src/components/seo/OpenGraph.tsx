"use client";

import { cn } from "@/lib/utils/cn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export type OpenGraphProps = {
  className?: string;
  title?: string;
  description?: string;
  points?: number[];
};

export function OpenGraph({
  className,
  title = "Open Graph",
  description = "Trend across the selected window.",
  points = [12, 18, 14, 22, 28, 24, 31],
}: OpenGraphProps) {
  const max = Math.max(...points, 1);
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-32 items-end gap-2">
          {points.map((point, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-mint/80"
              style={{ height: `${Math.max(8, (point / max) * 100)}%` }}
              title={String(point)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
