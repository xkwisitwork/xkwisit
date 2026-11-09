import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button/variants";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = { title: "Token" };

export default function Page() {
  return (
    <div className="rounded-2xl border border-neutral-400/60 bg-white p-8 text-center shadow-sm">
      <h1 className="font-display text-600 font-bold text-neutral-900">Token</h1>
      <p className="mt-2 text-400 text-neutral-600">
        This security step is scaffolded and will connect to auth APIs next.
      </p>
      <Link
        href={ROUTES.login}
        className={cn(
          buttonVariants({ variant: "contained", size: "lg" }),
          "mt-6 inline-flex !rounded-full !bg-mint !text-white",
        )}
      >
        Back to sign in
      </Link>
    </div>
  );
}
