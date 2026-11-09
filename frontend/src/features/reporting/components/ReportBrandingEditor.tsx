"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

import type { ReportBranding } from "../types";

export function ReportBrandingEditor({
  initial,
  onSave,
}: {
  initial?: ReportBranding | null;
  onSave?: (branding: ReportBranding) => void;
}) {
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl ?? "");
  const [primaryColor, setPrimaryColor] = useState(initial?.primaryColor ?? "#0F172A");
  const [footerText, setFooterText] = useState(initial?.footerText ?? "");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Report branding</CardTitle>
        <CardDescription>Logo, color, and footer for PDF exports.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Input
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="Logo URL"
        />
        <Input
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          placeholder="Primary color"
        />
        <Input
          value={footerText}
          onChange={(e) => setFooterText(e.target.value)}
          placeholder="Footer text"
        />
        <div className="flex justify-end">
          <Button
            variant="outlined"
            onClick={() =>
              onSave?.({
                logoUrl: logoUrl || null,
                primaryColor: primaryColor || null,
                footerText: footerText || null,
              })
            }
          >
            Save branding
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
