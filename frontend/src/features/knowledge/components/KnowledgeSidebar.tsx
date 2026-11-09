"use client";

import Link from "next/link";

import { cn } from "@/lib/utils/cn";

const links = [
  ["Overview", "/knowledge"],
  ["SOPs", "/knowledge/sops"],
  ["Playbooks", "/knowledge/playbooks"],
  ["Templates", "/knowledge/templates"],
  ["Frameworks", "/knowledge/frameworks"],
  ["Search", "/knowledge/search"],
] as const;

export function KnowledgeSidebar({ active }: { active?: string }) {
  return (
    <nav className="flex flex-wrap gap-2">
      {links.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-300",
            active === href
              ? "border-primary bg-primary/5 text-primary"
              : "border-neutral-400 text-neutral-600 hover:border-primary/40",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
