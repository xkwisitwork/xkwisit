import Link from "next/link";
import { Compass, Home } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-200">
      <Container className="flex min-h-screen flex-col items-center justify-center text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Compass className="h-8 w-8 text-primary" />
        </div>

        <p className="mt-6 font-display text-900 leading-none tracking-tight text-primary">
          404
        </p>

        <h1 className="mt-3 font-display text-700 leading-tight">
          We couldn&apos;t find that page
        </h1>

        <p className="mt-3 max-w-md text-400 leading-relaxed text-neutral-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="contained"
            size="lg"
            leftIcon={<Home className="h-4 w-4" />}
            asChild={false}
          >
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="outlined" size="lg" asChild={false}>
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
