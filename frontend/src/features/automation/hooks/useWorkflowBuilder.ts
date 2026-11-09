"use client";

import { useState } from "react";

import type {
  ActionType,
  TriggerType,
  WorkflowAction,
  WorkflowCondition,
  WorkflowTrigger,
} from "../types";

export function useWorkflowBuilder(initialName = "") {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState("");
  const [triggerType, setTriggerType] = useState<TriggerType>("MANUAL");
  const [conditions, setConditions] = useState<WorkflowCondition[]>([]);
  const [actions, setActions] = useState<WorkflowAction[]>([]);

  const trigger: WorkflowTrigger = {
    type: triggerType,
    label: triggerType,
    config: {},
  };

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        field: "status",
        operator: "eq",
        value: "",
      },
    ]);
  };

  const addAction = (type: ActionType = "NOTIFY") => {
    setActions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        label: type,
        config: {},
      },
    ]);
  };

  const reset = () => {
    setName("");
    setDescription("");
    setTriggerType("MANUAL");
    setConditions([]);
    setActions([]);
  };

  return {
    name,
    setName,
    description,
    setDescription,
    triggerType,
    setTriggerType,
    trigger,
    conditions,
    setConditions,
    addCondition,
    actions,
    setActions,
    addAction,
    reset,
  };
}
