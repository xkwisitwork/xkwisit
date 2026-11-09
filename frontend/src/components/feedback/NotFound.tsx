import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";

export function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="font-display text-800 font-bold text-mint">404</p>
      <h1 className="mt-2 font-display text-600 font-bold text-neutral-900">
        Page not found
      </h1>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "contained" }),
          "mt-6 inline-flex !rounded-full !bg-mint !text-white",
        )}
      >
        Go home
      </Link>
    </div>
  );
}
