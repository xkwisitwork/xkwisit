"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type PlotPoint = { label: string; value: number };

export function AreaPlot({ data }: { data: readonly PlotPoint[] }) {
  const reduce = useReducedMotion();
  const fillId = useId().replace(/:/g, "");
  const width = 160;
  const height = 72;
  const max = Math.max(...data.map((point) => point.value), 1);
  const min = Math.min(...data.map((point) => point.value), 0);
  const span = max - min || 1;
  const coords = data.map((point, index) => {
    const x = data.length === 1 ? width / 2 : (index / (data.length - 1)) * width;
    const y = height - 8 - ((point.value - min) / span) * (height - 16);
    return { x, y };
  });
  const line = coords.map((point) => `${point.x},${point.y}`).join(" ");
  const fill = `0,${height} ${line} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-16 w-full" role="img" aria-label="Chart of published figures">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B05C4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3B05C4" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill={`url(#${fillId})`} />
      <motion.polyline
        points={line}
        fill="none"
        stroke="#3B05C4"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      {coords.map((point, index) => (
        <motion.circle
          key={data[index]?.label ?? index}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="#fff"
          stroke="#3B05C4"
          strokeWidth="2"
          initial={reduce ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 * index, type: "spring", stiffness: 260, damping: 18 }}
        />
      ))}
    </svg>
  );
}

export function BarPlot({ data }: { data: readonly PlotPoint[] }) {
  const reduce = useReducedMotion();
  const max = Math.max(...data.map((point) => point.value), 1);
  return (
    <ul className="space-y-2.5">
      {data.map((point, index) => (
        <li key={point.label}>
          <div className="mb-1 flex items-center justify-between gap-2 text-[0.65rem] text-neutral-500">
            <span className="truncate">{point.label}</span>
            <span className="shrink-0 font-semibold text-[#16024A]">{point.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#F4F0FF]">
            <motion.div
              className="h-2 rounded-full bg-[#3B05C4]"
              initial={reduce ? false : { width: 0 }}
              whileInView={{ width: `${Math.max(8, (point.value / max) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
