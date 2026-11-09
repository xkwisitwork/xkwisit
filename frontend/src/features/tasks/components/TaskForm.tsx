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

import { useCreateTask, useUpdateTask } from "../hooks/useTaskMutations";
import type { Task } from "../types";

const formSchema = z.object({
  title: z.string().min(1, "Task title is required.").max(200).trim(),
  description: z.string().max(2000).trim().optional().or(z.literal("")),
  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "BLOCKED", "DONE"]).default("TODO"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  projectId: z.string().optional().or(z.literal("")),
  assigneeId: z.string().optional().or(z.literal("")),
  dueDate: z.string().optional(),
  estimateHours: z.coerce.number().nonnegative().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export type TaskFormProps = {
  mode: "create" | "edit";
  task?: Task;
  projects?: Array<{ id: string; name: string }>;
  members?: Array<{ id: string; name: string }>;
  defaultProjectId?: string;
  cancelHref?: string;
};

export function TaskForm({
  mode,
  task,
  projects = [],
  members = [],
  defaultProjectId,
  cancelHref = "/tasks",
}: TaskFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "TODO",
      priority: task?.priority ?? "MEDIUM",
      projectId: task?.projectId ?? defaultProjectId ?? "",
      assigneeId: task?.assigneeId ?? "",
      dueDate: task?.dueDate ?? "",
      estimateHours: task?.estimateHours ?? undefined,
    },
  });

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask(task?.id ?? "");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);

    try {
      const payload = {
        ...values,
        description: values.description || undefined,
        projectId: values.projectId || undefined,
        assigneeId: values.assigneeId || undefined,
      };

      if (mode === "create") {
        await createMutation.mutateAsync(payload);
        router.push("/tasks");
      } else {
        await updateMutation.mutateAsync(payload);
        router.push(`/tasks/${task?.id}`);
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
            <CardTitle>Task details</CardTitle>
            <CardDescription>What needs to be done.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel required>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Draft Q1 campaign brief" autoFocus />
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
                    <Textarea {...field} rows={4} maxLength={2000} showCount />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignment</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Optional" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
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
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unassigned" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {members.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
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
                      <SelectItem value="TODO">To do</SelectItem>
                      <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                      <SelectItem value="IN_REVIEW">In review</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                      <SelectItem value="DONE">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimateHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimate (hours)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.5" placeholder="4" />
                  </FormControl>
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
          >
            {mode === "create" ? "Create task" : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
