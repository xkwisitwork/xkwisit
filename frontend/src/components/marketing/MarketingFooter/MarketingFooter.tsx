"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import {
  footerColumns,
  footerLegalLinks,
  footerSocialLinks,
} from "@/config/navigation/footerNav";
import { siteConfig } from "@/config/site";

import { FooterColumn } from "./FooterColumn";

/**
 * Marketing footer — contained dark card with cropped brand mark (Converto-style).
 * Keeps Xkwisit nav, legal, and contact data intact.
 */
export function MarketingFooter() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  const socialColumn = {
    id: "social",
    title: "Social",
    items: footerSocialLinks.map((s) => ({
      label: s.label,
      href: s.href,
    })),
  };

  // Brand columns + social — same footer data, Converto rhythm.
  const columns = [...footerColumns, socialColumn];

  return (
    <footer className="bg-[#F5F5F7] px-4 pb-6 pt-4 mobile-sm:px-5 tablet:px-6 tablet:pb-8 laptop:px-8">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-[#0B0B0D] text-white shadow-[0_28px_80px_-48px_rgba(11,11,13,0.65)] tablet:rounded-[2rem]">
        {/* Top: brand + nav */}
        <div className="grid gap-10 px-6 pt-10 tablet:px-8 tablet:pt-12 laptop:grid-cols-[minmax(0,0.95fr)_minmax(0,1.55fr)] laptop:gap-12 laptop:px-10 laptop:pt-14">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Xkwisit - home"
              className="inline-block font-display text-[1.35rem] font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90 tablet:text-[1.5rem]"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-[0.9rem] leading-[1.7] text-white/45">
              {siteConfig.description}
            </p>
            <p className="mt-5 text-[0.82rem] leading-relaxed text-white/35">
              {siteConfig.contact.address.city}, {siteConfig.contact.address.country}
              <br />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-white/55 transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 mobile-lg:grid-cols-3 laptop:grid-cols-5 laptop:gap-x-4">
            {columns.map((column) => (
              <FooterColumn
                key={column.id}
                title={column.title}
                items={column.items}
              />
            ))}
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 px-6 py-5 tablet:mt-12 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-8 laptop:px-10">
          <p className="text-[0.78rem] text-white/35">
            ©{year} {siteConfig.name} All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.78rem] text-white/35 transition-colors hover:text-white/70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand mark — fully visible spaced letters */}
        <div className="relative px-2 pb-5 pt-8 tablet:px-4 tablet:pb-7 tablet:pt-10" aria-hidden>
          <motion.p
            className="pointer-events-none w-full select-none whitespace-nowrap text-center font-display text-[clamp(3.1rem,12.5vw,8rem)] font-black uppercase leading-[1.05] tracking-[0.04em]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #F7F2FF 0%, #D2C0FF 34%, #8B6CFF 66%, #3B05C4 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 36px rgba(59,5,196,0.28))",
            }}
            animate={
              reduce
                ? undefined
                : {
                    opacity: [0.95, 1, 0.95],
                  }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            X K W I S I T
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
