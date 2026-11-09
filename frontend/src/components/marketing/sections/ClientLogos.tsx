"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils/cn";

const logos = ["Northline", "Apex", "Harbor", "Ledger", "Cascade"] as const;

export function ClientLogos() {
  const [active, setActive] = useState(1);

  return (
    <Section spacing="md" contained={false} className="bg-white pb-10">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-2 tablet:gap-4">
          {logos.map((name, i) => (
            <li key={name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "rounded-2xl px-4 py-2 font-display text-400 font-semibold tracking-tight transition-all tablet:px-5 tablet:text-500",
                  active === i
                    ? "bg-neutral-900 text-neutral-100 shadow-md"
                    : "text-neutral-700",
                )}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
