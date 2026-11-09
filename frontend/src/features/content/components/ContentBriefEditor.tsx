"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";

import { useUpdateContent } from "../hooks/useContent";

export type ContentBriefEditorProps = {
  contentId: string;
  brief: string | null;
};

export function ContentBriefEditor({ contentId, brief }: ContentBriefEditorProps) {
  const [value, setValue] = useState(brief ?? "");
  const updateMutation = useUpdateContent(contentId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brief</CardTitle>
        <CardDescription>
          Creative direction and requirements for this piece.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={8}
          placeholder="Audience, angle, CTA, must-include points…"
        />
        <div className="flex justify-end">
          <Button
            variant="contained"
            size="sm"
            loading={updateMutation.isPending}
            onClick={() => updateMutation.mutate({ brief: value })}
          >
            <Save className="h-4 w-4" />
            Save brief
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
