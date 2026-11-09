"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";

import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/Dropdown";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";

function isUsableName(value: string | null | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/^undefined(\s+undefined)*$/i.test(trimmed)) return false;
  if (/^null(\s+null)*$/i.test(trimmed)) return false;
  return true;
}

export function TopbarUserMenu() {
  const router = useRouter();
  const { user } = useAuth();
  const [signOutOpen, setSignOutOpen] = useState(false);

  const fromParts = user
    ? [user.firstName, user.lastName]
        .filter((part) => isUsableName(part))
        .join(" ")
        .trim()
    : "";

  const displayName = user
    ? (isUsableName(user.fullName) ? user.fullName.trim() : "") ||
      fromParts ||
      (isUsableName(user.email) ? user.email : "") ||
      "Account"
    : "Guest";

  return (
    <>
      <Dropdown>
        <DropdownTrigger asChild>
          <button
            type="button"
            aria-label="Open user menu"
            className="rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Avatar src={user?.avatarUrl ?? undefined} name={displayName} size="md" />
          </button>
        </DropdownTrigger>

        <DropdownContent align="end" className="w-64">
          <DropdownLabel>{displayName}</DropdownLabel>

          {user?.email ? (
            <p className="-mt-1 truncate px-2.5 pb-2 text-200 text-neutral-600">
              {user.email}
            </p>
          ) : null}

          <DropdownSeparator />

          <DropdownItem
            icon={<User />}
            onSelect={() => {
              router.push("/settings/profile");
            }}
          >
            Profile
          </DropdownItem>
          <DropdownItem
            icon={<Settings />}
            onSelect={() => {
              router.push("/settings");
            }}
          >
            Settings
          </DropdownItem>

          <DropdownSeparator />

          <DropdownItem
            icon={<LogOut />}
            destructive
            onSelect={(event) => {
              event.preventDefault();
              setSignOutOpen(true);
            }}
          >
            Sign out
          </DropdownItem>
        </DropdownContent>
      </Dropdown>

      <SignOutConfirmDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </>
  );
}
