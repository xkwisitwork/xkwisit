"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils/cn";

export type FooterNewsletterProps = {
  className?: string;
  title?: string;
  description?: string;
  onSubmit?: (email: string) => void;
};

export function FooterNewsletter({
  className,
  title = "Growth notes",
  description = "Get a short Monday note from Xkwisit.",
  onSubmit,
}: FooterNewsletterProps) {
  const [email, setEmail] = useState("");

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <p className="mb-4 text-300 font-semibold uppercase tracking-widest text-neutral-900">
          {title}
        </p>
        <p className="text-300 leading-relaxed text-neutral-600">{description}</p>
      </div>
      <form
        className="flex flex-col gap-2"
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
          aria-label="Email for newsletter"
        />
        <Button
          type="submit"
          variant="contained"
          className="!rounded-full !bg-mint !text-white hover:!bg-mint-deep"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
}
