"use client";

import { Badge } from "@/components/ui/Badge";

import type { FollowUpRuleData } from "../types";

export function FollowUpRuleCard({ rule }: { rule: FollowUpRuleData }) {
  return (
    <article className="rounded-xl border border-neutral-400/60 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-neutral-900">{rule.name}</p>
          <p className="mt-1 text-300 text-neutral-600">{rule.description}</p>
        </div>
        <Badge variant={rule.enabled ? "success" : "muted"} size="sm">
          {rule.enabled ? "On" : "Off"}
        </Badge>
      </div>
      <dl className="mt-3 grid gap-1 text-200 text-neutral-600">
        <div>
          <dt className="inline text-neutral-600">Trigger · </dt>
          <dd className="inline font-mono">{rule.trigger}</dd>
        </div>
        <div>
          <dt className="inline text-neutral-600">Action · </dt>
          <dd className="inline">{rule.action}</dd>
        </div>
      </dl>
    </article>
  );
}

export { FollowUpRuleCard as FollowUpRule };
