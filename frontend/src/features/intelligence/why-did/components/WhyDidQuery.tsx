"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

import { useWhyDid } from "../hooks/useWhyDid";
import { WhyDidResultView } from "./WhyDidResult";

export function WhyDidQuery({ clientId }: { clientId?: string }) {
  const [metric, setMetric] = useState("");
  const [question, setQuestion] = useState("");
  const whyDid = useWhyDid();

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <Input
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          placeholder="Metric (e.g. conversion_rate)"
        />
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          placeholder="What changed and why?"
        />
        <div className="flex justify-end">
          <Button
            variant="contained"
            loading={whyDid.isPending}
            onClick={() => {
              if (!metric.trim()) return;
              whyDid.mutate({
                clientId,
                metric: metric.trim(),
                question: question || undefined,
              });
            }}
          >
            Analyze
          </Button>
        </div>
      </div>
      {whyDid.data ? <WhyDidResultView result={whyDid.data} /> : null}
    </div>
  );
}
