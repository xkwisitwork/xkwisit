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
import { CAMPAIGN_STATUSES } from "@/lib/constants/statuses";

import { useCreateCampaign, useUpdateCampaign } from "../hooks/useCampaigns";
import type {
  Campaign,
  CampaignChannel,
  CampaignObjective,
  CreateCampaignPayload,
} from "../types";
import {
  CAMPAIGN_CHANNEL_LABELS,
  campaignObjectiveLabel,
} from "../utils/metricsCalculator";
import { CampaignObjectivePicker } from "./CampaignObjectivePicker";

const CHANNELS = Object.keys(CAMPAIGN_CHANNEL_LABELS) as CampaignChannel[];

const formSchema = z.object({
  clientId: z.string().min(1, "Select a client."),
  name: z.string().min(2, "Campaign name is required.").max(160).trim(),
  objective: z.enum([
    "LEAD_GENERATION",
    "BRAND_AWARENESS",
    "CONVERSIONS",
    "TRAFFIC",
    "RETENTION",
  ]),
  channels: z.array(z.string()).min(1, "Select at least one channel."),
  status: z
    .enum(["DRAFT", "SCHEDULED", "ACTIVE", "PAUSED", "COMPLETED", "ARCHIVED"])
    .default("DRAFT"),
  budgetAmount: z.coerce.number().nonnegative("Budget must be 0 or more."),
  currency: z.enum(["NGN", "USD", "GBP", "EUR"]).default("NGN"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().max(2000).trim().optional().or(z.literal("")),
  landingPageUrl: z
    .string()
    .url("Enter a valid URL (include https://).")
    .optional()
    .or(z.literal("")),
  utmSource: z.string().max(80).trim().optional().or(z.literal("")),
  utmMedium: z.string().max(80).trim().optional().or(z.literal("")),
  utmCampaign: z.string().max(80).trim().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export type CampaignFormProps = {
  mode: "create" | "edit";
  campaign?: Campaign;
  clients?: Array<{ id: string; name: string }>;
  cancelHref?: string;
};

export function CampaignForm({
  mode,
  campaign,
  clients = [],
  cancelHref = "/campaigns",
}: CampaignFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: campaign?.clientId ?? "",
      name: campaign?.name ?? "",
      objective: campaign?.objective ?? "LEAD_GENERATION",
      channels: campaign?.channels ?? [],
      status: campaign?.status ?? "DRAFT",
      budgetAmount: campaign?.budgetAmount ?? 0,
      currency: campaign?.currency ?? "NGN",
      startDate: campaign?.startDate ?? "",
      endDate: campaign?.endDate ?? "",
      description: campaign?.description ?? "",
      landingPageUrl: campaign?.landingPageUrl ?? "",
      utmSource: campaign?.utmSource ?? "",
      utmMedium: campaign?.utmMedium ?? "",
      utmCampaign: campaign?.utmCampaign ?? "",
    },
  });

  const createMutation = useCreateCampaign();
  const updateMutation = useUpdateCampaign(campaign?.id ?? "");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);

    const payload: CreateCampaignPayload = {
      clientId: values.clientId,
      name: values.name,
      objective: values.objective as CampaignObjective,
      channels: values.channels as CampaignChannel[],
      status: values.status,
      budgetAmount: values.budgetAmount,
      currency: values.currency,
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
      description: values.description || undefined,
      landingPageUrl: values.landingPageUrl || undefined,
      utmSource: values.utmSource || undefined,
      utmMedium: values.utmMedium || undefined,
      utmCampaign: values.utmCampaign || undefined,
    };

    try {
      if (mode === "create") {
        await createMutation.mutateAsync(payload);
      } else {
        await updateMutation.mutateAsync(payload);
        router.push(`/campaigns/${campaign?.id}`);
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
            <CardTitle>Campaign details</CardTitle>
            <CardDescription>
              Name, client, objective, and budget for this campaign.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel required>Campaign name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Q2 Lead Gen - Meta" autoFocus />
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
                      {Object.values(CAMPAIGN_STATUSES).map((status) => (
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
              name="budgetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Budget</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={0} step="1000" />
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(["NGN", "USD", "GBP", "EUR"] as const).map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
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
              name="description"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="What this campaign is meant to achieve."
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
            <CardTitle>Objective</CardTitle>
            <CardDescription>
              Primary outcome this campaign is optimising for.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CampaignObjectivePicker
                      value={field.value as CampaignObjective}
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
            <CardTitle>Channels</CardTitle>
            <CardDescription>
              Where this campaign will run. Selected:{" "}
              {form.watch("channels").length
                ? form
                    .watch("channels")
                    .map((c) => CAMPAIGN_CHANNEL_LABELS[c as CampaignChannel])
                    .join(", ")
                : "none"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="channels"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
                    {CHANNELS.map((channel) => {
                      const checked = field.value.includes(channel);

                      return (
                        <label
                          key={channel}
                          className="flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-400 px-3 py-2"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(next) => {
                              if (next) {
                                field.onChange([...field.value, channel]);
                              } else {
                                field.onChange(field.value.filter((c) => c !== channel));
                              }
                            }}
                          />
                          <span className="text-400">
                            {CAMPAIGN_CHANNEL_LABELS[channel]}
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
            <CardTitle>Tracking</CardTitle>
            <CardDescription>
              Landing page and UTM parameters for attribution.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="landingPageUrl"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel>Landing page URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="utmSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>utm_source</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="meta" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="utmMedium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>utm_medium</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="cpc" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="utmCampaign"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel>utm_campaign</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={campaignObjectiveLabel(
                        (form.watch("objective") as CampaignObjective) ??
                          "LEAD_GENERATION",
                      )}
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
            {mode === "create" ? "Create campaign" : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
