import { NextResponse, type NextRequest } from "next/server";

import { answerVoiceGuideQuestion } from "@/lib/voice-guide/answer";

export const runtime = "nodejs";

/**
 * POST /api/voice-guide
 * Body: { message: string }
 * Returns grounded product help for the Voice Guide modal.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { message?: unknown };
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "BAD_REQUEST", message: "Message is required." },
        },
        { status: 400 },
      );
    }

    if (message.length > 800) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "BAD_REQUEST", message: "Message is too long." },
        },
        { status: 400 },
      );
    }

    const answer = answerVoiceGuideQuestion(message);

    return NextResponse.json({
      success: true,
      data: answer,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL", message: "Voice guide failed." },
      },
      { status: 500 },
    );
  }
}
