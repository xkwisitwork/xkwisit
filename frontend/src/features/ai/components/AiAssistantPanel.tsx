"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";

import { useAi } from "../hooks/useAi";
import { validateAiPrompt } from "../guardrails/validators";
import type { AiAssistantMeta } from "../types";
import { AiGuardrailNotice } from "./AiGuardrailNotice";
import { AiOutput } from "./AiOutput";

export function AiAssistantPanel({ meta }: { meta: AiAssistantMeta }) {
  const [prompt, setPrompt] = useState("");
  const ai = useAi(meta.kind);

  const onRun = async () => {
    const check = validateAiPrompt(prompt);
    if (!check.ok) {
      toast.error(check.message ?? "Invalid prompt");
      return;
    }
    await ai.mutateAsync({ prompt: prompt.trim() });
  };

  return (
    <div className="space-y-4">
      <AiGuardrailNotice />
      <Card>
        <CardHeader>
          <CardTitle>{meta.title}</CardTitle>
          <CardDescription>{meta.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder={meta.placeholder}
          />
          <div className="flex justify-end">
            <Button variant="contained" loading={ai.isPending} onClick={onRun}>
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>
      <AiOutput result={ai.data} loading={ai.isPending} />
    </div>
  );
}
