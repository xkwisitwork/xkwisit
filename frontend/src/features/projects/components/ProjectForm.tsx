"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { MINIMUM_START_NGN, toNgn } from "@/config/commercial";
import { formatCurrency } from "@/lib/utils/currency";

import { useCreateProject, useUpdateProject } from "../hooks/useProjectMutations";
import type { CreateProjectPayload, Project } from "../types";

const formSchema = z.object({
  clientId: z.string().min(1, "Select a client."),
  name: z.string().min(2, "Project name is required.").max(160).trim(),
  description: z.string().max(2000).trim().optional().or(z.literal("")),
  status: z
    .enum(["ON_TRACK", "AT_RISK", "BLOCKED", "OVERDUE", "PAUSED", "COMPLETED"])
    .default("ON_TRACK"),
  pauseReason: z.string().max(160).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budgetAmount: z.coerce.number().nonnegative().optional(),
  currency: z.enum(["NGN", "USD", "GBP", "EUR"]).default("NGN"),
});

type FormValues = z.infer<typeof formSchema>;

export type ProjectFormProps = {
  mode: "create" | "edit";
  project?: Project;
  clients?: Array<{ id: string; name: string }>;
  cancelHref?: string;
};

export function ProjectForm({
  mode,
  project,
  clients = [],
  cancelHref = "/projects",
}: ProjectFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: project?.clientId ?? "",
      name: project?.name ?? "",
      description: project?.description ?? "",
      status: project?.status ?? "ON_TRACK",
      pauseReason: "Financial constraints",
      startDate: project?.startDate ?? "",
      endDate: project?.endDate ?? "",
      budgetAmount: project?.budgetAmount ?? undefined,
      currency: project?.currency ?? "NGN",
    },
  });

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject(project?.id ?? "");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);

    try {
      const budget = values.budgetAmount ?? 0;
      const budgetNgn = toNgn(budget, values.currency);
      if (values.status !== "PAUSED" && budgetNgn < MINIMUM_START_NGN) {
        form.setError("budgetAmount", {
          message: `Work starts after at least ${formatCurrency(MINIMUM_START_NGN)} is paid.`,
        });
        setSubmitting(false);
        return;
      }
      if (values.status === "PAUSED" && !values.pauseReason?.trim()) {
        form.setError("pauseReason", { message: "Say why this project is paused." });
        setSubmitting(false);
        return;
      }

      const payload: CreateProjectPayload & { healthNote?: string } = {
        clientId: values.clientId,
        name: values.name,
        description: values.description || undefined,
        status: values.status,
        startDate: values.startDate || undefined,
        endDate: values.endDate || undefined,
        budgetAmount: values.budgetAmount,
        currency: values.currency,
        healthNote:
          values.status === "PAUSED"
            ? `Paused: ${values.pauseReason?.trim()}`
            : undefined,
      };

      if (mode === "create") {
        await createMutation.mutateAsync(payload);
      } else {
        await updateMutation.mutateAsync(payload);
        router.push(`/projects/${project?.id}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project details</CardTitle>
            <CardDescription>What this project is about.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel required>Client</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel required>Project name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Q1 brand refresh" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} maxLength={2000} showCount />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline & budget</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ON_TRACK">On track</SelectItem>
                      <SelectItem value="AT_RISK">At risk</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                      <SelectItem value="OVERDUE">Overdue</SelectItem>
                      <SelectItem value="PAUSED">Paused</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("status") === "PAUSED" ? (
              <FormField
                control={form.control}
                name="pauseReason"
                render={({ field }) => (
                  <FormItem className="tablet:col-span-2">
                    <FormLabel required>Pause reason</FormLabel>
                    <Select
                      value={field.value || "Financial constraints"}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Financial constraints" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Financial constraints">
                          Financial constraints
                        </SelectItem>
                        <SelectItem value="Waiting on the client">
                          Waiting on the client
                        </SelectItem>
                        <SelectItem value="Scope not agreed">Scope not agreed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="budgetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="1500000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NGN">NGN (₦)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 tablet:flex-row tablet:justify-end">
          <Button
            type="button"
            variant="outlined"
            size="lg"
            leftIcon={<X className="h-4 w-4" />}
            onClick={() => router.push(cancelHref)}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="lg"
            leftIcon={<Save className="h-4 w-4" />}
            loading={submitting}
            loadingText={mode === "create" ? "Creating…" : "Saving…"}
          >
            {mode === "create" ? "Create project" : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
