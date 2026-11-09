"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

import { useUpdateProposal } from "../hooks/useProposals";
import type { Proposal } from "../types";

export function ProposalEditor({ proposal }: { proposal: Proposal }) {
  const update = useUpdateProposal(proposal.id);
  const [title, setTitle] = useState(proposal.title);
  const [scope, setScope] = useState(proposal.scope ?? "");
  const [terms, setTerms] = useState(proposal.terms ?? "");

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-400 p-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea
        value={scope}
        onChange={(e) => setScope(e.target.value)}
        rows={4}
        placeholder="Scope"
      />
      <Textarea
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        rows={3}
        placeholder="Terms"
      />
      <div className="flex justify-end">
        <Button
          variant="contained"
          loading={update.isPending}
          onClick={() =>
            void update.mutateAsync({
              title,
              scope,
              terms,
            })
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
}
