"use client";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { useRunWorkflow } from "../hooks/useWorkflows";

export function WorkflowTestPanel({ workflowId }: { workflowId: string }) {
  const run = useRunWorkflow();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Test run</CardTitle>
        <CardDescription>Execute this workflow once.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="contained"
          loading={run.isPending}
          onClick={() => run.mutate(workflowId)}
        >
          Run now
        </Button>
      </CardContent>
    </Card>
  );
}
