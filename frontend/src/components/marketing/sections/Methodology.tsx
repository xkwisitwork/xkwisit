"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";

const steps = [
  { number: "01", title: "Name the real problem" },
  { number: "02", title: "Give each job one person" },
  { number: "03", title: "Check the work every Monday" },
  { number: "04", title: "Spend only on that problem" },
] as const;

export function Methodology() {
  return (
    <section id="methodology" className="relative overflow-x-clip bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#3B05C4]">
            How we work with you
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-[#16024A]">
            We find what’s stuck before we fix it.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.98rem] leading-relaxed text-neutral-600">
            Your brand, your ads, and how you follow up customers are one business. Four
            simple rules put them on the same problem - for a small shop or a large team.
          </p>
        </div>

        <div className="mt-8 grid gap-3 tablet:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] bg-[#F4F0FF] p-5 mobile-sm:p-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#3B05C4]">
              01 · What’s stuck
            </p>
            <h3 className="mt-3 max-w-md font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.08] tracking-tight text-[#16024A]">
              The ad ran. Nobody left a number.
            </h3>
            <ul className="mt-6 space-y-2">
              {[
                "They did not trust the brand",
                "The page never asked them to call or WhatsApp",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-[0.9rem] font-medium text-[#16024A]"
                >
                  {line}
                  <span className="text-[#5B45FF]" aria-hidden>
                    +
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-3">
            <article className="rounded-[1.5rem] border border-[#E7DEFF] bg-white p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Monday · 9:00–9:40
              </p>
              <h3 className="mt-2 font-display text-[1.45rem] font-bold leading-tight text-[#16024A]">
                Name the real problem
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-neutral-600">
                Is it the brand, the website, the ads, or how you follow up on WhatsApp?
                Until that has a name, every naira is a guess.
              </p>
              <Link
                href={ROUTES.book}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#16024A] px-4 py-2 text-[0.82rem] font-semibold text-white"
              >
                Book a call
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </article>
            <div className="relative h-44 overflow-hidden rounded-[1.5rem] mobile-md:h-52">
              <Image
                src="/images/people/desk-review.jpg"
                alt="A man at a desk, hand on his forehead, looking over papers beside a laptop"
                fill
                className="object-cover object-[center_42%]"
                sizes="(max-width: 768px) 92vw, 480px"
              />
              <p className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[0.72rem] font-semibold text-[#16024A]">
                Lagos · on a call
              </p>
            </div>
          </div>
        </div>

        <article className="mt-3 rounded-[1.75rem] border border-[#E7DEFF] bg-white p-5 mobile-sm:p-7">
          <div className="grid items-center gap-5 tablet:grid-cols-[0.9fr_1.1fr_0.7fr]">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#3B05C4]">
                02 · One name
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.08] text-[#16024A]">
                Give each job one person
              </h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-neutral-600">
                Brand, ads, sales, and WhatsApp follow-up each get one person. If everyone
                is responsible, nobody is.
              </p>
            </div>
            <div className="relative h-52 overflow-hidden rounded-[1.35rem] tablet:h-64">
              <Image
                src="/images/people/method-owner.jpg"
                alt="A woman in a black top standing by an office window"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 768px) 92vw, 420px"
              />
            </div>
            <div className="rounded-[1.35rem] bg-[#E7DEFF] p-4">
              <p className="font-display text-[1.7rem] font-bold leading-none text-[#C40404]">
                02
              </p>
              <p className="mt-3 text-[0.88rem] font-semibold leading-snug text-[#16024A]">
                Your sales lead calls every new enquiry the same day.
              </p>
              <p className="mt-2 text-[0.78rem] leading-snug text-neutral-600">
                Your office or WhatsApp. When a lead goes quiet, you know who was supposed
                to dial.
              </p>
            </div>
          </div>
        </article>

        <div className="mt-3 grid gap-3 tablet:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[18rem] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/people/method-monday.jpg"
              alt="Two women talking across a small table by a window"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 92vw, 640px"
            />
            <article className="absolute left-4 top-4 w-[min(16rem,78%)] rounded-2xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(22,2,74,0.45)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                Every Monday
              </p>
              <p className="mt-1 font-display text-[1.35rem] font-bold leading-none text-[#16024A]">
                9:00–10:00
              </p>
              <p className="mt-2 text-[0.78rem] leading-snug text-neutral-600">
                Same link. What moved, what did not, and the one thing to finish.
              </p>
            </article>
          </div>
          <article className="flex flex-col rounded-[1.75rem] bg-[#F4F0FF] p-5 mobile-sm:p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#3B05C4]">
              03 · The meeting
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold leading-tight text-[#16024A]">
              Check the work every Monday
            </h3>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-neutral-600">
              Your people can run this hour without hiring a new department - and without
              us sitting in every meeting forever.
            </p>
            <div className="relative mt-5 h-36 overflow-hidden rounded-[1.2rem]">
              <Image
                src="/images/people/method-spend.jpg"
                alt="A woman working at a laptop on a round table"
                fill
                className="object-cover object-[center_60%]"
                sizes="(max-width: 768px) 92vw, 320px"
              />
            </div>
            <p className="mt-3 text-[0.8rem] font-medium text-[#16024A]">
              You and the owners. Same link, every week.
            </p>
          </article>
        </div>

        <article className="mt-3 grid gap-5 rounded-[1.75rem] bg-[#16024A] p-5 text-white mobile-sm:p-7 tablet:grid-cols-[0.85fr_1.15fr] tablet:items-center">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#FC3FE3]">
              04 · One spend
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.45rem,2.6vw,2rem)] font-bold leading-[1.08]">
              Spend only on that problem
            </h3>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-white/80">
              Design, ads, the website, and sales stay on the same stuck part. The next
              channel waits until this one improves.
            </p>
            <ul className="mt-5 space-y-2">
              {steps.map((step) => (
                <li key={step.number} className="flex items-center gap-3 text-[0.86rem]">
                  <span className="font-display text-[0.78rem] font-bold text-[#FC3FE3]">
                    {step.number}
                  </span>
                  {step.title}
                </li>
              ))}
            </ul>
            <Link
              href={ROUTES.book}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.82rem] font-semibold text-[#16024A]"
            >
              Talk about your stuck part
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <div className="relative h-56 overflow-hidden rounded-[1.35rem] tablet:h-80">
            <Image
              src="/images/desks/technology.jpg"
              alt="Two people reviewing code on a laptop in an office"
              fill
              className="object-cover object-[72%_center]"
              sizes="(max-width: 768px) 92vw, 560px"
            />
          </div>
        </article>

        <p className="mt-4 text-[0.78rem] leading-relaxed text-neutral-600">
          This is an example Monday. Yours uses your real problem and your real people.
        </p>
      </Container>
    </section>
  );
}
