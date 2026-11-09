"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { useUploadBrandAsset } from "../hooks/useBrandAssets";
import type { BrandAssetType } from "../types";

export type BrandAssetUploadProps = {
  clientId: string;
  clients?: Array<{ id: string; name: string }>;
};

const TYPES: BrandAssetType[] = [
  "LOGO",
  "ICON",
  "COLOR_PALETTE",
  "FONT",
  "IMAGE",
  "TEMPLATE",
  "DOCUMENT",
  "OTHER",
];

export function BrandAssetUpload({
  clientId: defaultClientId,
  clients = [],
}: BrandAssetUploadProps) {
  const [clientId, setClientId] = useState(defaultClientId);
  const [name, setName] = useState("");
  const [type, setType] = useState<BrandAssetType>("LOGO");
  const [file, setFile] = useState<File | null>(null);
  const uploadMutation = useUploadBrandAsset();

  const onSubmit = async () => {
    if (!file || !name || !clientId) return;
    await uploadMutation.mutateAsync({ clientId, name, type, file });
    setName("");
    setFile(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload asset</CardTitle>
        <CardDescription>Add logos, templates, and other brand files.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 tablet:grid-cols-2">
        {clients.length > 0 ? (
          <div>
            <p className="mb-1 text-300 text-neutral-600">Client</p>
            <Select value={clientId} onValueChange={setClientId}>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        <div>
          <p className="mb-1 text-300 text-neutral-600">Type</p>
          <Select value={type} onValueChange={(v) => setType(v as BrandAssetType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="tablet:col-span-2">
          <p className="mb-1 text-300 text-neutral-600">Name</p>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Primary logo - dark"
          />
        </div>

        <div className="tablet:col-span-2">
          <p className="mb-1 text-300 text-neutral-600">File</p>
          <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex justify-end tablet:col-span-2">
          <Button
            variant="contained"
            loading={uploadMutation.isPending}
            disabled={!file || !name || !clientId}
            onClick={onSubmit}
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
