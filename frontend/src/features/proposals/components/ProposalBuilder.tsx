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

import { PROPOSAL_TEMPLATES } from "../data/proposalTemplates";
import { useCreateProposal, useProposalTemplates } from "../hooks/useProposals";
import { ProposalTemplatePicker } from "./ProposalTemplatePicker";

export function ProposalBuilder({
  clientId,
  onCreated,
}: {
  clientId: string;
  onCreated?: (id: string) => void;
}) {
  const remote = useProposalTemplates();
  const create = useCreateProposal();
  const templates =
    remote.data && remote.data.length > 0 ? remote.data : PROPOSAL_TEMPLATES;

  const [title, setTitle] = useState("");
  const [scope, setScope] = useState("");
  const [templateId, setTemplateId] = useState<string | undefined>();
  const [totalAmount, setTotalAmount] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>New proposal</CardTitle>
        <CardDescription>Choose a template and set the basics.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProposalTemplatePicker
          templates={templates}
          selectedId={templateId}
          onSelect={setTemplateId}
        />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Proposal title"
        />
        <Input
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          type="number"
          placeholder="Total amount"
        />
        <Textarea
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          rows={4}
          placeholder="Scope"
        />
        <div className="flex justify-end">
          <Button
            variant="contained"
            loading={create.isPending}
            onClick={async () => {
              if (!title.trim() || !clientId) return;
              const proposal = await create.mutateAsync({
                clientId,
                title: title.trim(),
                scope: scope || undefined,
                templateId,
                totalAmount: totalAmount ? Number(totalAmount) : undefined,
                deliverables: templates.find((t) => t.id === templateId)
                  ?.defaultDeliverables,
              });
              onCreated?.(proposal.id);
            }}
          >
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
