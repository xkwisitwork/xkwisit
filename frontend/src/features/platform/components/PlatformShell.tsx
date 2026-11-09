"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useSession } from "next-auth/react";

import { buttonVariants } from "@/components/ui/Button/variants";
import { useBilling } from "@/contexts/BillingContext";
import { cn } from "@/lib/utils/cn";


export function PlatformGate({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const { isPlatformAdmin, isLoading } = useBilling();
  const sessionAdmin = Boolean(session?.user?.isPlatformAdmin);

  // JWT + server layout already prove platform access. Render immediately when
  // the session claims admin so billing /me catch-up never flashes the denial.
  if (sessionAdmin || isPlatformAdmin) {
    return <>{children}</>;
  }

  if (status === "loading" || isLoading) {
    return <p className="text-300 text-neutral-600">Loading…</p>;
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <p className="font-semibold text-red-900">Platform admin only</p>
      <p className="mt-1 text-300 text-red-800">
        Your account is not a super admin. Use an agency workspace instead.
      </p>
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "outlined", size: "sm" }),
          "mt-4 !rounded-full",
        )}
      >
        Back to dashboard
      </Link>
    </div>
  );
}

export function PlatformSubnav({ active }: { active: string }) {
  const links = [
    ["Overview", "/platform"],
    ["Workspaces", "/platform/workspaces"],
    ["Users", "/platform/users"],
    ["Health", "/platform/health"],
    ["Audit", "/platform/audit"],
  ] as const;

  return (
    <nav
      aria-label="Platform sections"
      className={cn(
        "w-full min-w-0 rounded-2xl border border-[#EDE8F7] bg-white",
        "p-2 shadow-[0_14px_32px_-28px_rgba(22,2,74,0.45)]",
        "tablet:rounded-full tablet:p-1.5",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-2 gap-1.5",
          "tablet:flex tablet:flex-wrap tablet:items-center tablet:gap-1",
        )}
      >
        {links.map(([label, href], index) => {
          const isActive = active === href;
          const aloneOnLastRow =
            links.length % 2 === 1 && index === links.length - 1;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "min-w-0 rounded-xl px-3 py-2.5 text-center text-[0.78rem] font-semibold transition",
                "tablet:rounded-full tablet:px-3.5 tablet:py-2 tablet:text-left",
                aloneOnLastRow && "col-span-2 tablet:col-span-1",
                isActive
                  ? "bg-[#3B05C4] text-white shadow-[0_10px_22px_-12px_rgba(59,5,196,0.75)]"
                  : "bg-[#F7F5FC] text-neutral-600 hover:bg-[#F4F0FF] hover:text-[#16024A] tablet:bg-transparent",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
