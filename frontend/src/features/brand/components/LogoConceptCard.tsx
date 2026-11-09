"use client";

import { Badge, StatusBadge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import type { LogoConcept } from "../types";

export type LogoConceptCardProps = {
  concept: LogoConcept;
};

function tone(status: LogoConcept["status"]) {
  if (status === "APPROVED") return "success" as const;
  if (status === "PENDING") return "warning" as const;
  if (status === "CHANGES_REQUESTED") return "info" as const;
  return "destructive" as const;
}

export function LogoConceptCard({ concept }: LogoConceptCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{concept.name}</CardTitle>
          <StatusBadge tone={tone(concept.status)} size="sm">
            {concept.status.replace(/_/g, " ")}
          </StatusBadge>
        </div>
        {concept.description ? (
          <CardDescription>{concept.description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={concept.previewUrl}
            alt={concept.name}
            className="max-h-full max-w-full object-contain p-4"
          />
        </div>
        <Badge variant="muted" size="sm">
          v{concept.version}
        </Badge>
      </CardContent>
    </Card>
  );
}
