"use client";

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const socialIcons: Record<string, typeof Twitter> = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

const socialEntries = [
  { id: "twitter", label: "X (Twitter)", href: siteConfig.social.twitter },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
  { id: "instagram", label: "Instagram", href: siteConfig.social.instagram },
  { id: "facebook", label: "Facebook", href: siteConfig.social.facebook },
  { id: "youtube", label: "YouTube", href: siteConfig.social.youtube },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {socialEntries.map((entry) => {
        const Icon = socialIcons[entry.id] ?? Twitter;

        return (
          <li key={entry.id}>
            <a
              href={entry.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={entry.label}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full",
                "border border-neutral-400 text-neutral-600",
                "transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
