"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import type { UtmBuildResult } from "../types";

export function UtmPreview({ result }: { result: UtmBuildResult }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(result.previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-2 rounded-xl border border-neutral-400 bg-neutral-200/40 p-4">
      <p className="break-all text-300 font-medium">{result.previewUrl}</p>
      <p className="text-200 text-neutral-600">{result.queryString}</p>
      <Button variant="outlined" size="sm" onClick={onCopy}>
        {copied ? "Copied" : "Copy URL"}
      </Button>
    </div>
  );
}
