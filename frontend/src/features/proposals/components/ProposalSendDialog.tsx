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

import { useSendProposal } from "../hooks/useProposals";

export function ProposalSendDialog({ proposalId }: { proposalId: string }) {
  const send = useSendProposal(proposalId);
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Send proposal</CardTitle>
        <CardDescription>Comma-separated recipient emails.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="client@company.com"
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
            loading={send.isPending}
            onClick={() => {
              const list = recipients
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
              if (list.length === 0) return;
              void send.mutateAsync({
                recipients: list,
                message: message || undefined,
              });
            }}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
