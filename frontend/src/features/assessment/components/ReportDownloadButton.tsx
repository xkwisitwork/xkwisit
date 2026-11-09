"use client";

import { Button } from "@/components/ui/Button";

export function ReportDownloadButton({
  token,
  disabled,
}: {
  token: string;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="outlined"
      disabled={disabled}
      onClick={() => {
        window.open(`/api/assessment/${token}/report`, "_blank");
      }}
    >
      Download report
    </Button>
  );
}
