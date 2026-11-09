"use client";

import Link from "next/link";
import { use } from "react";
import { Mail, Pencil, Phone, Globe, MapPin } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatContextual, formatDate } from "@/lib/utils/date";

import {
  LeadScoreBadge,
  LeadScoreBreakdown,
  LeadSourceBadge,
  LeadStatusBadge,
  LeadTimeline,
  useLead,
} from "@/features/leads";

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = use(params);
  const { data: lead, isLoading } = useLead(leadId);

  if (isLoading || !lead) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <div className="grid gap-6 laptop:grid-cols-3">
          <div className="space-y-6 laptop:col-span-2">
            <Skeleton variant="rectangle" className="h-64" />
            <Skeleton variant="rectangle" className="h-80" />
          </div>
          <Skeleton variant="rectangle" className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Breadcrumbs
          items={[
            { label: "CRM", href: "/crm" },
            { label: "Leads", href: "/crm/leads" },
            { label: lead.fullName },
          ]}
        />

        <PageHeader
          title={lead.fullName}
          description={`${lead.jobTitle ? `${lead.jobTitle} · ` : ""}${lead.company}`}
          actions={
            <>
              <Button
                variant="outlined"
                leftIcon={<Mail className="h-4 w-4" />}
                asChild={false}
              >
                <a href={`mailto:${lead.email}`}>Email</a>
              </Button>
              <Button
                variant="contained"
                leftIcon={<Pencil className="h-4 w-4" />}
                asChild={false}
              >
                <Link href={`/crm/leads/${lead.id}/edit`}>Edit lead</Link>
              </Button>
            </>
          }
        />
      </div>

      <div className="grid gap-6 laptop:grid-cols-3">
        <div className="space-y-6 laptop:col-span-2">
          {/* Contact card */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar name={lead.fullName} size="lg" />
                <div className="min-w-0">
                  <CardTitle>{lead.fullName}</CardTitle>
                  <CardDescription>
                    {lead.jobTitle ? `${lead.jobTitle} at ` : ""}
                    {lead.company}
                  </CardDescription>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <LeadStatusBadge status={lead.status} />
                    <LeadScoreBadge score={lead.score} />
                    <LeadSourceBadge source={lead.source} />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <dl className="grid gap-4 tablet:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                  <div className="min-w-0">
                    <dt className="text-200 font-semibold uppercase tracking-wide text-neutral-600">
                      Email
                    </dt>
                    <dd className="truncate text-400">
                      <a href={`mailto:${lead.email}`} className="hover:text-primary">
                        {lead.email}
                      </a>
                    </dd>
                  </div>
                </div>

                {lead.phone ? (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                    <div className="min-w-0">
                      <dt className="text-200 font-semibold uppercase tracking-wide text-neutral-600">
                        Phone
                      </dt>
                      <dd className="text-400">
                        <a href={`tel:${lead.phone}`} className="hover:text-primary">
                          {lead.phone}
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}

                {lead.website ? (
                  <div className="flex items-start gap-3">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                    <div className="min-w-0">
                      <dt className="text-200 font-semibold uppercase tracking-wide text-neutral-600">
                        Website
                      </dt>
                      <dd className="truncate text-400">
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="hover:text-primary"
                        >
                          {lead.website}
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
                  <div className="min-w-0">
                    <dt className="text-200 font-semibold uppercase tracking-wide text-neutral-600">
                      Industry
                    </dt>
                    <dd className="text-400">{lead.industry}</dd>
                  </div>
                </div>
              </dl>

              {lead.tags.length > 0 ? (
                <>
                  <Separator className="my-5" />
                  <div className="flex flex-wrap gap-1.5">
                    {lead.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>

          {/* Notes */}
          {lead.notes ? (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-400 leading-relaxed text-neutral-700">
                  {lead.notes}
                </p>
              </CardContent>
            </Card>
          ) : null}

          {/* Timeline */}
          <LeadTimeline leadId={lead.id} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <LeadScoreBreakdown leadId={lead.id} />

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-300">
              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-600">Owner</span>
                <span className="font-medium text-neutral-900">
                  {lead.ownerName ?? "Unassigned"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-neutral-600">Created</span>
                <span className="font-medium text-neutral-900">
                  {formatDate(lead.createdAt, "dd MMM yyyy")}
                </span>
              </div>

              {lead.lastContactedAt ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-neutral-600">Last contacted</span>
                  <span className="font-medium text-neutral-900">
                    {formatContextual(lead.lastContactedAt)}
                  </span>
                </div>
              ) : null}

              {lead.nextFollowUpAt ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-neutral-600">Next follow-up</span>
                  <span className="font-medium text-neutral-900">
                    {formatContextual(lead.nextFollowUpAt)}
                  </span>
                </div>
              ) : null}

              {lead.serviceInterest ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-neutral-600">Interest</span>
                  <span className="truncate font-medium text-neutral-900">
                    {lead.serviceInterest}
                  </span>
                </div>
              ) : null}

              {lead.budgetRange ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-neutral-600">Budget</span>
                  <span className="font-medium text-neutral-900">{lead.budgetRange}</span>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
