import { NextResponse, type NextRequest } from "next/server";
import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

type Ctx = { params: Promise<{ sourceId: string }> };

function err(error: unknown) {
  const n = normalizeError(error);
  return NextResponse.json(
    { success: false, error: { code: n.code, message: n.message, status: n.status } },
    { status: n.status || 500 },
  );
}

export async function DELETE(_r: NextRequest, { params }: Ctx) {
  try {
    const { sourceId } = await params;
    const data = await apiServer(`/analytics/data-sources/${sourceId}`, {
      method: "DELETE",
    });
    return NextResponse.json(data ?? { success: true });
  } catch (error) {
    return err(error);
  }
}
