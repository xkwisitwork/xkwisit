#!/usr/bin/env python3
"""Synthesize male Nigerian English (Abeo) via Microsoft Edge neural TTS."""

from __future__ import annotations

import argparse
import asyncio
import sys

import edge_tts

VOICE = "en-NG-AbeoNeural"


async def synthesize(text: str, out_path: str) -> None:
    communicate = edge_tts.Communicate(text, VOICE, rate="+2%")
    await communicate.save(out_path)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--text", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()

    text = " ".join(args.text.split()).strip()
    if not text:
        print("empty text", file=sys.stderr)
        return 2
    if len(text) > 1200:
        print("text too long", file=sys.stderr)
        return 2

    try:
        asyncio.run(synthesize(text, args.out))
    except Exception as exc:  # noqa: BLE001 — surface to Node caller
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
