"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Command center is folded into the main dashboard — keep this route as a soft redirect.
 */
export default function CommandCenterRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <p className="text-[0.85rem] text-neutral-600">Opening dashboard…</p>
  );
}
