"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { WhyDidQuery } from "./WhyDidQuery";

export function WhyDidPanel({ clientId }: { clientId?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Why did this change?</CardTitle>
        <CardDescription>
          Attribute metric movement to contributing factors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WhyDidQuery clientId={clientId} />
      </CardContent>
    </Card>
  );
}
