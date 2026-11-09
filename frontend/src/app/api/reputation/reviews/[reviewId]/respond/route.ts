import { NextResponse, type NextRequest } from "next/server";
import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

type Ctx = { params: Promise<{ reviewId: string }> };

function err(error: unknown) {
  const n = normalizeError(error);
  return NextResponse.json(
    { success: false, error: { code: n.code, message: n.message, status: n.status } },
    { status: n.status || 500 },
  );
}

export async function POST(request: NextRequest, { params }: Ctx) {
  try {
    const { reviewId } = await params;
    const body = await request.json();
    const data = await apiServer(`/reputation/reviews/${reviewId}/respond`, {
      method: "POST",
      body,
    });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}
