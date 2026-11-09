"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { TRIGGER_OPTIONS } from "@/features/automation";

export default function AutomationTriggersPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Automation", href: "/automation" }, { label: "Triggers" }]}
        />
        <PageHeader title="Triggers" description="Available workflow trigger types." />
      </div>
      <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
        {TRIGGER_OPTIONS.map((opt) => (
          <li key={opt.value} className="px-4 py-3 text-400">
            <span className="font-medium">{opt.label}</span>
            <span className="ml-2 text-200 text-neutral-600">{opt.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
