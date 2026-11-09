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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const data = await apiServer("/assessment", { method: "POST", body });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return err(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await apiServer("/assessment", { method: "PUT", body });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const query = Object.fromEntries(request.nextUrl.searchParams.entries());
    const data = await apiServer("/assessment/submissions", {
      method: "GET",
      query,
      cache: "no-store",
    });
    return NextResponse.json(data);
  } catch (error) {
    return err(error);
  }
}
