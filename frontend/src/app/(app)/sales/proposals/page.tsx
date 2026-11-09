"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { ProposalTracking, useProposals } from "@/features/proposals";
import { Skeleton } from "@/components/ui/Skeleton";

const links = [
  ["All", "/sales/proposals"],
  ["New", "/sales/proposals/new"],
  ["Templates", "/sales/proposals/templates"],
] as const;

export default function SalesProposalsPage() {
  const { data = [], isLoading } = useProposals();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Sales", href: "/sales" }, { label: "Proposals" }]}
        />
        <PageHeader title="Proposals" description="Pipeline proposals." />
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
          >
            {label}
          </Link>
        ))}
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <ProposalTracking proposals={data} />
      )}
    </div>
  );
}
