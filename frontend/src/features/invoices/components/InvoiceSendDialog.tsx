"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

import { sendInvoice } from "../api/invoices.api";

export function InvoiceSendDialog({
  invoiceId,
  invoiceNumber,
}: {
  invoiceId: string;
  invoiceNumber: string;
}) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const onSend = async () => {
    setSending(true);
    try {
      await sendInvoice(invoiceId);
      toast.success(`Invoice ${invoiceNumber} queued to send`);
      setEmail("");
    } catch {
      toast.error("Could not send invoice");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send invoice</CardTitle>
        <CardDescription>
          Email {invoiceNumber} to the client billing contact.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 tablet:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="billing@client.com"
          className="flex-1"
        />
        <Button
          variant="contained"
          leftIcon={<Send className="h-4 w-4" />}
          loading={sending}
          onClick={onSend}
        >
          Send
        </Button>
      </CardContent>
    </Card>
  );
}
