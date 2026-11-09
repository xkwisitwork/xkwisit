import { NextResponse, type NextRequest } from "next/server";
import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

type Ctx = { params: Promise<{ workflowId: string }> };

function err(error: unknown) {
  const n = normalizeError(error);
  return NextResponse.json(
    { success: false, error: { code: n.code, message: n.message, status: n.status } },
    { status: n.status || 500 },
  );
}

export async function GET(_r: NextRequest, { params }: Ctx) {
  try {
    const { workflowId } = await params;
    const data = await apiServer(`/automation/workflows/${workflowId}`, {
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
    const { workflowId } = await params;
    const body = await request.json();
    const data = await apiServer(`/automation/workflows/${workflowId}`, {
      method: "PATCH",
      body,
    });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}
