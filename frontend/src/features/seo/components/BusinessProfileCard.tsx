"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { BusinessProfile } from "../types";

export function BusinessProfileCard({ profile }: { profile: BusinessProfile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{profile.businessName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-400">
        {profile.primaryCategory ? (
          <p className="text-neutral-600">{profile.primaryCategory}</p>
        ) : null}
        {profile.address ? <p>{profile.address}</p> : null}
        {profile.phone ? <p>{profile.phone}</p> : null}
        {profile.website ? <p className="text-primary">{profile.website}</p> : null}
        <div className="flex flex-wrap gap-2 pt-2">
          {profile.rating != null ? (
            <Badge variant="info" size="sm">
              {profile.rating.toFixed(1)} rating
            </Badge>
          ) : null}
          {profile.reviewCount != null ? (
            <Badge variant="muted" size="sm">
              {profile.reviewCount} reviews
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
