import { NextResponse, type NextRequest } from "next/server";

import { isAppLocale, type AppLocale } from "@/lib/i18n/locales";
import { synthesizeLocaleSpeech } from "@/lib/voice-guide/nigerianTts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/voice-guide/speak
 * Body: { text: string, locale?: AppLocale }
 * Returns MP3 audio in a fluent voice matched to the selected language.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      text?: unknown;
      locale?: unknown;
    };
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const localeRaw = typeof body.locale === "string" ? body.locale : "en";
    const locale: AppLocale = isAppLocale(localeRaw) ? localeRaw : "en";

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

    const { audio, voice } = await synthesizeLocaleSpeech(text, locale);

    return new NextResponse(new Uint8Array(audio), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
        "X-Voice-Guide-Voice": voice,
        "X-Voice-Guide-Locale": locale,
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
