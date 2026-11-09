"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import type { BrandGuidelines } from "../types";
import { BrandColors } from "./BrandColors";
import { BrandTypography } from "./BrandTypography";

export type BrandGuidelinesProps = {
  guidelines?: BrandGuidelines | null;
  loading?: boolean;
};

export function BrandGuidelinesView({
  guidelines,
  loading = false,
}: BrandGuidelinesProps) {
  if (loading || !guidelines) {
    return <Skeleton variant="rectangle" className="h-64 w-full" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brand summary</CardTitle>
          <CardDescription>{guidelines.clientName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-400 leading-relaxed text-neutral-700">
            {guidelines.summary ?? "No summary yet."}
          </p>
          {guidelines.voiceTone ? (
            <div>
              <p className="text-200 text-neutral-600">Voice & tone</p>
              <p className="mt-1 text-400">{guidelines.voiceTone}</p>
            </div>
          ) : null}
          {guidelines.logoUsageNotes ? (
            <div>
              <p className="text-200 text-neutral-600">Logo usage</p>
              <p className="mt-1 text-400">{guidelines.logoUsageNotes}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandColors colors={guidelines.colors} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandTypography typefaces={guidelines.typefaces} />
        </CardContent>
      </Card>

      <div className="grid gap-4 tablet:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Do</CardTitle>
          </CardHeader>
          <CardContent>
            {guidelines.doList.length === 0 ? (
              <p className="text-400 text-neutral-600">None listed.</p>
            ) : (
              <ul className="list-disc space-y-1 pl-5 text-400">
                {guidelines.doList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Don&apos;t</CardTitle>
          </CardHeader>
          <CardContent>
            {guidelines.dontList.length === 0 ? (
              <p className="text-400 text-neutral-600">None listed.</p>
            ) : (
              <ul className="list-disc space-y-1 pl-5 text-400">
                {guidelines.dontList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
