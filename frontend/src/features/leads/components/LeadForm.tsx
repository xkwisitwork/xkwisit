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
  FormDescription,
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
import { LEAD_SOURCES } from "@/lib/constants/funnel-stages";
import { INDUSTRIES } from "@/lib/constants/industries";
import { createLeadSchema } from "@/lib/validation/schemas/lead.schema";

import { useCreateLead, useUpdateLead } from "../hooks/useLeadMutations";
import type { Lead } from "../types";

/* ─── Local schema (extends shared) ─────────────────── */

const formSchema = createLeadSchema.extend({
  tagsInput: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

/* ─── Component ──────────────────────────────────────── */

export type LeadFormProps = {
  mode: "create" | "edit";
  lead?: Lead;
  /** Cancel URL. Defaults to leads list. */
  cancelHref?: string;
};

export function LeadForm({ mode, lead, cancelHref = "/crm/leads" }: LeadFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: lead?.firstName ?? "",
      lastName: lead?.lastName ?? "",
      email: lead?.email ?? "",
      phone: lead?.phone ?? "",
      company: lead?.company ?? "",
      website: lead?.website ?? "",
      jobTitle: lead?.jobTitle ?? "",
      industry: lead?.industry ?? "Technology / SaaS",
      source: (lead?.source as FormValues["source"]) ?? "Website",
      serviceInterest: lead?.serviceInterest ?? "",
      budgetRange: lead?.budgetRange ?? "",
      notes: lead?.notes ?? "",
      ownerId: lead?.ownerId ?? undefined,
      tags: lead?.tags ?? [],
      tagsInput: (lead?.tags ?? []).join(", "),
    },
  });

  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead(lead?.id ?? "");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);

    try {
      const { tagsInput, ...rest } = values;
      const tags = (tagsInput ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      if (mode === "create") {
        await createMutation.mutateAsync({ ...rest, tags });
      } else {
        await updateMutation.mutateAsync({ ...rest, tags });
        router.push(`/crm/leads/${lead?.id}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ─── Contact ─────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>Who is this lead and how do you reach them?</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>First name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ada" autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Obi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="ada@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="+234 800 000 0000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Head of Marketing" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* ─── Company ─────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
            <CardDescription>The business this lead represents.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel required>Company name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Acme Ltd" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Industry</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* ─── Qualification ───────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle>Qualification</CardTitle>
            <CardDescription>
              Where this lead came from and what they&apos;re interested in.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Source</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LEAD_SOURCES.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
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
              name="serviceInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service interest</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Branding, SEO, Paid Media…" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget range</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="₦1M – ₦2M per month" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagsInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="hot, enterprise, referral" />
                  </FormControl>
                  <FormDescription>Comma-separated.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      maxLength={2000}
                      showCount
                      placeholder="Anything worth remembering about this lead…"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* ─── Actions ─────────────────────────────── */}
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
            {mode === "create" ? "Create lead" : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
