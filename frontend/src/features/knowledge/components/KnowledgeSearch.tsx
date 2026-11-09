"use client";

import { useState } from "react";

import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";

import { useKnowledgeSearch } from "../hooks/useKnowledge";

export function KnowledgeSearch() {
  const [q, setQ] = useState("");
  const { data = [], isFetching } = useKnowledgeSearch(q);

  return (
    <div className="space-y-4">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search SOPs, playbooks, templates…"
      />
      {isFetching ? (
        <Skeleton variant="rectangle" className="h-24 w-full" />
      ) : q.trim().length <= 1 ? (
        <p className="text-300 text-neutral-600">Type at least 2 characters.</p>
      ) : data.length === 0 ? (
        <p className="text-300 text-neutral-600">No results.</p>
      ) : (
        <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
          {data.map((item) => (
            <li key={item.id} className="px-4 py-3">
              <p className="text-400 font-medium">
                {item.title}{" "}
                <span className="text-200 text-neutral-600">{item.kind}</span>
              </p>
              <p className="text-300 text-neutral-600">{item.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
