import { NextResponse } from "next/server";

import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

export async function GET() {
  try {
    const data = await apiServer("/leads/stats", {
      method: "GET",
      cache: "no-store",
    });

    return NextResponse.json(data);
  } catch (error) {
    const normalized = normalizeError(error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: normalized.code,
          message: normalized.message,
          status: normalized.status,
        },
      },
      { status: normalized.status || 500 },
    );
  }
}
