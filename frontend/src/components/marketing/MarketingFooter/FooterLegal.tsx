"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export type FooterLegalProps = {
  className?: string;
  title?: string;
  description?: string;
  onSubmit?: (email: string) => void;
};

export function FooterLegal({
  className,
  title = "Footer Legal",
  description = "Get a short Monday note from Xkwisit.",
  onSubmit,
}: FooterLegalProps) {
  const [email, setEmail] = useState("");

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <p className="font-display text-500 font-bold text-neutral-900">{title}</p>
        <p className="mt-1 text-300 text-neutral-600">{description}</p>
      </div>
      <form
        className="flex flex-col gap-2 tablet:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(email);
          setEmail("");
        }}
      >
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1"
        />
        <Button type="submit" variant="contained">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
