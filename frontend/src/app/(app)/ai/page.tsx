"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { AiGuardrailNotice } from "@/features/ai";

const links = [
  ["Overview", "/ai"],
  ["Research", "/ai/research"],
  ["Strategy", "/ai/strategy"],
  ["Reporting", "/ai/reporting"],
  ["Content", "/ai/content"],
  ["Sales", "/ai/sales"],
] as const;

export default function AiPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "AI" }]} />
        <PageHeader
          title="AI assistants"
          description="Draft research, strategy, content, and sales."
        />
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
      <AiGuardrailNotice />
    </div>
  );
}
