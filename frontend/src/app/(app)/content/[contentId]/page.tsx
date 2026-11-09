"use client";

import Link from "next/link";
import { use } from "react";
import { Pencil } from "lucide-react";

import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/Button/variants";

import {
  ContentApprovalFlow,
  ContentBriefEditor,
  CONTENT_OBJECTIVE_LABELS,
  CONTENT_TYPE_LABELS,
  contentStatusLabel,
  contentStatusTone,
  useContent,
} from "@/features/content";

export default function ContentDetailPage({
  params,
}: {
  params: Promise<{ contentId: string }>;
}) {
  const { contentId } = use(params);
  const { data: item, isLoading } = useContent(contentId);

  if (isLoading || !item) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <Skeleton variant="rectangle" className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Content", href: "/content" }, { label: item.title }]}
        />
        <PageHeader
          title={item.title}
          description={item.clientName}
          actions={
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone={contentStatusTone(item.status)}>
                {contentStatusLabel(item.status)}
              </StatusBadge>
              <Link
                href={`/content/${item.id}/edit`}
                className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
            </div>
          }
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge variant="muted" size="sm">
          {CONTENT_TYPE_LABELS[item.type]}
        </Badge>
        <Badge variant="muted" size="sm">
          {CONTENT_OBJECTIVE_LABELS[item.objective]}
        </Badge>
        {item.dueDate ? (
          <Badge variant="muted" size="sm">
            Due {formatDate(item.dueDate, "d MMM yyyy")}
          </Badge>
        ) : null}
      </div>

      <ContentBriefEditor contentId={item.id} brief={item.brief} />
      <ContentApprovalFlow contentId={item.id} status={item.status} />

      {item.body ? (
        <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-6">
          <h2 className="text-500 font-medium">Draft body</h2>
          <p className="mt-3 whitespace-pre-wrap text-400 leading-relaxed text-neutral-700">
            {item.body}
          </p>
        </div>
      ) : null}
    </div>
  );
}
