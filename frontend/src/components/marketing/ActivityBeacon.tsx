"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  flushActivity,
  trackActivity,
} from "@/lib/activity/track";
import {
  getActivitySessionId,
  hasStartedActivitySession,
  markActivitySessionStarted,
} from "@/lib/activity/session";

const HEARTBEAT_MS = 15_000;
const CLICK_DEDUP_MS = 600;

function isDownloadHref(href: string): boolean {
  const lower = href.toLowerCase();
  if (lower.includes("/sheet-downloads/") || lower.includes("/api/sheet")) return true;
  return /\.(pdf|xlsx?|docx?|csv|zip|pptx?)($|\?)/i.test(lower);
}

function labelFor(el: HTMLElement): string {
  const aria = el.getAttribute("aria-label")?.trim();
  if (aria) return aria.slice(0, 160);
  const text = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 160);
  const title = el.getAttribute("title")?.trim();
  if (title) return title.slice(0, 160);
  return el.tagName.toLowerCase();
}

function closestInteractive(node: EventTarget | null): HTMLElement | null {
  if (!(node instanceof Element)) return null;
  const el = node.closest(
    "a[href], button, [role='button'], input[type='submit'], input[type='button'], [download]",
  );
  return el instanceof HTMLElement ? el : null;
}

export function ActivityBeacon() {
  const pathname = usePathname();
  const startedAt = useRef<number>(0);
  const activeMs = useRef(0);
  const activeSince = useRef<number | null>(null);
  const lastClickKey = useRef("");
  const lastClickAt = useRef(0);
  const pathnameRef = useRef(pathname);

  pathnameRef.current = pathname;

  const totals = () => {
    if (activeSince.current != null) {
      activeMs.current += Date.now() - activeSince.current;
      activeSince.current =
        document.visibilityState === "visible" ? Date.now() : null;
    }
    const start = startedAt.current || Date.now();
    return {
      durationMs: Math.max(0, Date.now() - start),
      activeMs: Math.max(0, activeMs.current),
    };
  };

  // One session lifecycle for the tab.
  useEffect(() => {
    startedAt.current = Date.now();
    activeMs.current = 0;
    activeSince.current =
      document.visibilityState === "visible" ? Date.now() : null;
    getActivitySessionId();

    if (!hasStartedActivitySession()) {
      markActivitySessionStarted();
      trackActivity({
        kind: "session_start",
        path: pathnameRef.current,
        ...totals(),
      });
    }

    const pauseActive = () => {
      if (activeSince.current != null) {
        activeMs.current += Date.now() - activeSince.current;
        activeSince.current = null;
      }
    };
    const resumeActive = () => {
      if (document.visibilityState === "visible" && activeSince.current == null) {
        activeSince.current = Date.now();
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") pauseActive();
      else resumeActive();
    };

    const onClick = (event: MouseEvent) => {
      const el = closestInteractive(event.target);
      if (!el) return;

      const href =
        el instanceof HTMLAnchorElement
          ? el.href
          : el.getAttribute("href") || undefined;
      const downloadAttr = el.getAttribute("download");
      const tag = el.tagName.toLowerCase();
      const target = labelFor(el);
      const key = `${tag}|${href || ""}|${target}`;
      const now = Date.now();
      if (key === lastClickKey.current && now - lastClickAt.current < CLICK_DEDUP_MS) {
        return;
      }
      lastClickKey.current = key;
      lastClickAt.current = now;

      const isDownload =
        downloadAttr != null || (typeof href === "string" && isDownloadHref(href));

      trackActivity({
        kind: isDownload ? "download" : "click",
        path: pathnameRef.current,
        target,
        tag,
        href: href?.slice(0, 400),
        ...totals(),
      });
    };

    const onHeartbeat = () => {
      if (document.visibilityState !== "visible") return;
      trackActivity({
        kind: "heartbeat",
        path: pathnameRef.current,
        ...totals(),
      });
    };

    const onLeave = () => {
      trackActivity({
        kind: "session_end",
        path: pathnameRef.current,
        ...totals(),
        keepalive: true,
      });
      flushActivity();
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onLeave);
    const heartbeat = window.setInterval(onHeartbeat, HEARTBEAT_MS);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onLeave);
      window.clearInterval(heartbeat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- session-scoped once per mount
  }, []);

  // Page views on route changes.
  useEffect(() => {
    trackActivity({
      kind: "page_view",
      path: pathname,
      ...totals(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- totals via refs
  }, [pathname]);

  return null;
}
