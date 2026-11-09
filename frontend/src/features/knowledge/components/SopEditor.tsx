"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

import type { Sop } from "../types";

export function SopEditor({
  sop,
  onSave,
}: {
  sop: Sop;
  onSave?: (next: { title: string; summary: string }) => void;
}) {
  const [title, setTitle] = useState(sop.title);
  const [summary, setSummary] = useState(sop.summary ?? "");

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-400 p-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={3}
        placeholder="Summary"
      />
      <div className="flex justify-end">
        <Button variant="outlined" onClick={() => onSave?.({ title, summary })}>
          Save draft
        </Button>
      </div>
    </div>
  );
}
