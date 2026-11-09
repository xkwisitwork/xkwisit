"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import type { Campaign } from "../types";

export type AudiencePanelProps = {
  campaign: Campaign;
};

export function AudiencePanel({ campaign }: AudiencePanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience & tracking</CardTitle>
        <CardDescription>
          Landing page and UTM parameters used for this campaign.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-200 text-neutral-600">Landing page</p>
          {campaign.landingPageUrl ? (
            <Link
              href={campaign.landingPageUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-400 text-primary hover:underline"
            >
              {campaign.landingPageUrl}
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <p className="mt-1 text-400 text-neutral-600">Not set</p>
          )}
        </div>

        <div className="grid gap-3 tablet:grid-cols-3">
          <div>
            <p className="text-200 text-neutral-600">utm_source</p>
            <p className="mt-1 text-400">{campaign.utmSource ?? "-"}</p>
          </div>
          <div>
            <p className="text-200 text-neutral-600">utm_medium</p>
            <p className="mt-1 text-400">{campaign.utmMedium ?? "-"}</p>
          </div>
          <div>
            <p className="text-200 text-neutral-600">utm_campaign</p>
            <p className="mt-1 text-400">{campaign.utmCampaign ?? "-"}</p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-200 text-neutral-600">Tags</p>
          {campaign.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {campaign.tags.map((tag) => (
                <Badge key={tag} variant="muted" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-400 text-neutral-600">No tags</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
