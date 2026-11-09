"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[AppError]", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>

      <h1 className="mt-6 text-600 font-semibold leading-tight">Something went wrong</h1>

      <p className="mt-2 text-400 leading-relaxed text-neutral-600">
        The dashboard hit an unexpected error. Try refreshing, or reach out if the problem
        persists.
      </p>

      {error.digest ? (
        <p className="mt-3 font-mono text-200 text-neutral-600">Ref: {error.digest}</p>
      ) : null}

      <div className="mt-8">
        <Button
          variant="contained"
          size="md"
          leftIcon={<RefreshCw className="h-4 w-4" />}
          onClick={reset}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
