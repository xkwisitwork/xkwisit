"use client";

import Link from "next/link";
import { CreditCard, FileText, PieChart, Receipt, Repeat, Wallet } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { InvoiceStatsStrip } from "@/features/invoices";

const LINKS = [
  {
    href: "/finance/invoices",
    title: "Invoices",
    description: "Draft, send, and track client invoices.",
    icon: FileText,
  },
  {
    href: "/finance/payments",
    title: "Payments",
    description: "Incoming settlements and Paystack events.",
    icon: CreditCard,
  },
  {
    href: "/finance/subscriptions",
    title: "Subscriptions",
    description: "Retainer billing cycles.",
    icon: Repeat,
  },
  {
    href: "/finance/expenses",
    title: "Expenses",
    description: "Agency spend by category.",
    icon: Wallet,
  },
  {
    href: "/finance/profitability",
    title: "Profitability",
    description: "Contribution by client and service.",
    icon: PieChart,
  },
  {
    href: "/finance/reports",
    title: "Reports",
    description: "Finance exports and summaries.",
    icon: Receipt,
  },
] as const;

export default function FinanceHomePage() {
  return (
    <>
      <PageHeader
        title="Finance"
        description="Billing, collections, and contribution across the book of business."
      />

      <InvoiceStatsStrip />

      <div className="mt-8 grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {LINKS.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href} className="group block">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-300 font-medium text-primary">Open →</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
