"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils/cn";

const BAR_COUNT = 28;

export type VoiceWaveformProps = {
  active: boolean;
  /** Returns normalized 0–1 bars from the live AnalyserNode */
  getBars?: (count: number) => number[];
  /** Overall 0–1 voice level */
  level?: number;
  className?: string;
};

/**
 * Live mic-driven equalizer bars. Falls back to a calm idle shimmer when inactive.
 */
export function VoiceWaveform({
  active,
  getBars,
  level = 0,
  className,
}: VoiceWaveformProps) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(active);
  const getBarsRef = useRef(getBars);
  const levelRef = useRef(level);
  const reduceRef = useRef(reduce);

  activeRef.current = active;
  getBarsRef.current = getBars;
  levelRef.current = level;
  reduceRef.current = reduce;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let idlePhase = 0;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const isActive = activeRef.current;
      const prefersReduce = reduceRef.current;
      const voiceLevel = levelRef.current;
      const readBars = getBarsRef.current;

      const bars =
        isActive && readBars && !prefersReduce
          ? readBars(BAR_COUNT)
          : Array.from({ length: BAR_COUNT }, (_, i) => {
              if (prefersReduce) return isActive ? 0.22 : 0.12;
              idlePhase += 0.012;
              const wave = Math.sin(idlePhase + i * 0.45) * 0.5 + 0.5;
              return isActive ? 0.14 + wave * 0.1 : 0.08 + wave * 0.05;
            });

      const gap = 3;
      const barW = Math.max(2, (width - gap * (BAR_COUNT - 1)) / BAR_COUNT);
      const mid = height / 2;
      const boost = isActive ? 0.55 + voiceLevel * 0.9 : 0.45;

      for (let i = 0; i < BAR_COUNT; i += 1) {
        const amp = Math.max(0.06, Math.min(1, bars[i]! * boost));
        const h = Math.max(3, amp * (height * 0.92));
        const x = i * (barW + gap);
        const y = mid - h / 2;

        const speakingHard = isActive && voiceLevel > 0.08;
        const grad = ctx.createLinearGradient(0, y, 0, y + h);
        grad.addColorStop(0, speakingHard ? "#8B6CFF" : "#C4B5FF");
        grad.addColorStop(0.5, "#3B05C4");
        grad.addColorStop(1, speakingHard ? "#FC3FE3" : "#6B3DFF");

        ctx.fillStyle = grad;
        const radius = Math.min(barW / 2, 4);
        roundRect(ctx, x, y, barW, h, radius);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    rafRef.current = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className={cn("relative h-14 w-full overflow-hidden rounded-2xl", className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
