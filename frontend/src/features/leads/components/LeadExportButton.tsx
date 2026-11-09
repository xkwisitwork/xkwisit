"use client";

import { Download } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { buildCsv, downloadCsv } from "@/lib/utils";
import { formatDate } from "@/lib/utils/date";

import { listLeads } from "../api/leads.api";
import type { LeadFilterState } from "../types";

export type LeadExportButtonProps = {
  filters?: Partial<LeadFilterState>;
};

export function LeadExportButton({ filters = {} }: LeadExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    try {
      // Export up to 5,000 leads at a time
      const { items } = await listLeads(filters, 1, 5000);

      const csv = buildCsv(
        items.map((lead) => ({
          name: lead.fullName,
          email: lead.email,
          company: lead.company,
          source: lead.source,
          status: lead.status,
          score: lead.score,
          owner: lead.ownerName ?? "",
          created: formatDate(lead.createdAt, "yyyy-MM-dd"),
        })),
      );

      const filename = `leads-${formatDate(new Date(), "yyyy-MM-dd")}`;
      downloadCsv(csv, filename);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      size="md"
      leftIcon={<Download className="h-4 w-4" />}
      onClick={handleExport}
      loading={loading}
      loadingText="Exporting…"
    >
      Export
    </Button>
  );
}
