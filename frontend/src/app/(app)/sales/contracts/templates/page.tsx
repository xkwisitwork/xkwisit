"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { useContractTemplates } from "@/features/contracts";

export default function SalesContractTemplatesPage() {
  const { data = [], isLoading } = useContractTemplates();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Sales", href: "/sales" },
            { label: "Contracts", href: "/sales/contracts" },
            { label: "Templates" },
          ]}
        />
        <PageHeader
          title="Contract templates"
          description="Reusable agreement starters."
        />
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : data.length === 0 ? (
        <p className="text-400 text-neutral-600">No templates yet.</p>
      ) : (
        <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
          {data.map((template) => (
            <li key={template.id} className="px-4 py-3">
              <p className="text-400 font-medium">{template.name}</p>
              <p className="text-300 text-neutral-600">{template.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
