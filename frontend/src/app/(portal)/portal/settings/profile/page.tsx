"use client";

import { ProfileSettingsForm } from "@/features/settings/components/ProfileSettingsForm";

export default function Page() {
  return (
    <div className="mx-auto w-[98%] max-w-3xl py-6 tablet:w-full tablet:px-2 tablet:py-8">
      <div className="mb-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
          Settings
        </p>
        <h1 className="mt-2 font-display text-[1.65rem] font-bold tracking-tight text-[#16024A]">
          Profile
        </h1>
        <p className="mt-1 text-[0.92rem] text-[#6B6484]">
          Manage your personal and business details.
        </p>
      </div>
      <ProfileSettingsForm className="w-full" />
    </div>
  );
}
