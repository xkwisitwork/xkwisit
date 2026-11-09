import { NextResponse } from "next/server";

/** GET /api/health - liveness probe. */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: { status: "ok", timestamp: new Date().toISOString() },
  });
}
