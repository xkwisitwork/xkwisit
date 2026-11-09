"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[MarketingError]", error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <h1 className="font-display text-700 leading-tight">
        We hit a snag loading this page
      </h1>
      <p className="mx-auto mt-3 max-w-md text-400 leading-relaxed text-neutral-600">
        Refresh to try again, or come back in a moment.
      </p>
      <div className="mt-8">
        <Button
          variant="contained"
          size="lg"
          leftIcon={<RefreshCw className="h-4 w-4" />}
          onClick={reset}
        >
          Try again
        </Button>
      </div>
    </Container>
  );
}
