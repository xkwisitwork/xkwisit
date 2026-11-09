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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { useCreateReport, useReportTemplates } from "../hooks/useReports";
import type { ReportPeriod } from "../types";
import { ReportTemplateList } from "./ReportTemplateList";

export function ReportBuilder() {
  const templates = useReportTemplates();
  const create = useCreateReport();
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState<ReportPeriod>("MONTHLY");
  const [templateId, setTemplateId] = useState<string | undefined>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>New report</CardTitle>
        <CardDescription>Pick a template and period.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Report title"
        />
        <Select value={period} onValueChange={(v) => setPeriod(v as ReportPeriod)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WEEKLY">Weekly</SelectItem>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="QUARTERLY">Quarterly</SelectItem>
            <SelectItem value="CUSTOM">Custom</SelectItem>
          </SelectContent>
        </Select>
        <ReportTemplateList
          templates={templates.data ?? []}
          loading={templates.isLoading}
          selectedId={templateId}
          onSelect={setTemplateId}
        />
        <div className="flex justify-end">
          <Button
            variant="contained"
            loading={create.isPending}
            onClick={() => {
              if (!title.trim()) return;
              void create.mutateAsync({
                title: title.trim(),
                period,
                templateId,
              });
            }}
          >
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
