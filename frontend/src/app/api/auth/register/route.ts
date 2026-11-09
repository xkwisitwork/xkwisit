import { NextResponse, type NextRequest } from "next/server";

import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

const BACKEND_PATH = "/auth/register";

/** GET /api/auth/register */
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

/** POST /api/auth/register */
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

/** PATCH /api/auth/register */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const data = await apiServer(BACKEND_PATH, {
      method: "PATCH",
      body,
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

/** DELETE /api/auth/register */
export async function DELETE(request: NextRequest) {
  try {
    const data = await apiServer(BACKEND_PATH, {
      method: "DELETE",
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
