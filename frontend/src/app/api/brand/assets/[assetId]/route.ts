import { NextResponse, type NextRequest } from "next/server";

import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

type Ctx = { params: Promise<{ assetId: string }> };

export async function DELETE(_r: NextRequest, { params }: Ctx) {
  try {
    const { assetId } = await params;
    const data = await apiServer(`/brand/assets/${assetId}`, {
      method: "DELETE",
    });
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
