"use client";

import Link from "next/link";
import { Menu, MessageSquare, Search } from "lucide-react";

import { useCommandPalette } from "@/contexts/CommandPaletteContext";

import { TopbarUserMenu } from "./TopbarUserMenu";
import { TopbarNotifications } from "./TopbarNotifications";

export function AppTopbar({ onMenu }: { onMenu?: () => void }) {
  const { open } = useCommandPalette();

  return (
    <header className="sticky top-0 z-30 flex h-14 min-w-0 shrink-0 items-center gap-2 bg-transparent px-3 pt-2 mobile-md:gap-3 mobile-md:px-4 tablet:h-[72px] tablet:px-5 tablet:pt-3 laptop:px-6">
      {onMenu ? (
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#E8E2F4] bg-white text-[#16024A] shadow-sm tablet:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={open}
        className="flex min-w-0 max-w-md flex-1 items-center gap-2 rounded-full border border-[#E8E2F4] bg-white py-1.5 pl-4 pr-1.5 text-300 text-neutral-500 shadow-[0_10px_28px_-22px_rgba(22,2,74,0.35)] transition-colors hover:border-[#3B05C4]/40 hover:text-[#16024A]"
      >
        <Search className="ml-3 h-3.5 w-3.5 shrink-0" />
        <span className="min-w-0 flex-1 truncate text-left">Search…</span>
        <kbd className="mr-2 hidden rounded-md border border-neutral-300 bg-neutral-50 px-1.5 py-0.5 font-mono text-200 tablet:inline-block">
          ⌘K
        </kbd>
        <span className="mr-0.5 grid h-9 w-9 place-items-center rounded-full bg-[#16024A] text-white">
          <Search className="h-3.5 w-3.5" aria-hidden />
        </span>
      </button>

      <div className="ml-auto flex shrink-0 items-center gap-1.5 mobile-md:gap-2">
        <Link
          href="/messaging"
          aria-label="Messages"
          className="relative grid h-10 w-10 place-items-center rounded-full border border-[#E8E2F4] bg-white text-[#16024A] shadow-sm transition hover:border-[#3B05C4]/35"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#FC3FE3]" />
        </Link>
        <TopbarNotifications />
        <TopbarUserMenu />
      </div>
    </header>
  );
}
