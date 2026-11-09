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
import { INDUSTRIES } from "@/lib/constants/industries";

import { useCreateClient, useUpdateClient } from "../hooks/useClientMutations";
import type { Client, ClientTier } from "../types";

const formSchema = z.object({
  name: z.string().min(2, "Client name is required.").max(120).trim(),
  legalName: z.string().max(160).trim().optional().or(z.literal("")),
  industry: z.string().min(1, "Select an industry."),
  website: z
    .string()
    .url("Enter a valid URL (include https://).")
    .optional()
    .or(z.literal("")),
  tier: z.enum(["STANDARD", "PREMIUM", "ENTERPRISE"]),
  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),
  notes: z.string().max(2000).trim().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export type ClientFormProps = {
  mode: "create" | "edit";
  client?: Client;
  cancelHref?: string;
};

export function ClientForm({ mode, client, cancelHref = "/clients" }: ClientFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client?.name ?? "",
      legalName: client?.legalName ?? "",
      industry: client?.industry ?? "Technology / SaaS",
      website: client?.website ?? "",
      tier: client?.tier ?? "STANDARD",
      contractStartDate: client?.contractStartDate ?? "",
      contractEndDate: client?.contractEndDate ?? "",
      notes: "",
    },
  });

  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient(client?.id ?? "");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);

    try {
      if (mode === "create") {
        await createMutation.mutateAsync(values);
      } else {
        await updateMutation.mutateAsync(values);
        router.push(`/clients/${client?.id}`);
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
            <CardTitle>Company details</CardTitle>
            <CardDescription>Basic information about this client.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel required>Client name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Acme Ltd" autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="legalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Acme Limited" />
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
                        <SelectValue />
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

            <FormField
              control={form.control}
              name="tier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Tier</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange(v as ClientTier)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STANDARD">Standard</SelectItem>
                      <SelectItem value="PREMIUM">Premium</SelectItem>
                      <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contract</CardTitle>
            <CardDescription>
              Optional - the contract term for this engagement.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 tablet:grid-cols-2">
            <FormField
              control={form.control}
              name="contractStartDate"
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
              name="contractEndDate"
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
              name="notes"
              render={({ field }) => (
                <FormItem className="tablet:col-span-2">
                  <FormLabel>Internal notes</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      maxLength={2000}
                      showCount
                      placeholder="Context, history, key stakeholder info…"
                    />
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
            loadingText={mode === "create" ? "Creating…" : "Saving…"}
          >
            {mode === "create" ? "Create client" : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
