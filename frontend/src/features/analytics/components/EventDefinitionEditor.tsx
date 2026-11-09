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

import { useUpsertAnalyticsEvent } from "../hooks/useAnalytics";
import { slugifyEventName } from "../lib/events";

export function EventDefinitionEditor() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const upsert = useUpsertAnalyticsEvent();

  const onSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    await upsert.mutateAsync({
      payload: {
        name: slugifyEventName(trimmed) || trimmed,
        description: description || undefined,
        category: category || undefined,
        isKeyEvent: false,
      },
    });
    setName("");
    setDescription("");
    setCategory("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Define event</CardTitle>
        <CardDescription>Register a tracked event name.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="purchase_completed"
        />
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Description"
        />
        <div className="flex justify-end">
          <Button variant="contained" loading={upsert.isPending} onClick={onSubmit}>
            Save event
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
