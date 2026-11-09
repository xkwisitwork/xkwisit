import { NextResponse, type NextRequest } from "next/server";
import { apiServer } from "@/lib/api/client";
import { normalizeError } from "@/lib/api/errors";

function err(error: unknown) {
  const n = normalizeError(error);
  return NextResponse.json(
    { success: false, error: { code: n.code, message: n.message, status: n.status } },
    { status: n.status || 500 },
  );
}

export async function GET(request: NextRequest) {
  try {
    const query = Object.fromEntries(request.nextUrl.searchParams.entries());
    const data = await apiServer("/intelligence/health", {
      method: "GET",
      query,
      cache: "no-store",
    });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}
