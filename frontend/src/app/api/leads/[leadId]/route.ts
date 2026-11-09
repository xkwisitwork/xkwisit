import { NextResponse, type NextRequest } from "next/server";

import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

type RouteContext = { params: { leadId: string } };

function backendPath(leadId: string) {
  return `/leads/${leadId}`;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const data = await apiServer(backendPath(params.leadId), {
      method: "GET",
      cache: "no-store",
    });

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const body = await request.json();

    const data = await apiServer(backendPath(params.leadId), {
      method: "PATCH",
      body,
    });

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const data = await apiServer(backendPath(params.leadId), {
      method: "DELETE",
    });

    return NextResponse.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error: unknown) {
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
