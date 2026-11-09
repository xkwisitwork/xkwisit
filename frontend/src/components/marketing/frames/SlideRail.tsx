"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/** Horizontal row you can drag with a mouse or slide with a finger. */
export function SlideRail({ children }: { children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });
  const [edges, setEdges] = useState({ left: false, right: false });
  const reduce = useReducedMotion();

  const measure = () => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ left: el.scrollLeft > 4, right: max - el.scrollLeft > 4 });
  };

  useEffect(() => {
    measure();
    const el = rail.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    const fonts = document.fonts?.ready.then(measure);
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", measure);
      void fonts;
    };
  }, []);

  const nudge = (direction: -1 | 1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.max(140, el.clientWidth * 0.72),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !rail.current) return;
    drag.current = { active: true, x: event.clientX, left: rail.current.scrollLeft, moved: false };
    rail.current.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !rail.current) return;
    const delta = event.clientX - drag.current.x;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    rail.current.scrollLeft = drag.current.left - delta;
  };

  const end = (event: PointerEvent<HTMLDivElement>) => {
    if (!rail.current) return;
    drag.current.active = false;
    if (rail.current.hasPointerCapture(event.pointerId)) {
      rail.current.releasePointerCapture(event.pointerId);
    }
  };

  const overflow = edges.left || edges.right;
  const maskStops = [
    edges.left ? "transparent 0, transparent 3rem, #fff 3.5rem" : "#fff 0",
    edges.right ? "#fff calc(100% - 6.4rem), transparent calc(100% - 4.6rem)" : "#fff 100%",
  ].join(", ");
  const mask = overflow ? `linear-gradient(to right, ${maskStops})` : undefined;

  return (
    <div className="relative">
      <div
        ref={rail}
        role="region"
        aria-label="Swipe sideways for more"
        tabIndex={overflow ? 0 : undefined}
        style={
          mask
            ? ({
                maskImage: mask,
                WebkitMaskImage: mask,
                maskMode: "alpha",
              } as CSSProperties)
            : undefined
        }
        className="flex cursor-grab snap-x snap-mandatory touch-pan-x items-center gap-2 overflow-x-auto overscroll-x-contain scroll-pl-[3.5rem] scroll-pr-[5.4rem] py-1 active:cursor-grabbing [scrollbar-width:none] [&>*]:snap-start [&::-webkit-scrollbar]:hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerCancel={end}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            nudge(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nudge(-1);
          }
        }}
        onClickCapture={(event) => {
          if (!drag.current.moved) return;
          event.preventDefault();
          event.stopPropagation();
          drag.current.moved = false;
        }}
      >
        {children}
      </div>
      {edges.left ? (
        <button
          type="button"
          aria-label="Show previous"
          onClick={() => nudge(-1)}
          className="absolute left-0 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#DDD3F4] bg-white text-[#16024A] shadow-[0_8px_18px_rgba(22,2,74,0.12)]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
      ) : null}
      {edges.right ? (
        <button
          type="button"
          aria-label="Swipe for more"
          onClick={() => nudge(1)}
          className="absolute right-0 top-1/2 z-10 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-full bg-[#16024A] py-1.5 pl-3 pr-2 text-[0.72rem] font-semibold text-white shadow-[0_8px_18px_rgba(22,2,74,0.18)]"
        >
          Swipe
          {reduce ? (
            <ChevronRight className="h-4 w-4" aria-hidden />
          ) : (
            <motion.span
              className="grid place-items-center"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </motion.span>
          )}
        </button>
      ) : null}
    </div>
  );
}
