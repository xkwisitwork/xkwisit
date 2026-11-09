import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/data-display/StatCard";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Portal home",
  description: "Your Xkwisit client portal overview.",
};

const links = [
  { href: "/brief", label: "Weekly brief" },
  { href: "/performance", label: "Performance" },
  { href: "/portal/approvals", label: "Approvals" },
  { href: "/messages", label: "Messages" },
] as const;

export default function PortalHomePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] bg-[#3B05C4] px-5 py-6 text-center text-white mobile-sm:px-7">
        <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/75">
          Your account
        </p>
        <h2 className="mt-2 font-display text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-tight">
          Glance. Know. Decide.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[0.92rem] leading-relaxed text-white/85">
          Approvals, the weekly brief, and what needs you. One place, on your phone,
          before the week starts.
        </p>
      </div>
      <PageHeader
        title="Welcome back"
        description="Your weekly numbers, approvals, and next actions - in one place."
        actions={
          <Link
            href="/brief"
            className={cn(
              buttonVariants({ variant: "contained", size: "lg" }),
              "!rounded-full !bg-mint !text-white",
            )}
          >
            Open weekly brief
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <div className="grid gap-4 tablet:grid-cols-3">
        <StatCard label="Pipeline health" value="82%" hint="↑ 4pts this week" />
        <StatCard label="Open approvals" value="3" hint="2 content · 1 creative" />
        <StatCard label="Priority constraint" value="Offer" hint="Brand lens this week" />
      </div>
      <ul className="grid gap-3 tablet:grid-cols-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between rounded-2xl border border-[#E7DEFF] bg-white px-5 py-4 font-semibold text-[#16024A] shadow-[0_16px_40px_-28px_rgba(22,2,74,0.35)] hover:border-[#3B05C4]"
            >
              {item.label}
              <ArrowRight className="h-4 w-4 text-mint" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
