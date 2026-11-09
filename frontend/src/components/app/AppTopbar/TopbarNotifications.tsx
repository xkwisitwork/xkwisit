"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

import { useNotifications } from "@/contexts/NotificationContext";

export function TopbarNotifications() {
  const { unreadCount } = useNotifications();

  return (
    <Link
      href="/notifications"
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-[#E8E2F4] bg-white text-[#16024A] shadow-sm transition hover:border-[#3B05C4]/35"
    >
      <Bell className="h-4 w-4" />
      {unreadCount > 0 ? (
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#FC3FE3]" />
      ) : null}
    </Link>
  );
}
