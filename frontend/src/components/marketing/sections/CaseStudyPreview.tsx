"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { SheetDownloadGate } from "@/components/marketing/sections/SheetDownloadGate";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";
import type { SheetDownloadAssetKey } from "@/features/sheet-downloads/api/sheet-downloads.api";
import { cn } from "@/lib/utils/cn";

type ProjectCategory = "all" | "web" | "marketing" | "sales" | "brand";

type Project = {
  id: string;
  category: Exclude<ProjectCategory, "all">;
  categoryLabel: string;
  client: string;
  title: string;
  summary: string;
  outcome: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  href?: string;
  services?: readonly { title: string; body: string }[];
  download?: {
    assetKey: SheetDownloadAssetKey;
    label: string;
    title: string;
    description: string;
  };
};

const filters: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "web", label: "Web & apps" },
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales closing" },
  { id: "brand", label: "Brand" },
];

/** Selected projects for brands, agencies, and operators - permissioned shapes. */
const projects: Project[] = [
  {
    id: "staytrove",
    category: "web",
    categoryLabel: "Mobile app",
    client: "STAYTROVE",
    title: "We inspect so you don't have to.",
    summary:
      "Lagos hospitality tech for discovering, verifying, and booking short-stay apartments — more trustworthy for guests and hosts.",
    outcome: "web.staytrove.com",
    href: "https://web.staytrove.com",
    image: "/images/case-studies/staytrove.jpg",
    imageAlt: "STAYTROVE tablet app — discover stays and book verified shortlets",
    imagePosition: "object-center",
    services: [
      {
        title: "Shortlet discovery",
        body: "Apartments for trips, weekends, and personal stays.",
      },
      {
        title: "Property verification",
        body: "Inspects listings to cut fake photos and uncertainty.",
      },
      {
        title: "Digital bookings",
        body: "Discover, reserve, and coordinate payments in one place.",
      },
      {
        title: "Host management",
        body: "List apartments, manage bookings, and grow inventory.",
      },
    ],
  },
  {
    id: "yetosol",
    category: "web",
    categoryLabel: "Web & brand",
    client: "Yetosol Associates",
    title: "Civil, structure, and construction delivery",
    summary:
      "Civil engineering, structural design, and construction for residential, commercial, and infrastructure projects.",
    outcome: "yetosol.com",
    href: "https://yetosol.com",
    image: "/images/case-studies/yetosol.jpg",
    imageAlt: "Yetosol Associates mobile site — safety, standards, and project delivery",
    imagePosition: "object-[center_top]",
    services: [
      {
        title: "Civil & construction",
        body: "Buildings, foundations, roads, drainage, and infrastructure.",
      },
      {
        title: "Structural design",
        body: "Calculations, drawings, BIM, feasibility, and supervision.",
      },
      {
        title: "Facilities management",
        body: "Preventive maintenance and long-term building integrity.",
      },
      {
        title: "Project management",
        body: "Planning, cost estimation, site supervision, and delivery.",
      },
    ],
  },
  {
    id: "firststep",
    category: "marketing",
    categoryLabel: "Web & brand",
    client: "First Step Wealth Group",
    title: "Your first step into a lifetime of wealth.",
    summary:
      "Financial services for newcomers, immigrants, and underserved families in Canada building stability and long-term wealth.",
    outcome: "firststepwealthgroup.ca",
    href: "https://firststepwealthgroup.ca",
    image: "/images/case-studies/firststep.jpg",
    imageAlt: "First Step Wealth Group mobile site — growth and wealth for newcomers",
    imagePosition: "object-[center_top]",
    services: [
      {
        title: "Rental Guarantee",
        body: "Helps newcomers rent without Canadian credit history.",
      },
      {
        title: "Insurance & protection",
        body: "Access to protection solutions for individuals and families.",
      },
      {
        title: "Real estate support",
        body: "Guidance on ownership and property opportunities.",
      },
      {
        title: "Financial education",
        body: "Clearer money concepts for life in Canada.",
      },
    ],
  },
  {
    id: "gygi",
    category: "marketing",
    categoryLabel: "Nonprofit web",
    client: "Girls You've Got It",
    title: "Proven excellence in education.",
    summary:
      "Nonprofit empowering girls through education, mentorship, skills, and opportunities — including tech industry introductions.",
    outcome: "gygi.org",
    href: "https://gygi.org",
    image: "/images/case-studies/gygi.jpg",
    imageAlt: "GYGI mobile site — impact in education and skills for girls",
    imagePosition: "object-[center_top]",
    services: [
      {
        title: "Education",
        body: "Learning opportunities and educational support.",
      },
      {
        title: "Technology",
        body: "Digital skills and introductions to tech.",
      },
      {
        title: "Mentorship",
        body: "Guidance for personal and professional growth.",
      },
      {
        title: "Career & personal development",
        body: "Potential, confidence, leadership, and life skills.",
      },
    ],
  },
  {
    id: "pipeline-close",
    category: "sales",
    categoryLabel: "Sales ops",
    client: "B2B agency client",
    title: "Follow-up that closes the week",
    summary:
      "Pipeline board, same-day reply rules, and a Monday scoreboard so leads stop dying in chat.",
    outcome: "Closing rhythm",
    image: "/images/case-studies/follow-up.jpg",
    imageAlt: "Woman on her phone with followers, likes, and message notifications",
    imagePosition: "object-center",
    services: [
      {
        title: "Pipeline board",
        body: "Stages that show who is warm, stuck, or ready to close.",
      },
      {
        title: "Same-day reply rules",
        body: "SLA timers so new leads get a human answer before they cool.",
      },
      {
        title: "Monday scoreboard",
        body: "Weekly wins, misses, and next actions the team can see.",
      },
      {
        title: "Chat rescue",
        body: "Escalation paths so conversations stop dying in DMs.",
      },
    ],
  },
  {
    id: "inbox-to-deal",
    category: "sales",
    categoryLabel: "Inbox → deal",
    client: "Property team",
    title: "Every enquiry gets an owner",
    summary:
      "Shared inbox, assignment, and calendar holds — so hot leads get a call the same day.",
    outcome: "Reply + book system",
    image: "/images/case-studies/shared-inbox.jpg",
    imageAlt: "Shared inbox with priority messages and assigned enquiry owners",
    imagePosition: "object-center",
    services: [
      {
        title: "Shared inbox",
        body: "One queue for site, WhatsApp, and email enquiries.",
      },
      {
        title: "Owner assignment",
        body: "Each lead tagged to a person — no orphan threads.",
      },
      {
        title: "Same-day calls",
        body: "Hot leads get a call before the day ends.",
      },
      {
        title: "Calendar holds",
        body: "Viewings and demos booked while interest is high.",
      },
    ],
  },
  {
    id: "brand-system",
    category: "brand",
    categoryLabel: "Playbook",
    client: "Launch brand",
    title: "One story sales can repeat",
    summary:
      "Locks name, look, and offer language into one story marketing and sales both say — before the next launch spend.",
    outcome: "Free PDF playbook",
    image: "/images/case-studies/launch-brand-playbook.jpg",
    imageAlt: "Launch Brand Playbook cover — Sales Playbook",
    imagePosition: "object-center",
    services: [
      {
        title: "Name, look, offer",
        body: "Three assets, one story spine across ads and calls.",
      },
      {
        title: "Shared Lexicon",
        body: "Stops marketing and sales drifting into two dialects.",
      },
      {
        title: "Story Lock workshop",
        body: "90 minutes plus a six-week sprint to lock the story.",
      },
      {
        title: "Spend Gate",
        body: "20-point scorecard that releases or holds budget.",
      },
    ],
    download: {
      assetKey: "launch-brand-playbook",
      label: "Download Brand Playbook",
      title: "Unlock the Launch Brand Playbook",
      description:
        "Enter your full name, email, and phone — then the PDF downloads straight away.",
    },
  },
  {
    id: "storefront-look",
    category: "brand",
    categoryLabel: "CRO blueprint",
    client: "Ecommerce label",
    title: "Strategies for CRO analytics",
    summary:
      "A practical blueprint for tracking the funnel, spotting drop-offs, and choosing experiments that lift conversion — not vanity traffic.",
    outcome: "Free PDF blueprint",
    image: "/images/case-studies/ecommerce-cro.jpg",
    imageAlt: "E-commerce CRO Blueprint — strategies for CRO analytics",
    imagePosition: "object-center",
    services: [
      {
        title: "Funnel metrics",
        body: "Define the events that prove click → cart → purchase.",
      },
      {
        title: "Drop-off diagnosis",
        body: "Find where buyers stall and why they leave.",
      },
      {
        title: "Experiment backlog",
        body: "Rank tests by impact so the next win is obvious.",
      },
      {
        title: "Weekly readout",
        body: "Simple scorecards so the team knows what moved.",
      },
    ],
    download: {
      assetKey: "ecommerce-cro-blueprint",
      label: "Download CRO Blueprint",
      title: "Unlock the E-commerce CRO Blueprint",
      description:
        "Enter your full name, email, and phone — then the PDF downloads straight away.",
    },
  },
];

function ProjectCard({
  project,
  featured,
  reduce,
}: {
  project: Project;
  featured: boolean;
  reduce: boolean | null;
}) {
  const [page, setPage] = useState(0);
  const href = project.href ?? ROUTES.caseStudies;
  const external = Boolean(project.href);
  const gated = Boolean(project.download);
  const services = project.services ?? [];
  const mobilePages = 1 + Math.max(0, Math.ceil(services.length / 2));

  function go(delta: number) {
    setPage((current) => {
      const next = current + delta;
      if (next < 0) return mobilePages - 1;
      if (next >= mobilePages) return 0;
      return next;
    });
  }

  const media = (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-mint-soft",
        featured
          ? "aspect-[16/9] tablet:aspect-[21/9] tablet:max-h-[220px]"
          : "aspect-[16/9] tablet:max-h-[160px]",
      )}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        className={cn(
          "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
          project.imagePosition ?? "object-center",
        )}
        sizes={
          featured
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mint-ink/60 via-mint-ink/15 to-transparent px-4 pb-2.5 pt-10">
        <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mint">
          {project.categoryLabel}
        </span>
      </div>
    </div>
  );

  const footer = project.download ? (
    <div className="mt-auto border-t border-mint-ice pt-2.5">
      <SheetDownloadGate
        assetKey={project.download.assetKey}
        label={project.download.label}
        title={project.download.title}
        description={project.download.description}
        buttonClassName="!min-h-10 !w-full !border-0 !bg-mint !px-3 !py-2 !text-[0.72rem] !whitespace-nowrap !text-white hover:!bg-mint-deep mobile-sm:!px-4 mobile-sm:!text-[0.78rem] [&_svg]:!h-3.5 [&_svg]:!w-3.5 [&_svg]:shrink-0"
      />
    </div>
  ) : (
    <p className="mt-auto border-t border-mint-ice pt-2.5 text-[0.78rem] font-semibold text-mint">
      {external ? `Website · ${project.outcome}` : project.outcome}
    </p>
  );

  const shellClass =
    "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-mint-ice bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-mint/40 hover:shadow-[0_28px_50px_-36px_rgba(59,5,196,0.45)]";

  const body = (
    <div className="flex flex-1 flex-col p-3.5 mobile-sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          {project.client}
        </p>
        {!gated ? (
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-mint opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        ) : null}
      </div>
      <h3 className="mt-1 font-display text-[1.02rem] font-bold leading-snug tracking-tight text-mint-ink mobile-sm:text-[1.1rem]">
        {project.title}
      </h3>

      {/* Desktop / tablet: compact single view */}
      <div className="mt-2.5 hidden flex-col tablet:flex">
        <p className="line-clamp-2 text-[0.82rem] leading-snug text-neutral-600">
          {project.summary}
        </p>
        {services.length > 0 ? (
          <ul className="mt-2.5 grid grid-cols-2 gap-1.5">
            {services.map((service, i) => (
              <motion.li
                key={service.title}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i, duration: 0.35 }}
                className="rounded-lg bg-[#FAF7F2] px-2.5 py-2 ring-1 ring-[#EDE7DE]"
              >
                <p className="font-display text-[0.8rem] font-bold leading-snug text-mint-ink">
                  {service.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[0.72rem] leading-snug text-neutral-600">
                  {service.body}
                </p>
              </motion.li>
            ))}
          </ul>
        ) : null}
        <div className="mt-2.5">{footer}</div>
      </div>

      {/* Mobile: paginated content — natural height, no reserved empty slot */}
      <div className="mt-2.5 flex flex-col tablet:hidden">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={reduce ? false : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {page === 0 ? (
                <p className="text-[0.86rem] leading-relaxed text-neutral-600">
                  {project.summary}
                </p>
              ) : (
                <ul className="grid gap-1.5">
                  {services
                    .slice((page - 1) * 2, page * 2)
                    .map((service) => (
                      <li
                        key={service.title}
                        className="rounded-lg bg-[#FAF7F2] px-2.5 py-2 ring-1 ring-[#EDE7DE]"
                      >
                        <p className="font-display text-[0.84rem] font-bold leading-snug text-mint-ink">
                          {service.title}
                        </p>
                        <p className="mt-0.5 text-[0.74rem] leading-snug text-neutral-600">
                          {service.body}
                        </p>
                      </li>
                    ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {mobilePages > 1 ? (
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Previous card page"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                go(-1);
              }}
              className="grid h-8 w-8 place-items-center rounded-full border border-[#E7DEFF] bg-white text-mint-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            </button>
            <div className="flex items-center gap-1.5" aria-hidden>
              {Array.from({ length: mobilePages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to page ${i + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setPage(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === page ? "w-5 bg-mint" : "w-1.5 bg-[#D8CFE8]",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next card page"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                go(1);
              }}
              className="grid h-8 w-8 place-items-center rounded-full bg-mint text-white"
            >
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        ) : null}

        <div className="mt-2.5">{footer}</div>
      </div>
    </div>
  );

  if (gated) {
    return <article className={shellClass}>{media}{body}</article>;
  }

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={shellClass}
    >
      {media}
      {body}
    </Link>
  );
}

/**
 * Selected work - projects for brands and agencies across web, marketing, sales, and brand.
 */
export function CaseStudyPreview() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative overflow-x-clip bg-white">
      <Container bare className="relative w-full py-16 tablet:px-8 tablet:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-[98%] max-w-2xl text-center tablet:w-full"
        >
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
            Selected work
          </p>
          <h2 className="mt-5 font-display text-[clamp(1.85rem,4.2vw,2.85rem)] font-bold leading-[1.08] tracking-tight text-mint-ink">
            <span className="block">Projects we ship</span>
            <span className="mt-1 block">for brands &amp; agencies.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-neutral-600">
            Web and mobile apps, marketing systems, sales closing, and brand work —
            real builds for operators who need the next sale to move.
          </p>
        </motion.div>

        <div
          className="mx-auto mt-8 w-[98%] overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:w-full tablet:overflow-visible"
          role="tablist"
          aria-label="Filter projects by type"
        >
          <div className="flex w-max min-w-full justify-start gap-2 tablet:mx-auto tablet:justify-center">
            {filters.map((item) => {
              const on = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-[0.8rem] font-semibold transition-colors",
                    on
                      ? "bg-mint text-white"
                      : "bg-mint-soft text-mint-ink hover:bg-[#E7DEFF]",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={filter}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-8 grid w-[98%] gap-4 tablet:w-full tablet:grid-cols-2 tablet:gap-5 laptop:grid-cols-3"
          >
            {visible.map((project, index) => {
              const featured = index === 0 && filter === "all";
              return (
                <motion.li
                  key={project.id}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : index * 0.05, duration: 0.4 }}
                  className={cn(featured && "tablet:col-span-2 laptop:col-span-2")}
                >
                  <ProjectCard
                    project={project}
                    featured={featured}
                    reduce={reduce}
                  />
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <Link
            href={ROUTES.book}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-mint px-8 text-[0.9rem] font-semibold text-white hover:bg-mint-deep"
          >
            Talk about your build
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
