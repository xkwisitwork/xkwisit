"use client";

import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export type WhatsAppPanelProps = {
  className?: string;
  title?: string;
  description?: string;
  value?: string | number;
  badge?: string;
  items?: Array<{ label: string; value: string }>;
};

export function WhatsAppPanel({
  className,
  title = "Whats App Panel",
  description = "Live signal from your Xkwisit workspace.",
  value = "-",
  badge = "Live",
  items = [
    { label: "This week", value: "+12%" },
    { label: "Owner", value: "Ops" },
  ],
}: WhatsAppPanelProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant="info" size="sm">
            {badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-display text-700 font-bold tabular-nums text-neutral-900">
          {value}
        </p>
        <dl className="mt-4 grid gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-300">
              <dt className="text-neutral-600">{item.label}</dt>
              <dd className="font-medium text-neutral-800">{item.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
