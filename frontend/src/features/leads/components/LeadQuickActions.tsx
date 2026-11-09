"use client";

import { useState } from "react";
import { Archive, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { IconButton } from "@/components/ui/Button";
import {
  ConfirmDialog,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui";

import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/lib/api/endpoints";

import { leadKeys } from "../api/queryKeys";

export type LeadQuickActionsProps = {
  leadId: string;
  leadName: string;
};

export function LeadQuickActions({ leadId, leadName }: LeadQuickActionsProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const archive = useMutation<unknown, void>(
    `${endpoints.leads.detail(leadId)}/archive`,
    {
      method: "POST",
      invalidateKeys: [leadKeys.all],
      successMessage: "Lead archived.",
    },
  );

  const remove = useMutation<unknown, void>(endpoints.leads.delete(leadId), {
    method: "DELETE",
    invalidateKeys: [leadKeys.all],
    successMessage: "Lead deleted.",
  });

  return (
    <>
      <Dropdown>
        <DropdownTrigger asChild>
          <IconButton
            aria-label={`Actions for ${leadName}`}
            icon={<MoreVertical className="h-4 w-4" />}
            variant="ghost"
            size="icon-sm"
          />
        </DropdownTrigger>
        <DropdownContent align="end">
          <DropdownItem icon={<Eye />} asChild>
            <Link href={`/crm/leads/${leadId}`}>View details</Link>
          </DropdownItem>
          <DropdownItem icon={<Pencil />} asChild>
            <Link href={`/crm/leads/${leadId}/edit`}>Edit lead</Link>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<Archive />} onSelect={() => archive.mutate()}>
            Archive
          </DropdownItem>
          <DropdownItem
            icon={<Trash2 />}
            destructive
            onSelect={() => setConfirmDelete(true)}
          >
            Delete
          </DropdownItem>
        </DropdownContent>
      </Dropdown>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={`Delete ${leadName}?`}
        description="This action cannot be undone. All activity and history for this lead will be permanently removed."
        confirmLabel="Delete lead"
        destructive
        loading={remove.isPending}
        onConfirm={async () => {
          await remove.mutateAsync();
          setConfirmDelete(false);
        }}
      />
    </>
  );
}
