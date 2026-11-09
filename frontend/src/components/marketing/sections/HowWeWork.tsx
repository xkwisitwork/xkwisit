"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ScanSearch, Wrench, LineChart } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button/variants";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const steps = [
  {
    number: "01",
    title: "Name the leak",
    body: "The assessment or the X-Ray shows the weak spot. Brand, demand, sales, retention, or the site itself.",
    Icon: ScanSearch,
    image: "/images/people/desk-review.jpg",
    imageAlt:
      "A man at a desk, hand on his forehead, looking over papers beside a laptop",
  },
  {
    number: "02",
    title: "Fix it for 90 days",
    body: "Budget, design, and the team point at that one problem. The next channel waits until this one moves.",
    Icon: Wrench,
    image: "/images/desks/technology.jpg",
    imageAlt: "Two people reviewing code on a laptop in an office",
  },
  {
    number: "03",
    title: "You can see it",
    body: "The client portal shows leads, the work, and what needs you. No monthly PDF. No chasing a screenshot.",
    Icon: LineChart,
    image: "/images/people/method-monday.jpg",
    imageAlt: "Two women talking across a small table by a window",
  },
] as const;

/**
 * Simple 3-step how-we-work - designed to be skimmed in seconds.
 */
export function HowWeWork() {
  return (
    <section className="relative overflow-x-clip bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
            How a stranger becomes a client
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.12] tracking-tight text-neutral-900">
            Find it. Fix it. Then you can see it.
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-neutral-600 mobile-sm:text-400">
            The site turns a stranger into a lead. Then the work is three moves: name the
            leak, fix it, and let the client see it.
          </p>
        </motion.div>

        <ol className="mt-12 grid gap-4 tablet:grid-cols-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-6 mobile-sm:p-7 ${
                i === 1 ? "bg-[#3B05C4] text-white" : "bg-[#F4F0FF] text-[#16024A]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-display text-600 font-bold tabular-nums ${i === 1 ? "text-white/80" : "text-[#5B45FF]"}`}
                >
                  {step.number}
                </span>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${i === 1 ? "bg-white/15 text-white" : "bg-white text-[#3B05C4]"}`}
                >
                  <step.Icon className="h-5 w-5" aria-hidden />
                </span>
              </div>
              <h3 className="mt-5 font-display text-500 font-bold tracking-tight">
                {step.title}
              </h3>
              <p
                className={`mt-2 flex-1 text-300 leading-relaxed mobile-sm:text-400 ${i === 1 ? "text-white/85" : "text-neutral-600"}`}
              >
                {step.body}
              </p>
              <div className="relative mt-5 h-36 overflow-hidden rounded-2xl">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover object-[center_40%]"
                  sizes="(max-width: 768px) 92vw, 320px"
                />
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Link
            href={ROUTES.book}
            className={cn(
              buttonVariants({ variant: "contained", size: "lg" }),
              "inline-flex min-h-12 !rounded-full border-0 !bg-mint px-8 !text-white hover:!bg-mint-deep",
            )}
          >
            Book a strategy call
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
