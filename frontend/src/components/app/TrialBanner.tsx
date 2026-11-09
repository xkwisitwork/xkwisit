"use client";

import Link from "next/link";
import { AlertTriangle, Timer } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button/variants";
import { useBilling } from "@/contexts/BillingContext";
import { cn } from "@/lib/utils/cn";

export function TrialBanner() {
  const { billing, isLoading, isPlatformAdmin } = useBilling();

  // Platform owners are not tenants on a trial - skip all billing banners.
  if (isLoading || !billing || isPlatformAdmin) return null;

  if (billing.trialActive && billing.trialDaysRemaining != null) {
    const urgent = billing.trialDaysRemaining <= 3;
    return (
      <div
        className={cn(
          "flex flex-col gap-3 rounded-2xl border px-3 py-3 mobile-md:px-4 tablet:flex-row tablet:items-center tablet:justify-between",
          urgent
            ? "border-amber-300 bg-amber-50 text-amber-950"
            : "border-mint/30 bg-mint-soft/50 text-neutral-900",
        )}
      >
        <div className="flex min-w-0 items-start gap-2">
          <Timer className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
          <div className="min-w-0">
            <p className="text-300 font-semibold">
              {billing.trialDaysRemaining} day
              {billing.trialDaysRemaining === 1 ? "" : "s"} left on your trial
            </p>
            <p className="text-200 text-neutral-600">
              Full Mission Control is unlocked until trial ends. Pick a plan to keep
              premium modules.
            </p>
          </div>
        </div>
        <Link
          href="/settings/billing"
          className={cn(
            buttonVariants({ variant: "contained", size: "sm" }),
            "w-full shrink-0 !rounded-full !bg-mint !text-white tablet:w-auto",
          )}
        >
          View plans
        </Link>
      </div>
    );
  }

  if (billing.isLocked) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-3 text-red-950 mobile-md:px-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <div className="flex min-w-0 items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="min-w-0">
            <p className="text-300 font-semibold">Trial ended - workspace limited</p>
            <p className="text-200 text-red-800/80">
              Upgrade to restore campaigns, intelligence, automation, and the rest of your
              plan.
            </p>
          </div>
        </div>
        <Link
          href="/settings/billing"
          className={cn(
            buttonVariants({ variant: "contained", size: "sm" }),
            "w-full shrink-0 !rounded-full !bg-mint !text-white tablet:w-auto",
          )}
        >
          Upgrade now
        </Link>
      </div>
    );
  }

  return null;
}
