import { NextResponse, type NextRequest } from "next/server";

import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

const BACKEND_PATH = "/leads";

/** GET /api/leads - proxies to the backend leads list endpoint. */
export async function GET(request: NextRequest) {
  try {
    const query = Object.fromEntries(request.nextUrl.searchParams.entries());

    const data = await apiServer(BACKEND_PATH, {
      method: "GET",
      query,
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
          details: normalized.details,
        },
      },
      { status: normalized.status || 500 },
    );
  }
}

/** POST /api/leads - proxies to the backend create endpoint. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = await apiServer(BACKEND_PATH, {
      method: "POST",
      body,
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
