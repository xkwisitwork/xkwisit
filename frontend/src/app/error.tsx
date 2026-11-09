"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-200">
      <Container className="flex min-h-screen flex-col items-center justify-center text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="mt-6 font-display text-800 leading-tight">Something went wrong</h1>

        <p className="mt-3 max-w-md text-400 leading-relaxed text-neutral-600">
          An unexpected error occurred while rendering this page. Try refreshing, or head
          back to the home page.
        </p>

        {error.digest ? (
          <p className="mt-3 font-mono text-200 text-neutral-600">Ref: {error.digest}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="contained"
            size="lg"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={reset}
          >
            Try again
          </Button>
          <Button
            variant="outlined"
            size="lg"
            leftIcon={<Home className="h-4 w-4" />}
            asChild={false}
          >
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
