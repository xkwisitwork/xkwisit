"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export type DealFormProps = {
  className?: string;
  title?: string;
  description?: string;
  onSubmit?: (values: Record<string, string>) => void;
};

export function DealForm({
  className,
  title = "Deal Form",
  description = "Capture the details your team needs to move this forward.",
  onSubmit,
}: DealFormProps) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.({ name, notes });
          }}
        >
          <label className="block space-y-1.5 text-300">
            <span className="font-medium text-neutral-700">Name</span>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </label>
          <label className="block space-y-1.5 text-300">
            <span className="font-medium text-neutral-700">Notes</span>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes"
            />
          </label>
          <div className="flex justify-end">
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
