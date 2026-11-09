"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

import { PipelineForecast, usePipelineForecast } from "@/features/pipeline";

export default function PipelineForecastPage() {
  const { data, isLoading } = usePipelineForecast();

  return (
    <>
      <PageHeader
        title="Pipeline forecast"
        description="Committed, best-case, and open pipeline looking ahead."
        actions={
          <Button variant="outlined" leftIcon={<ArrowLeft className="h-4 w-4" />} asChild>
            <Link href="/crm/pipeline">Back to pipeline</Link>
          </Button>
        }
      />

      <PipelineForecast forecast={data} loading={isLoading} />
    </>
  );
}
