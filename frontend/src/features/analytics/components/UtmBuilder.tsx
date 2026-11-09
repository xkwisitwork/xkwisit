"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

import { buildUtmResult, isValidUtm } from "../utils/utmParser";
import { UtmPreview } from "./UtmPreview";

export function UtmBuilder({
  defaultBaseUrl = "https://example.com",
}: {
  defaultBaseUrl?: string;
}) {
  const [baseUrl, setBaseUrl] = useState(defaultBaseUrl);
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<ReturnType<typeof buildUtmResult> | null>(null);

  const canBuild = useMemo(
    () => isValidUtm({ source, medium, campaign }),
    [source, medium, campaign],
  );

  const onBuild = () => {
    if (!canBuild) return;
    setResult(
      buildUtmResult(baseUrl || defaultBaseUrl, {
        source,
        medium,
        campaign,
        term: term || undefined,
        content: content || undefined,
      }),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>UTM builder</CardTitle>
        <CardDescription>Compose campaign tracking parameters.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 tablet:grid-cols-2">
        <div className="tablet:col-span-2">
          <Input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Landing page URL"
          />
        </div>
        <Input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="utm_source"
        />
        <Input
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
          placeholder="utm_medium"
        />
        <Input
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          placeholder="utm_campaign"
        />
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="utm_term (optional)"
        />
        <div className="tablet:col-span-2">
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="utm_content (optional)"
          />
        </div>
        <div className="flex justify-end tablet:col-span-2">
          <Button variant="contained" disabled={!canBuild} onClick={onBuild}>
            Build link
          </Button>
        </div>
        {result ? (
          <div className="tablet:col-span-2">
            <UtmPreview result={result} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
