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

import { useSignContract } from "../hooks/useContracts";

export function SignaturePanel({ contractId }: { contractId: string }) {
  const sign = useSignContract(contractId);
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Sign contract</CardTitle>
        <CardDescription>Record signature metadata.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 tablet:grid-cols-2">
        <Input
          value={signerName}
          onChange={(e) => setSignerName(e.target.value)}
          placeholder="Signer name"
        />
        <Input
          value={signerEmail}
          onChange={(e) => setSignerEmail(e.target.value)}
          placeholder="Signer email"
          type="email"
        />
        <div className="flex justify-end tablet:col-span-2">
          <Button
            variant="contained"
            loading={sign.isPending}
            onClick={() => {
              if (!signerName.trim()) return;
              void sign.mutateAsync({
                signerName: signerName.trim(),
                signerEmail: signerEmail || undefined,
              });
            }}
          >
            Sign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
