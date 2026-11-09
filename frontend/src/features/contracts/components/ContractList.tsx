"use client";

import Link from "next/link";

import { Skeleton } from "@/components/ui/Skeleton";

import type { ContractListItem } from "../types";
import { ContractCard } from "./ContractCard";

export function ContractList({
  contracts,
  loading,
}: {
  contracts: ContractListItem[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (contracts.length === 0) {
    return <p className="text-400 text-neutral-600">No contracts yet.</p>;
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2">
      {contracts.map((contract) => (
        <Link key={contract.id} href={`/sales/contracts/${contract.id}`}>
          <ContractCard contract={contract} />
        </Link>
      ))}
    </div>
  );
}
