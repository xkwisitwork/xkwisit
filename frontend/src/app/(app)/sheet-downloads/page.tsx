"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  listSheetDownloads,
  type SheetDownloadLead,
} from "@/features/sheet-downloads/api/sheet-downloads.api";
import { PlatformGate } from "@/features/platform/components/PlatformShell";

export default function SheetDownloadsPage() {
  const { data: session } = useSession();
  const accessToken = (session as { accessToken?: string } | null)?.accessToken;
  const [leads, setLeads] = useState<SheetDownloadLead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    void (async () => {
      try {
        const rows = await listSheetDownloads(accessToken);
        setLeads(rows);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load sheet leads");
      } finally {
        setLoading(false);
      }
    })();
  }, [accessToken]);

  return (
    <PlatformGate>
      <div className="space-y-6">
        <PageHeader
          title="Growth sheet leads"
          description="People who unlocked the business growth strategy PDF - name, email, and phone."
        />

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-400 text-red-700">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="text-400 text-neutral-600">Loading sheet leads…</p>
        ) : leads.length === 0 ? (
          <p className="text-400 text-neutral-600">
            No sheet downloads yet. Leads appear here after someone unlocks the PDF.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <table className="min-w-full text-left text-400">
              <thead className="bg-neutral-50 text-300 font-semibold uppercase tracking-[0.12em] text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="align-top">
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      {lead.name}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      <a
                        href={`mailto:${lead.email}`}
                        className="hover:text-mint"
                      >
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      <a href={`tel:${lead.phone}`} className="hover:text-mint">
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                      {new Date(lead.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PlatformGate>
  );
}
