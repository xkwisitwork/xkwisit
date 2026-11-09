"use client";

import Link from "next/link";
import { use } from "react";
import { ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCampaign } from "@/features/campaigns";

export default function CampaignLandingPagesPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  const { data: campaign, isLoading } = useCampaign(campaignId);

  if (isLoading || !campaign) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <Skeleton variant="rectangle" className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Campaigns", href: "/campaigns" },
            { label: campaign.name, href: `/campaigns/${campaign.id}` },
            { label: "Landing pages" },
          ]}
        />
        <PageHeader
          title="Landing pages"
          description="Primary destination for this campaign."
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Primary landing page</CardTitle>
          <CardDescription>Linked from campaign tracking settings.</CardDescription>
        </CardHeader>
        <CardContent>
          {campaign.landingPageUrl ? (
            <Link
              href={campaign.landingPageUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-400 text-primary hover:underline"
            >
              {campaign.landingPageUrl}
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <p className="text-400 text-neutral-600">
              No landing page URL set for this campaign.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
