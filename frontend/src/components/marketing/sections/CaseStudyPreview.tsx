"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button/variants";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";
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
    id: "commerce-webapp",
    category: "web",
    categoryLabel: "Web app",
    client: "Retail brand",
    title: "Checkout that finishes the sale",
    summary:
      "Rebuilt product pages and payment flow so customers could complete orders on phone without calling support.",
    outcome: "Live storefront + payments",
    image: "/images/desks/technology.jpg",
    imageAlt: "Laptop and phone showing a website with order notifications",
  },
  {
    id: "booking-mobile",
    category: "web",
    categoryLabel: "Mobile app",
    client: "Service business",
    title: "Bookings that stop living in WhatsApp",
    summary:
      "A simple booking app for staff and clients - slots, reminders, and payments in one place.",
    outcome: "App + calendar sync",
    image: "/images/levers/demand-phone.jpg",
    imageAlt: "Phone in hand used for customer bookings and replies",
    imagePosition: "object-[center_25%]",
  },
  {
    id: "demand-ads",
    category: "marketing",
    categoryLabel: "Paid + content",
    client: "Consumer brand",
    title: "Same budget. Clearer offer.",
    summary:
      "Tightened the landing message and creative before scaling ads - so spend hit a page that could close.",
    outcome: "Offer-first campaigns",
    image: "/images/desks/growth.jpg",
    imageAlt: "Marketer planning social posts and ad schedule on a phone",
    imagePosition: "object-[center_20%]",
  },
  {
    id: "local-seo",
    category: "marketing",
    categoryLabel: "Search & local",
    client: "Clinic group",
    title: "Found when people search nearby",
    summary:
      "Search pages, Google Business, and follow-up scripts aligned so enquiries became booked visits.",
    outcome: "Local search system",
    image: "/images/levers/demand-search.jpg",
    imageAlt: "Search and discovery work on a laptop",
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
    image: "/images/levers/sales-pipeline.jpg",
    imageAlt: "Sales pipeline board with deal stages",
  },
  {
    id: "inbox-to-deal",
    category: "sales",
    categoryLabel: "Inbox → deal",
    client: "Property team",
    title: "Every enquiry gets an owner",
    summary:
      "Shared inbox, assignment, and calendar holds - so hot leads get a call the same day.",
    outcome: "Reply + book system",
    image: "/images/levers/sales-inbox.jpg",
    imageAlt: "Sales inbox being worked through on a desk",
  },
  {
    id: "brand-system",
    category: "brand",
    categoryLabel: "Identity",
    client: "Launch brand",
    title: "One story sales can repeat",
    summary:
      "Name, look, and offer language that marketing and sales both use - before the next launch spend.",
    outcome: "Brand + offer kit",
    image: "/images/desks/brand.jpg",
    imageAlt: "Creative studio with cameras and brand presentation setup",
  },
  {
    id: "storefront-look",
    category: "brand",
    categoryLabel: "Creative",
    client: "Ecommerce label",
    title: "Storefront that matches the ads",
    summary:
      "Packaging, site look, and social creatives rebuilt so the click and the shelf felt like one brand.",
    outcome: "Visual system",
    image: "/images/levers/brand-storefront.jpg",
    imageAlt: "Brand storefront and packaging presentation",
  },
];

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
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
            Selected work
          </p>
          <h2 className="mt-5 font-display text-[clamp(1.85rem,4.2vw,2.85rem)] font-bold leading-[1.08] tracking-tight text-mint-ink">
            <span className="block">Projects we ship</span>
            <span className="mt-1 block">for brands &amp; agencies.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-neutral-600">
            Web and mobile apps, marketing systems, sales closing, and brand work - real
            builds for operators who need the next sale to move.
          </p>
        </motion.div>

        <div
          className="mt-8 flex justify-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filter projects by type"
        >
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

        <AnimatePresence mode="wait">
          <motion.ul
            key={filter}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="mt-8 grid gap-5 tablet:grid-cols-2 laptop:grid-cols-3"
          >
            {visible.map((project, index) => (
              <li
                key={project.id}
                className={cn(
                  index === 0 && filter === "all" && "tablet:col-span-2 laptop:col-span-2",
                )}
              >
                <Link
                  href={ROUTES.caseStudies}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-mint-ice bg-white transition-[border-color,box-shadow] hover:border-mint/40 hover:shadow-[0_24px_48px_-36px_rgba(59,5,196,0.45)]"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-mint-soft",
                      index === 0 && filter === "all"
                        ? "aspect-[16/9] tablet:aspect-[21/10]"
                        : "aspect-[16/10]",
                    )}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-500 group-hover:scale-[1.03]",
                        project.imagePosition ?? "object-center",
                      )}
                      sizes={
                        index === 0 && filter === "all"
                          ? "(max-width: 768px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mint-ink/55 to-transparent px-4 pb-3 pt-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-mint">
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 mobile-sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {project.client}
                      </p>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-mint opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-2 font-display text-[1.15rem] font-bold leading-snug tracking-tight text-mint-ink mobile-sm:text-[1.25rem]">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-neutral-600">
                      {project.summary}
                    </p>
                    <p className="mt-4 border-t border-mint-ice pt-3 text-[0.8rem] font-semibold text-mint">
                      {project.outcome}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <div className="mt-10 flex flex-col items-center gap-3 tablet:flex-row tablet:justify-center">
          <Link
            href={ROUTES.caseStudies}
            className={cn(
              buttonVariants({ variant: "outlined", size: "lg" }),
              "inline-flex min-h-12 !rounded-full !border-[#E7DEFF] !bg-white px-8 !text-[#16024A] hover:!border-mint hover:!bg-mint-soft hover:!text-mint-ink",
            )}
          >
            See all projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
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
