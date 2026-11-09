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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { CONTENT_STATUSES } from "@/lib/constants/statuses";
import { FUNNEL_STAGES, type FunnelStageId } from "@/lib/constants/funnel-stages";

import { useCreateContent, useUpdateContent } from "../hooks/useContent";
import type {
  ContentItem,
  ContentObjective,
  ContentPlatform,
  ContentType,
  CreateContentPayload,
} from "../types";
import { CONTENT_PLATFORM_LABELS, CONTENT_TYPE_LABELS } from "../utils/contentLabels";
import { ContentObjectivePicker } from "./ContentObjectivePicker";

const PLATFORMS = Object.keys(CONTENT_PLATFORM_LABELS) as ContentPlatform[];
const TYPES = Object.keys(CONTENT_TYPE_LABELS) as ContentType[];

const formSchema = z.object({
  clientId: z.string().min(1, "Select a client."),
  title: z.string().min(2, "Title is required.").max(200).trim(),
  type: z.enum([
    "BLOG_POST",
    "SOCIAL_POST",
    "VIDEO",
    "EMAIL",
    "LANDING_PAGE",
    "CASE_STUDY",
    "WHITEPAPER",
    "INFOGRAPHIC",
    "PODCAST",
    "OTHER",
  ]),
  objective: z.enum([
    "AWARENESS",
    "CONSIDERATION",
    "CONVERSION",
    "RETENTION",
    "AUTHORITY",
  ]),
  funnelStage: z.enum([
    "traffic",
    "visitors",
    "leads",
    "qualified",
    "opportunities",
    "proposals",
    "customers",
    "revenue",
  ]),
  platforms: z.array(z.string()).min(1, "Select at least one platform."),
  status: z
    .enum([
      "IDEA",
      "BRIEF",
      "DRAFT",
      "DESIGN",
      "INTERNAL_REVIEW",
      "CLIENT_APPROVAL",
      "SCHEDULED",
      "PUBLISHED",
    ])
    .default("IDEA"),
  brief: z.string().max(5000).optional().or(z.literal("")),
  audience: z.string().max(500).optional().or(z.literal("")),
  cta: z.string().max(200).optional().or(z.literal("")),
  dueDate: z.string().optional(),
  publishAt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export type ContentFormProps = {
  mode: "create" | "edit";
  item?: ContentItem;
  clients?: Array<{ id: string; name: string }>;
  cancelHref?: string;
};

export function ContentForm({
  mode,
  item,
  clients = [],
  cancelHref = "/content",
}: ContentFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: item?.clientId ?? "",
      title: item?.title ?? "",
      type: item?.type ?? "BLOG_POST",
      objective: item?.objective ?? "AWARENESS",
      funnelStage: item?.funnelStage ?? "leads",
      platforms: item?.platforms ?? [],
      status: item?.status ?? "IDEA",
      brief: item?.brief ?? "",
      audience: item?.audience ?? "",
      cta: item?.cta ?? "",
      dueDate: item?.dueDate ?? "",
      publishAt: item?.publishAt ?? "",
    },
  });

  const createMutation = useCreateContent();
  const updateMutation = useUpdateContent(item?.id ?? "");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    const payload: CreateContentPayload = {
      clientId: values.clientId,
      title: values.title,
      type: values.type as ContentType,
      objective: values.objective as ContentObjective,
      funnelStage: values.funnelStage as FunnelStageId,
      platforms: values.platforms as ContentPlatform[],
      status: values.status,
      brief: values.brief || undefined,
      audience: values.audience || undefined,
      cta: values.cta || undefined,
      dueDate: values.dueDate || undefined,
      publishAt: values.publishAt || undefined,
    };

    try {
      if (mode === "create") {
        await createMutation.mutateAsync(payload);
      } else {
        await updateMutation.mutateAsync(payload);
        router.push(`/content/${item?.id}`);
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
            <CardTitle>Content details</CardTitle>
            <CardDescription>Title, type, client, and timeline.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel required>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Q2 LinkedIn thought leadership"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Client</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {CONTENT_TYPE_LABELS[type]}
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CONTENT_STATUSES).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace(/_/g, " ")}
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
              name="funnelStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Funnel stage</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FUNNEL_STAGES.map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>
                          {stage.label}
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
              name="publishAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audience</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ICP / segment" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CTA</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Book a call" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objective</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ContentObjectivePicker
                      value={field.value as ContentObjective}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="platforms"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
                    {PLATFORMS.map((platform) => {
                      const checked = field.value.includes(platform);
                      return (
                        <label
                          key={platform}
                          className="flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-400 px-3 py-2"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(next) => {
                              if (next) field.onChange([...field.value, platform]);
                              else
                                field.onChange(field.value.filter((p) => p !== platform));
                            }}
                          />
                          <span className="text-400">
                            {CONTENT_PLATFORM_LABELS[platform]}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brief</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="brief"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder="Audience, angle, CTA, must-include points…"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.push(cancelHref)}
            disabled={submitting}
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            <Save className="h-4 w-4" />
            {mode === "create" ? "Create content" : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
