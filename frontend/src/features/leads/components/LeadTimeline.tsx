"use client";

import {
  Archive,
  Bell,
  Calendar,
  Mail,
  MessageSquare,
  Pencil,
  Phone,
  UserCog,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatContextual } from "@/lib/utils/date";

import { useLeadActivities } from "../hooks/useLead";
import type { LeadActivityType } from "../types";

const iconMap: Record<LeadActivityType, typeof Bell> = {
  CREATED: Bell,
  STATUS_CHANGED: Pencil,
  NOTE_ADDED: MessageSquare,
  EMAIL_SENT: Mail,
  CALL_LOGGED: Phone,
  MEETING_HELD: Calendar,
  SCORE_UPDATED: Pencil,
  OWNER_CHANGED: UserCog,
  ARCHIVED: Archive,
};

export function LeadTimeline({ leadId }: { leadId: string }) {
  const { data, isLoading } = useLeadActivities(leadId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton variant="text" className="w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton variant="circle" width={32} height={32} />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="w-3/4" />
                <Skeleton variant="text" className="w-1/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const activities = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>
          Every interaction, change, and note for this lead.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <p className="py-6 text-center text-300 text-neutral-600">No activity yet.</p>
        ) : (
          <ol className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-neutral-400">
            {activities.map((activity) => {
              const Icon = iconMap[activity.type] ?? Bell;

              return (
                <li key={activity.id} className="relative flex gap-4 pl-0">
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-400 bg-neutral-100 text-neutral-600">
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-400 leading-snug text-neutral-900">
                      {activity.summary}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-200 text-neutral-600">
                      {activity.actorName ? (
                        <span className="font-medium">{activity.actorName}</span>
                      ) : null}
                      {activity.actorName ? <span aria-hidden="true">·</span> : null}
                      <span>{formatContextual(activity.createdAt)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
