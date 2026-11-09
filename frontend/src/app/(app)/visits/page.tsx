import { readFile } from "node:fs/promises";
import path from "node:path";

import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/constants/roles";
import { VisitorPlacesMonitor } from "@/features/platform/components/VisitorPlacesMonitor";
import { normalizeVisit, type VisitRow } from "@/types/visits";

async function readVisits(): Promise<VisitRow[]> {
  try {
    const raw = await readFile(path.join(process.cwd(), "data", "visits.ndjson"), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .slice(-200)
      .reverse()
      .map((line) => normalizeVisit(JSON.parse(line) as Record<string, unknown>));
  } catch {
    return [];
  }
}

export default async function VisitsPage() {
  const session = await getSession();
  const role = session?.user.role;
  const allowed = role === ROLES.SUPER_ADMIN || role === ROLES.AGENCY_MANAGER;

  if (!allowed) {
    return (
      <p className="text-[0.9rem] text-neutral-600">
        Only a super admin or an agency manager can see where visits come from.
      </p>
    );
  }

  const visits = await readVisits();

  return (
    <div className="min-w-0 space-y-5">
      <header className="min-w-0">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
          Network signals
        </p>
        <h1 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A] tablet:text-[2.05rem]">
          Visitor places
        </h1>
        <p className="mt-1.5 max-w-xl text-[0.9rem] leading-relaxed text-neutral-500">
          Live visitor location from IP geolocation and optional browser GPS — city,
          region, country, coordinates, ISP, and timezone.
        </p>
      </header>

      <VisitorPlacesMonitor visits={visits} />
    </div>
  );
}
