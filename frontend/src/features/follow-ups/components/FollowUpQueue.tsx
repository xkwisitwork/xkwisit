"use client";

import Link from "next/link";
import { Phone, Mail, MessageCircle, Calendar, CircleDot } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";

import type { FollowUpItem } from "../types";

const CHANNEL_ICON = {
  CALL: Phone,
  EMAIL: Mail,
  WHATSAPP: MessageCircle,
  MEETING: Calendar,
  OTHER: CircleDot,
} as const;

function entityHref(item: FollowUpItem) {
  if (item.entityType === "OPPORTUNITY") return `/crm/opportunities/${item.entityId}`;
  if (item.entityType === "LEAD") return `/crm/leads/${item.entityId}`;
  return `/clients/${item.entityId}`;
}

export function FollowUpQueueList({
  title,
  items,
  tone = "default",
}: {
  title: string;
  items: FollowUpItem[];
  tone?: "default" | "danger" | "mint";
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-white p-4",
        tone === "danger" && "border-destructive/40",
        tone === "mint" && "border-mint/40",
        tone === "default" && "border-neutral-400/60",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-500 font-semibold text-neutral-900">{title}</h3>
        <Badge variant={tone === "danger" ? "destructive" : "muted"} size="sm">
          {items.length}
        </Badge>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-center text-300 text-neutral-600">Nothing here</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = CHANNEL_ICON[item.channel];
            return (
              <li
                key={item.id}
                className="flex items-start gap-3 rounded-xl border border-neutral-400/40 p-3"
              >
                <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-mint-soft text-mint">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <Link
                    href={entityHref(item)}
                    className="font-semibold text-neutral-900 hover:text-mint"
                  >
                    {item.title}
                  </Link>
                  <p className="text-300 text-neutral-600">
                    {item.company}
                    {item.ownerName ? ` · ${item.ownerName}` : ""}
                  </p>
                  {item.note ? (
                    <p className="mt-1 text-200 text-neutral-600">{item.note}</p>
                  ) : null}
                </div>
                <time className="shrink-0 text-200 tabular-nums text-neutral-600">
                  {formatDate(item.dueAt, "d MMM · HH:mm")}
                </time>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export { FollowUpQueueList as FollowUpQueue };
