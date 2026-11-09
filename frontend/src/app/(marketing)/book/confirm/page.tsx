import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import {
  MarketingPageCanvas,
  MarketingPageHero,
  MarketingSoftCard,
} from "@/components/marketing/MarketingPageHero";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { buttonVariants } from "@/components/ui/Button/variants";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Booking confirmed",
  description: "Your Xkwisit strategy call request is in.",
};

type Props = { searchParams: Record<string, string | string[] | undefined> };

export default function BookConfirmPage({ searchParams }: Props) {
  const name = String(searchParams.name ?? "there");
  const day = String(searchParams.day ?? "");
  const slot = String(searchParams.slot ?? "");

  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        introOnly
        eyebrow="Confirmed"
        title={
          <>
            You&apos;re on the list,{" "}
            <span className="font-semibold text-neutral-600">{name}.</span>
          </>
        }
        description="We will email you a calendar invite shortly. Bring one growth question. You will leave knowing the one problem to fix first."
      />
      <Container className="px-4 pb-10 mobile-sm:px-5 tablet:px-8">
        <MarketingSoftCard className="mx-auto max-w-lg" tone="white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mint-soft text-mint">
            <Check className="h-6 w-6" aria-hidden />
          </div>
          <p className="mt-4 text-[0.95rem] text-neutral-600">
            Requested slot{day ? ` · ${day}` : ""}
            {slot ? ` · ${slot.replace(/.*-(\d+)$/, (_, h) => `${h}:00`)}` : ""}.
          </p>
          <Link
            href={ROUTES.home}
            className={cn(
              buttonVariants({ variant: "contained", size: "lg" }),
              "mt-6 inline-flex !rounded-full border-0 !bg-mint !text-white hover:!bg-mint-deep",
            )}
          >
            Back home
          </Link>
        </MarketingSoftCard>
      </Container>

      <CtaSection />
    </MarketingPageCanvas>
  );
}
