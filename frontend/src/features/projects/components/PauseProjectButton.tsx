"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/Button";
import { ROLES } from "@/lib/constants/roles";
import type { Role } from "@/lib/constants/roles";

import { useUpdateProject } from "../hooks/useProjectMutations";
import type { Project } from "../types";

const PAUSE_ROLES: Role[] = [ROLES.SUPER_ADMIN, ROLES.AGENCY_MANAGER];

export function PauseProjectButton({ project }: { project: Project }) {
  const { data: session } = useSession();
  const role = (session?.user as { role?: Role } | undefined)?.role;
  const update = useUpdateProject(project.id);
  const [reason, setReason] = useState("Financial constraints");
  const [open, setOpen] = useState(false);

  if (!role || !PAUSE_ROLES.includes(role)) return null;

  if (project.status === "PAUSED") {
    return (
      <Button
        type="button"
        variant="outlined"
        loading={update.isPending}
        onClick={() =>
          update.mutate({
            status: "ON_TRACK",
            healthNote: "Resumed.",
          })
        }
      >
        Resume project
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-stretch gap-2">
      {open ? (
        <>
          <label className="text-300 text-neutral-700">
            Why is this paused?
            <select
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-400"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            >
              <option>Financial constraints</option>
              <option>Waiting on the client</option>
              <option>Scope not agreed</option>
            </select>
          </label>
          <Button
            type="button"
            variant="outlined"
            loading={update.isPending}
            onClick={() =>
              update.mutate({
                status: "PAUSED",
                healthNote: `Paused: ${reason}`,
              })
            }
          >
            Confirm pause
          </Button>
        </>
      ) : (
        <Button type="button" variant="outlined" onClick={() => setOpen(true)}>
          Pause project
        </Button>
      )}
    </div>
  );
}
