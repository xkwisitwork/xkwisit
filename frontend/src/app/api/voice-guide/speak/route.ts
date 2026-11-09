import { NextResponse, type NextRequest } from "next/server";

import {
  NIGERIAN_MALE_VOICE,
  synthesizeNigerianMale,
} from "@/lib/voice-guide/nigerianTts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/voice-guide/speak
 * Body: { text: string }
 * Returns MP3 audio in a real male Nigerian English neural voice (Abeo).
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { text?: unknown };
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "BAD_REQUEST", message: "Text is required." },
        },
        { status: 400 },
      );
    }

    if (text.length > 1200) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "BAD_REQUEST", message: "Text is too long." },
        },
        { status: 400 },
      );
    }

    const audio = await synthesizeNigerianMale(text);

    return new NextResponse(new Uint8Array(audio), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
        "X-Voice-Guide-Voice": NIGERIAN_MALE_VOICE,
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not synthesize speech.";
    return NextResponse.json(
      {
        success: false,
        error: { code: "TTS_FAILED", message },
      },
      { status: 502 },
    );
  }
}
