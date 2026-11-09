"use client";

import { ImageIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export type CreativeGridProps = {
  emptyMessage?: string;
};

/**
 * Lean placeholder until creatives are modeled in the API.
 * Keeps the scaffold route usable without inventing entities.
 */
export function CreativeGrid({
  emptyMessage = "Creatives for this campaign will appear here once linked from content production.",
}: CreativeGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Creatives</CardTitle>
        <CardDescription>
          Ads and assets running on this campaign&apos;s channels.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-400 px-6 py-12 text-center">
          <ImageIcon className="h-8 w-8 text-neutral-600" />
          <p className="max-w-md text-400 text-neutral-600">{emptyMessage}</p>
        </div>
      </CardContent>
    </Card>
  );
}
