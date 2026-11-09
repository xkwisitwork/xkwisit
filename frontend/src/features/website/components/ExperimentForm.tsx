"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

import { useCreateExperiment } from "../hooks/useExperiments";
import type { ExperimentType } from "../types";

export function ExperimentForm({ clientId }: { clientId: string }) {
  const [name, setName] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [type, setType] = useState<ExperimentType>("AB");
  const [primaryMetric, setPrimaryMetric] = useState("conversion_rate");
  const createMutation = useCreateExperiment(clientId);

  const onSubmit = async () => {
    if (!name.trim()) return;
    await createMutation.mutateAsync({
      clientId,
      name,
      hypothesis: hypothesis || undefined,
      type,
      primaryMetric,
      variants: [{ name: "Control", isControl: true }, { name: "Variant B" }],
    });
    setName("");
    setHypothesis("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New experiment</CardTitle>
        <CardDescription>Create an A/B or split test.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 tablet:grid-cols-2">
        <div className="tablet:col-span-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hero CTA test"
          />
        </div>
        <Select value={type} onValueChange={(v) => setType(v as ExperimentType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AB">A/B</SelectItem>
            <SelectItem value="MULTIVARIATE">Multivariate</SelectItem>
            <SelectItem value="SPLIT_URL">Split URL</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={primaryMetric}
          onChange={(e) => setPrimaryMetric(e.target.value)}
          placeholder="Primary metric"
        />
        <div className="tablet:col-span-2">
          <Textarea
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            rows={3}
            placeholder="Hypothesis"
          />
        </div>
        <div className="flex justify-end tablet:col-span-2">
          <Button
            variant="contained"
            loading={createMutation.isPending}
            onClick={onSubmit}
          >
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
