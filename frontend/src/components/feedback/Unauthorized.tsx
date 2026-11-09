import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button/variants";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function Unauthorized() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-display text-600 font-bold text-neutral-900">Unauthorized</h1>
      <p className="mt-2 text-400 text-neutral-600">Sign in to continue.</p>
      <Link
        href={ROUTES.login}
        className={cn(
          buttonVariants({ variant: "contained" }),
          "mt-6 inline-flex !rounded-full !bg-mint !text-white",
        )}
      >
        Sign in
      </Link>
    </div>
  );
}
