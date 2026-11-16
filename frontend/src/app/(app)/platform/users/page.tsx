"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  List,
  Loader2,
  Shield,
  ShieldOff,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  listPlatformUsers,
  setPlatformAdminFlag,
  type PlatformUser,
} from "@/features/platform/api/platform.api";
import {
  PlatformGate,
  PlatformSubnav,
} from "@/features/platform/components/PlatformShell";
import { cn } from "@/lib/utils/cn";

type ViewMode = "grid" | "list";

const VIEW_KEY = "xkwisit-platform-users-view";

function readStoredView(): ViewMode {
  if (typeof window === "undefined") return "grid";
  try {
    const raw = window.localStorage.getItem(VIEW_KEY);
    return raw === "list" ? "list" : "grid";
  } catch {
    return "grid";
  }
}

export default function PlatformUsersPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const selfId = session?.user?.id ?? "";
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<PlatformUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pending, setPending] = useState<PlatformUser | null>(null);
  const [view, setView] = useState<ViewMode>("grid");

  useEffect(() => {
    setView(readStoredView());
  }, []);

  function changeView(next: ViewMode) {
    setView(next);
    try {
      window.localStorage.setItem(VIEW_KEY, next);
    } catch {
      // ignore
    }
  }

  const load = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      setRows(await listPlatformUsers(search || undefined, accessToken));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [search, accessToken]);

  useEffect(() => {
    void load();
  }, [load]);

  async function applyAdminChange(user: PlatformUser) {
    if (user.id === selfId && user.isPlatformAdmin) {
      toast.error("You cannot demote yourself");
      return;
    }
    const nextAdmin = !user.isPlatformAdmin;
    setBusyId(user.id);
    try {
      // Backend requires confirm + matching confirmAction — dialog alone is not enough.
      await setPlatformAdminFlag(user.id, nextAdmin, accessToken);
      toast.success(
        nextAdmin
          ? `${user.name} promoted to admin`
          : `${user.name} demoted to normal user`,
      );
      setPending(null);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <PlatformGate>
      <div className="min-w-0 space-y-5">
        <header className="min-w-0">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
            Platform control
          </p>
          <h1 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A] tablet:text-[2.05rem]">
            Users &amp; admins
          </h1>
          <p className="mt-1.5 max-w-2xl text-[0.9rem] leading-relaxed text-neutral-500">
            Promote members to admin or demote them back to a normal user.
            Changes require confirmation and are enforced by the API.
          </p>
        </header>

        <PlatformSubnav active="/platform/users" />

        <div className="flex min-w-0 flex-col gap-3 mobile-lg:flex-row mobile-lg:flex-wrap mobile-lg:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="min-w-0 w-full flex-1 rounded-full border border-[#EDE8F7] bg-white px-4 py-2.5 text-[0.84rem] text-[#16024A] outline-none ring-[#3B05C4]/25 focus:ring-2 mobile-lg:min-w-[220px]"
          />

          <div className="flex shrink-0 items-center gap-2">
            <div
              className="inline-flex rounded-full border border-[#EDE8F7] bg-white p-1"
              role="group"
              aria-label="View mode"
            >
              <button
                type="button"
                onClick={() => changeView("grid")}
                aria-pressed={view === "grid"}
                title="Grid view"
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full transition",
                  view === "grid"
                    ? "bg-[#3B05C4] text-white"
                    : "text-neutral-500 hover:bg-[#F7F5FC] hover:text-[#16024A]",
                )}
              >
                <LayoutGrid className="h-4 w-4" aria-hidden />
                <span className="sr-only">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => changeView("list")}
                aria-pressed={view === "list"}
                title="List view"
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full transition",
                  view === "list"
                    ? "bg-[#3B05C4] text-white"
                    : "text-neutral-500 hover:bg-[#F7F5FC] hover:text-[#16024A]",
                )}
              >
                <List className="h-4 w-4" aria-hidden />
                <span className="sr-only">List</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => void load()}
              className="rounded-full border border-[#EDE8F7] bg-white px-4 py-2.5 text-[0.78rem] font-semibold text-[#16024A] transition hover:bg-[#F7F5FC]"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-[0.85rem] text-neutral-500">Loading users…</p>
        ) : rows.length === 0 ? (
          <p className="rounded-[1.5rem] border border-[#EDE8F7] bg-white px-5 py-8 text-[0.85rem] text-neutral-500">
            No users match that search.
          </p>
        ) : view === "grid" ? (
          <ul className="grid min-w-0 grid-cols-1 gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
            {rows.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                layout="grid"
                isSelf={Boolean(selfId) && user.id === selfId}
                busy={busyId === user.id}
                onAction={() => setPending(user)}
              />
            ))}
          </ul>
        ) : (
          <ul className="min-w-0 space-y-2">
            {rows.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                layout="list"
                isSelf={Boolean(selfId) && user.id === selfId}
                busy={busyId === user.id}
                onAction={() => setPending(user)}
              />
            ))}
          </ul>
        )}

        <Dialog
          open={pending != null}
          onOpenChange={(open) => {
            if (!open && busyId == null) setPending(null);
          }}
        >
          <DialogContent
            size="sm"
            className="w-[calc(100%-1.5rem)] max-w-md border-[#EDE8F7] bg-white"
          >
            <DialogHeader>
              <DialogTitle className="font-display text-[1.15rem] font-bold text-[#16024A]">
                {pending?.isPlatformAdmin
                  ? "Demote to normal user?"
                  : "Promote to admin?"}
              </DialogTitle>
              <DialogDescription className="text-[0.84rem] leading-relaxed text-neutral-500">
                {pending?.isPlatformAdmin
                  ? `Confirm demoting ${pending.name} (${pending.email}) to a normal user. They will lose platform-wide admin access.`
                  : `Confirm promoting ${pending?.name ?? "this user"} (${pending?.email ?? ""}) to admin. They will be able to manage workspaces, users, health, and network activity.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <button
                type="button"
                disabled={busyId === pending?.id}
                onClick={() => setPending(null)}
                className="w-full rounded-full border border-[#EDE8F7] px-4 py-2.5 text-[0.78rem] font-semibold text-[#16024A] sm:w-auto"
              >
                Cancel
              </button>
              <motion.button
                type="button"
                disabled={!pending || busyId === pending.id}
                onClick={() => pending && void applyAdminChange(pending)}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[0.78rem] font-semibold text-white disabled:opacity-60 sm:w-auto",
                  pending?.isPlatformAdmin ? "bg-[#B42318]" : "bg-[#3B05C4]",
                )}
              >
                {busyId === pending?.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                ) : pending?.isPlatformAdmin ? (
                  <ShieldOff className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  <Shield className="h-3.5 w-3.5" aria-hidden />
                )}
                {pending?.isPlatformAdmin
                  ? "Confirm demote"
                  : "Confirm promote"}
              </motion.button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PlatformGate>
  );
}

function UserCard({
  user,
  layout,
  isSelf,
  busy,
  onAction,
}: {
  user: PlatformUser;
  layout: ViewMode;
  isSelf: boolean;
  busy: boolean;
  onAction: () => void;
}) {
  const workspaces =
    user.memberships.length === 0
      ? "No workspace membership"
      : user.memberships.map((m) => `${m.orgName} (${m.role})`).join(" · ");

  if (layout === "list") {
    return (
      <li className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-[1.25rem] border border-[#EDE8F7] bg-white px-3.5 py-3 shadow-[0_10px_28px_-24px_rgba(22,2,74,0.4)] tablet:flex-row tablet:items-center tablet:justify-between tablet:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F4F0FF] text-[#3B05C4]">
            <UserRound className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <p className="max-w-full truncate text-[0.9rem] font-semibold text-[#16024A]">
                {user.name}
              </p>
              <RoleBadge admin={user.isPlatformAdmin} />
              {isSelf ? <YouBadge /> : null}
            </div>
            <p className="truncate text-[0.74rem] text-neutral-500">{user.email}</p>
            <p className="truncate text-[0.7rem] text-neutral-400">{workspaces}</p>
          </div>
        </div>
        <div className="min-w-0 w-full shrink-0 tablet:w-auto">
          <ActionButton
            user={user}
            isSelf={isSelf}
            busy={busy}
            onAction={onAction}
          />
        </div>
      </li>
    );
  }

  return (
    <li className="flex min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-[#EDE8F7] bg-white p-4 shadow-[0_14px_32px_-28px_rgba(22,2,74,0.4)]">
      <div className="flex min-w-0 items-start justify-between gap-2">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F4F0FF] text-[#3B05C4]">
          <UserRound className="h-5 w-5" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-wrap justify-end gap-1.5">
          <RoleBadge admin={user.isPlatformAdmin} />
          {isSelf ? <YouBadge /> : null}
        </div>
      </div>

      <h3 className="mt-3 min-w-0 truncate font-display text-[1.02rem] font-bold text-[#16024A]">
        {user.name}
      </h3>
      <p className="mt-0.5 min-w-0 truncate text-[0.78rem] text-neutral-500">
        {user.email}
      </p>
      <p className="mt-2 line-clamp-2 min-w-0 flex-1 break-words text-[0.72rem] leading-relaxed text-neutral-400">
        {workspaces}
      </p>

      <div className="mt-4 min-w-0">
        <ActionButton
          user={user}
          isSelf={isSelf}
          busy={busy}
          onAction={onAction}
        />
      </div>
    </li>
  );
}

function RoleBadge({ admin }: { admin: boolean }) {
  if (admin) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#E8F8EF] px-2 py-0.5 text-[0.65rem] font-semibold text-[#027A48]">
        <Shield className="h-3 w-3" aria-hidden />
        Admin
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded-full bg-[#F4F0FF] px-2 py-0.5 text-[0.65rem] font-semibold text-[#6B6484]">
      Member
    </span>
  );
}

function YouBadge() {
  return (
    <span className="shrink-0 rounded-full bg-[#F7F5FC] px-2 py-0.5 text-[0.65rem] font-semibold text-neutral-500">
      You
    </span>
  );
}

function ActionButton({
  user,
  isSelf,
  busy,
  onAction,
}: {
  user: PlatformUser;
  isSelf: boolean;
  busy: boolean;
  onAction: () => void;
}) {
  if (isSelf) {
    return (
      <p className="text-center text-[0.72rem] text-neutral-400 tablet:text-left">
        Manage other accounts
      </p>
    );
  }

  const demoting = user.isPlatformAdmin;

  return (
    <motion.button
      type="button"
      disabled={busy}
      onClick={onAction}
      whileTap={{ scale: 0.9, y: 2 }}
      transition={{ type: "spring", stiffness: 520, damping: 16 }}
      className={cn(
        "inline-flex w-full min-w-0 max-w-full items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-[0.75rem] font-semibold leading-tight transition disabled:opacity-60 mobile-md:text-[0.78rem] mobile-md:px-4",
        demoting
          ? "border border-[#EDE8F7] bg-white text-[#16024A] hover:bg-[#FFF8F8]"
          : "bg-[#3B05C4] text-white hover:bg-[#2C0494]",
      )}
      aria-label={demoting ? "Demote to normal user" : "Promote to admin"}
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />
      ) : demoting ? (
        <ShieldOff className="h-3.5 w-3.5 shrink-0" aria-hidden />
      ) : (
        <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden />
      )}
      <span className="min-w-0 truncate">
        {demoting ? "Demote to user" : "Promote to admin"}
      </span>
    </motion.button>
  );
}
