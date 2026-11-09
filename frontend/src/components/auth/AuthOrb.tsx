"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils/cn";

/**
 * Robotic camera eye - tracks the cursor. Xkwisit cobalt Mission Control mark.
 */
export function AuthOrb({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [blink, setBlink] = useState(false);

  const pupilX = useSpring(0, { stiffness: 120, damping: 18, mass: 0.4 });
  const pupilY = useSpring(0, { stiffness: 120, damping: 18, mass: 0.4 });
  const lidX = useSpring(0, { stiffness: 90, damping: 20, mass: 0.5 });
  const lidY = useSpring(0, { stiffness: 90, damping: 20, mass: 0.5 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      // Clamp look range (px) so the pupil stays inside the iris
      const max = 11;
      const nx = (dx / dist) * Math.min(dist / 80, 1) * max;
      const ny = (dy / dist) * Math.min(dist / 80, 1) * max;
      pupilX.set(nx);
      pupilY.set(ny);
      lidX.set(nx * 0.35);
      lidY.set(ny * 0.35);
    },
    [lidX, lidY, pupilX, pupilY],
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  // Occasional blink
  useEffect(() => {
    let timeout: number;
    const schedule = () => {
      timeout = window.setTimeout(
        () => {
          setBlink(true);
          window.setTimeout(() => setBlink(false), 140);
          schedule();
        },
        3200 + Math.random() * 4200,
      );
    };
    schedule();
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div ref={rootRef} className={cn("relative", className)} aria-hidden>
      <div className="relative mx-auto h-28 w-28 mobile-sm:h-32 mobile-sm:w-32 tablet:h-36 tablet:w-36">
        {/* Soft cobalt aura */}
        <div className="absolute -inset-5 rounded-full bg-mint/15 blur-2xl" />

        {/* Outer housing ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-200 via-white to-neutral-300 p-[3px] shadow-[0_18px_40px_-18px_rgba(37,99,235,0.45),0_0_0_1px_rgba(15,23,42,0.06)]">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-neutral-100 to-neutral-200">
            {/* Bezel screws */}
            {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map(
              (pos) => (
                <span
                  key={pos}
                  className={cn(
                    "absolute h-1.5 w-1.5 rounded-full bg-neutral-400/80 ring-1 ring-neutral-500/30",
                    pos,
                  )}
                />
              ),
            )}

            {/* Inner aperture ring */}
            <div className="absolute inset-[14%] rounded-full border border-neutral-400/70 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black shadow-[inset_0_2px_8px_rgba(0,0,0,0.55)]">
              {/* Iris */}
              <motion.div
                className="absolute inset-[10%] overflow-hidden rounded-full"
                style={{ x: lidX, y: lidY }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
 radial-gradient(circle at 50% 50%, #7A4DFF 0%, #5B45FF 38%, #3B05C4 62%, #16024A 100%)
 `,
                  }}
                />
                {/* Iris spokes */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: `
 repeating-conic-gradient(from 0deg,
 transparent 0deg 8deg,
 rgba(255,255,255,0.12) 8deg 10deg)
 `,
                  }}
                />

                {/* Pupil - tracks cursor */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative h-[38%] w-[38%] rounded-full bg-neutral-950 shadow-[0_0_12px_rgba(37,99,235,0.55)]"
                    style={{ x: pupilX, y: pupilY }}
                  >
                    <span className="absolute left-[22%] top-[18%] h-[28%] w-[28%] rounded-full bg-white/90 blur-[0.5px]" />
                    <span className="absolute bottom-[20%] right-[18%] h-[14%] w-[14%] rounded-full bg-mint-mid/80" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Blink shutter */}
              <motion.div
                className="absolute inset-0 origin-center rounded-full bg-neutral-900"
                initial={false}
                animate={{ scaleY: blink ? 1 : 0 }}
                transition={{ duration: 0.08 }}
              />
            </div>

            {/* Top glass highlight */}
            <div
              className="pointer-events-none absolute inset-[8%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.55), transparent 42%)",
              }}
            />
          </div>
        </div>

        {/* Status LED */}
        <span className="absolute -right-0.5 top-8 flex h-2.5 w-2.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-50" />
          <span className="relative h-2 w-2 rounded-full bg-mint shadow-[0_0_8px_rgba(37,99,235,0.9)]" />
        </span>
      </div>
    </div>
  );
}
