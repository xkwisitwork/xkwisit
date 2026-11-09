import { NextResponse, type NextRequest } from "next/server";

import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

const BACKEND_PATH = "/cron/follow-up-scan";

/** POST /api/cron/follow-up-scan */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const data = await apiServer(BACKEND_PATH, {
      method: "POST",
      body,
      cache: "no-store",
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const normalized = normalizeError(error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: normalized.code,
          message: normalized.message,
          status: normalized.status,
          details: normalized.details,
        },
      },
      { status: normalized.status || 500 },
    );
  }
}
