import { NextResponse, type NextRequest } from "next/server";

import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

type Ctx = { params: { projectId: string } };
const path = (id: string) => `/projects/${id}`;

export async function GET(_r: NextRequest, { params }: Ctx) {
  try {
    const data = await apiServer(path(params.projectId), {
      method: "GET",
      cache: "no-store",
    });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  try {
    const body = await request.json();
    const data = await apiServer(path(params.projectId), {
      method: "PATCH",
      body,
    });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}

export async function DELETE(_r: NextRequest, { params }: Ctx) {
  try {
    const data = await apiServer(path(params.projectId), { method: "DELETE" });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}

function err(error: unknown) {
  const n = normalizeError(error);
  return NextResponse.json(
    { success: false, error: { code: n.code, message: n.message, status: n.status } },
    { status: n.status || 500 },
  );
}
