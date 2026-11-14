#!/usr/bin/env python3
"""Synthesize speech via Microsoft Edge neural TTS (multi-voice)."""

from __future__ import annotations

import argparse
import asyncio
import sys

import edge_tts

DEFAULT_VOICE = "en-NG-AbeoNeural"


async def synthesize(text: str, out_path: str, voice: str, rate: str) -> None:
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(out_path)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--text", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--voice", default=DEFAULT_VOICE)
    parser.add_argument("--rate", default="+2%")
    args = parser.parse_args()

    text = " ".join(args.text.split()).strip()
    if not text:
        print("empty text", file=sys.stderr)
        return 2
    if len(text) > 1200:
        print("text too long", file=sys.stderr)
        return 2

    voice = (args.voice or DEFAULT_VOICE).strip() or DEFAULT_VOICE

    try:
        asyncio.run(synthesize(text, args.out, voice, args.rate))
    except Exception as exc:  # noqa: BLE001 — surface to Node caller
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
