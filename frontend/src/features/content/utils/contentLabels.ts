import type { StatusTone } from "@/components/ui/Badge";
import type { ContentStatus } from "@/lib/constants/statuses";
import { CONTENT_STATUS_LABELS } from "@/lib/constants/statuses";

import type { ContentObjective, ContentPlatform, ContentType } from "../types";

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  BLOG_POST: "Blog post",
  SOCIAL_POST: "Social post",
  VIDEO: "Video",
  EMAIL: "Email",
  LANDING_PAGE: "Landing page",
  CASE_STUDY: "Case study",
  WHITEPAPER: "Whitepaper",
  INFOGRAPHIC: "Infographic",
  PODCAST: "Podcast",
  OTHER: "Other",
};

export const CONTENT_OBJECTIVE_LABELS: Record<ContentObjective, string> = {
  AWARENESS: "Awareness",
  CONSIDERATION: "Consideration",
  CONVERSION: "Conversion",
  RETENTION: "Retention",
  AUTHORITY: "Authority",
};

export const CONTENT_PLATFORM_LABELS: Record<ContentPlatform, string> = {
  WEBSITE: "Website",
  BLOG: "Blog",
  INSTAGRAM: "Instagram",
  LINKEDIN: "LinkedIn",
  X: "X",
  FACEBOOK: "Facebook",
  YOUTUBE: "YouTube",
  TIKTOK: "TikTok",
  EMAIL: "Email",
  PODCAST: "Podcast",
};

export function contentStatusTone(status: ContentStatus): StatusTone {
  const map: Record<ContentStatus, StatusTone> = {
    IDEA: "muted",
    BRIEF: "info",
    DRAFT: "info",
    DESIGN: "info",
    INTERNAL_REVIEW: "warning",
    CLIENT_APPROVAL: "warning",
    SCHEDULED: "success",
    PUBLISHED: "success",
  };

  return map[status];
}

export function contentStatusLabel(status: ContentStatus): string {
  return CONTENT_STATUS_LABELS[status];
}
