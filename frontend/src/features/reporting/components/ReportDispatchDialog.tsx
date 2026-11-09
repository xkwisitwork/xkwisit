"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

import { useDispatchReport } from "../hooks/useReports";

export function ReportDispatchDialog({ reportId }: { reportId: string }) {
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatchReport(reportId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Send report</CardTitle>
        <CardDescription>Comma-separated recipient emails.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="team@client.com, ceo@client.com"
        />
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Optional message"
        />
        <div className="flex justify-end">
          <Button
            variant="contained"
            loading={dispatch.isPending}
            onClick={() => {
              const list = recipients
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
              if (list.length === 0) return;
              void dispatch.mutateAsync({
                recipients: list,
                message: message || undefined,
              });
            }}
          >
            Dispatch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
