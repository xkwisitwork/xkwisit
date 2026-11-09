"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Loader2, ScanSearch } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { buttonVariants } from "@/components/ui/Button/variants";
import { Button } from "@/components/ui/Button";
import { PageCard, PageFaq, PageSection } from "@/components/marketing/pages/shared";
import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { ROUTES } from "@/config/site";
import { ApiRequestError } from "@/lib/api/errors";
import { cn } from "@/lib/utils/cn";
import {
  runXrayScan,
  type XrayScanResult,
} from "@/features/xray/api/xray.api";
import { XrayAnalysisBoard } from "@/features/xray/components/XrayAnalysisBoard";

const xrayFaqs = [
  {
    q: "Is this a live crawl of my site?",
    a: "Yes. We fetch the public homepage, read titles, CTAs, contact paths, and retention cues, then score four growth loops. A live call still goes deeper.",
  },
  {
    q: "Do I need the full assessment too?",
    a: "Only if you want the longer seven-area questionnaire. This page is the short door in.",
  },
  {
    q: "Will you store my URL forever?",
    a: "We use it to run the reading and follow up. Ask us to delete it anytime.",
  },
] as const;

/**
 * Business X-Ray - enter a domain, get a live homepage diagnostic scoreboard.
 */
export function BusinessXrayClient() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<XrayScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onScan = async () => {
    const trimmed = url.trim();
    if (!trimmed || trimmed.length < 3) {
      setError("Enter a website - e.g. yourbrand.com");
      return;
    }
    setError(null);
    setScanning(true);
    setResult(null);
    try {
      const scan = await runXrayScan(trimmed);
      setResult(scan);
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.message
          : "Could not scan that site. Check the URL and try again.";
      setError(message);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="bg-white">
      <MarketingPageHero
        introOnly
        eyebrow="Business X-Ray"
        title="Paste your website. See what is stuck."
        description="A quick read on brand, demand, sales, and retention - so you know what to fix before the next campaign."
        imageSrc="/images/desks/intelligence.jpg"
        imageAlt="Scoreboard"
        primaryHref="#scan"
        primaryLabel="Run a scan"
      />
      <section id="scan" className="relative scroll-mt-24 overflow-x-clip">
        <Container className="relative px-4 py-10 mobile-sm:px-5 tablet:px-8 tablet:py-14">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-mint-ice bg-white px-5 py-10 text-center shadow-[0_24px_60px_-40px_rgba(59,5,196,0.22)] mobile-sm:rounded-[2rem] mobile-sm:px-8 mobile-sm:py-12">
            <span className="inline-flex items-center gap-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
              <ScanSearch className="h-3.5 w-3.5" aria-hidden />
              Instant scoreboard
            </span>
            <h2 className="mt-5 font-display text-[clamp(1.85rem,4.5vw,2.85rem)] font-bold leading-[1.1] tracking-tight text-mint-ink">
              Drop the domain. Get the weak loop.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-neutral-600 mobile-sm:text-400">
              One field. We fetch the public homepage and name what to open first
              on Monday.
            </p>

          <div className="mx-auto mt-10 max-w-xl">
            <div className="flex flex-col gap-3 rounded-[1.5rem] bg-mint-soft p-3 tablet:flex-row tablet:items-center tablet:p-2.5">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void onScan();
                  }}
                  placeholder="yourbrand.com"
                  className="!h-12 !rounded-2xl !border-0 !bg-transparent !pl-10 !shadow-none focus-visible:!ring-0"
                  aria-label="Website URL"
                />
              </div>
              <Button
                onClick={onScan}
                loading={scanning}
                disabled={scanning}
                className="!h-12 !rounded-full border-0 !bg-mint !px-7 !text-white hover:!bg-mint-deep"
              >
                {scanning ? "Scanning…" : "Start scan"}
              </Button>
            </div>
            {error ? (
              <p className="mt-3 text-center text-300 text-red-600">{error}</p>
            ) : (
              <p className="mt-3 text-center text-200 text-neutral-600">
                Live homepage fetch - for a walkthrough, book a call after.
              </p>
            )}
          </div>
          </div>
        </Container>
      </section>

      <Container className="px-4 py-12 mobile-sm:px-5 tablet:px-8 tablet:py-16">
        <AnimatePresence mode="wait">
          {scanning ? (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center"
            >
              <Loader2 className="h-8 w-8 animate-spin text-mint" />
              <p className="font-display text-500 font-bold text-neutral-900">
                Fetching the public site…
              </p>
              <p className="text-300 text-neutral-600">
                Titles · CTAs · contact · retention cues
              </p>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <XrayAnalysisBoard result={result} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-lg py-10 text-center"
            >
              <p className="text-400 text-neutral-600">
                Prefer seven dimensions? Take the Growth Assessment when you want
                the longer questionnaire.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex flex-col items-center gap-3 tablet:flex-row tablet:justify-center">
          <Link
            href="/growth-assessment/start"
            className={cn(
              buttonVariants({ variant: "contained", size: "lg" }),
              "inline-flex min-h-12 !rounded-full border-0 !bg-mint px-7 !text-white hover:!bg-mint-deep",
            )}
          >
            Full assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={ROUTES.book}
            className={cn(
              buttonVariants({ variant: "outlined", size: "lg" }),
              "inline-flex min-h-12 !rounded-full !border-neutral-400 !bg-white px-7 !text-neutral-900 hover:!border-mint hover:!bg-mint-soft",
            )}
          >
            Book a live walkthrough
          </Link>
        </div>
      </Container>
      <PageSection
        eyebrow="How to use it"
        title="A first read - not a lab report."
      >
        <ul className="grid gap-4 tablet:grid-cols-3">
          {[
            "Use the URL visitors actually land on",
            "Spot the weakest loop in plain language",
            "Carry that into Monday - or talk it through live",
          ].map((item, index) => (
            <li key={item}>
              <PageCard tone={index === 1 ? "ink" : "soft"} className="h-full">
                <p
                  className={`text-[0.92rem] font-medium ${
                    index === 1 ? "text-white" : "text-mint-ink"
                  }`}
                >
                  {item}
                </p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>
      <PageFaq title="Scan questions" items={xrayFaqs} />
      <SolteraCloser
        title="Want the longer check instead?"
        body="Thirty questions, seven areas - or pick a call if you want us on the scoreboard with you."
        primaryHref={ROUTES.growthAssessment}
        primaryLabel="Start free check"
        secondaryHref={ROUTES.book}
        secondaryLabel="Book a strategy call"
      />
    </div>
  );
}
