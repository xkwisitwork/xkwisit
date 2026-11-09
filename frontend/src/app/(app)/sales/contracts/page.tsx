"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { ContractList, useContracts } from "@/features/contracts";

export default function SalesContractsPage() {
  const { data = [], isLoading } = useContracts();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Sales", href: "/sales" }, { label: "Contracts" }]}
        />
        <PageHeader title="Contracts" description="Agreements and signatures." />
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/sales/contracts/templates"
          className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
        >
          Templates
        </Link>
      </div>
      <ContractList contracts={data} loading={isLoading} />
    </div>
  );
}
