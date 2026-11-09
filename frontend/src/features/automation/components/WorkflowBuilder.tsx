"use client";

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

import { useCreateWorkflow } from "../hooks/useWorkflows";
import { useWorkflowBuilder } from "../hooks/useWorkflowBuilder";
import { IfBlock } from "./IfBlock";
import { ThenBlock } from "./ThenBlock";
import { WhenBlock } from "./WhenBlock";

export function WorkflowBuilder({ onCreated }: { onCreated?: (id: string) => void }) {
  const builder = useWorkflowBuilder();
  const create = useCreateWorkflow();

  const onSubmit = async () => {
    if (!builder.name.trim() || builder.actions.length === 0) return;
    const workflow = await create.mutateAsync({
      name: builder.name.trim(),
      description: builder.description || undefined,
      trigger: builder.trigger,
      conditions: builder.conditions,
      actions: builder.actions,
      status: "DRAFT",
    });
    builder.reset();
    onCreated?.(workflow.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow builder</CardTitle>
        <CardDescription>When → If → Then</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={builder.name}
          onChange={(e) => builder.setName(e.target.value)}
          placeholder="Workflow name"
        />
        <Textarea
          value={builder.description}
          onChange={(e) => builder.setDescription(e.target.value)}
          rows={2}
          placeholder="Description"
        />
        <WhenBlock triggerType={builder.triggerType} onChange={builder.setTriggerType} />
        <IfBlock
          conditions={builder.conditions}
          onChange={builder.setConditions}
          onAdd={builder.addCondition}
        />
        <ThenBlock actions={builder.actions} onAdd={builder.addAction} />
        <div className="flex justify-end">
          <Button variant="contained" loading={create.isPending} onClick={onSubmit}>
            Create workflow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
