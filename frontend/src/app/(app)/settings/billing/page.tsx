"use client";

import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { useBilling } from "@/contexts/BillingContext";
import { cn } from "@/lib/utils/cn";

const PLANS = [
  {
    id: "STARTER",
    name: "Starter",
    blurb: "CRM, clients, projects, and core delivery.",
  },
  {
    id: "GROWTH",
    name: "Growth",
    blurb: "Campaigns, content, brand, approvals, reports.",
  },
  {
    id: "SCALE",
    name: "Scale",
    blurb: "Analytics, intelligence, automation, AI, finance.",
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    blurb: "Everything, plus priority support.",
  },
] as const;

export default function BillingSettingsPage() {
  const { billing, isLoading } = useBilling();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & plan"
        description="Your workspace subscription and trial status."
      />

      {isLoading ? (
        <p className="text-300 text-neutral-600">Loading billing…</p>
      ) : billing ? (
        <div className="grid gap-4 tablet:grid-cols-3">
          <div className="rounded-2xl border border-neutral-400/60 bg-white p-5">
            <p className="text-200 uppercase tracking-wide text-neutral-600">Status</p>
            <p className="mt-1 font-display text-500 font-bold">{billing.status}</p>
            {billing.trialActive ? (
              <p className="mt-2 text-300 text-neutral-600">
                {billing.trialDaysRemaining} day
                {billing.trialDaysRemaining === 1 ? "" : "s"} left in trial
              </p>
            ) : null}
            {billing.isLocked ? (
              <p className="mt-2 text-300 text-amber-800">
                Premium modules are locked until you upgrade.
              </p>
            ) : null}
          </div>
          <div className="rounded-2xl border border-neutral-400/60 bg-white p-5">
            <p className="text-200 uppercase tracking-wide text-neutral-600">Plan</p>
            <p className="mt-1 font-display text-500 font-bold">{billing.plan}</p>
            <p className="mt-2 text-300 text-neutral-600">
              {billing.seatsIncluded} seats included
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-400/60 bg-white p-5">
            <p className="text-200 uppercase tracking-wide text-neutral-600">
              Features unlocked
            </p>
            <p className="mt-1 font-display text-500 font-bold">
              {billing.entitlements.length}
            </p>
            <p className="mt-2 text-200 text-neutral-600">
              {billing.entitlements.slice(0, 6).join(", ")}
              {billing.entitlements.length > 6 ? "…" : ""}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-300 text-neutral-600">No billing data yet.</p>
      )}

      <div>
        <h2 className="font-display text-500 font-bold">Plans</h2>
        <p className="mt-1 text-300 text-neutral-600">
          Payment checkout (Paystack) comes next. For now a platform admin can activate
          your plan from Super Admin → Workspaces.
        </p>
        <ul className="mt-4 grid gap-3 tablet:grid-cols-2">
          {PLANS.map((plan) => {
            const current = billing?.plan === plan.id;
            return (
              <li
                key={plan.id}
                className={cn(
                  "rounded-2xl border bg-white p-5",
                  current ? "border-mint shadow-sm" : "border-neutral-400/60",
                )}
              >
                <p className="font-display text-400 font-bold">{plan.name}</p>
                <p className="mt-1 text-300 text-neutral-600">{plan.blurb}</p>
                {current ? (
                  <p className="mt-3 text-200 font-semibold text-mint">Current</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "outlined", size: "sm" }),
          "w-fit !rounded-full",
        )}
      >
        Back to dashboard
      </Link>
    </div>
  );
}
