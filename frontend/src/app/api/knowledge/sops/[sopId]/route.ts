import { NextResponse, type NextRequest } from "next/server";
import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

type Ctx = { params: Promise<{ sopId: string }> };

function err(error: unknown) {
  const n = normalizeError(error);
  return NextResponse.json(
    { success: false, error: { code: n.code, message: n.message, status: n.status } },
    { status: n.status || 500 },
  );
}

export async function GET(_r: NextRequest, { params }: Ctx) {
  try {
    const { sopId } = await params;
    const data = await apiServer(`/knowledge/sops/${sopId}`, {
      method: "GET",
      cache: "no-store",
    });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}
