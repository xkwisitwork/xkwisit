/**
 * Master barrel for the UI primitive library.
 * Every component in `@/components/ui` is re-exported here.
 */

/* ─── Foundations ───────────────────────────────────── */
export * from "./Button";
export * from "./Input";
export * from "./Textarea";
export * from "./Label";
export * from "./Card";
export * from "./Badge";

/* ─── Interactive ───────────────────────────────────── */
export * from "./Select";
export * from "./Checkbox";
export * from "./Switch";
export * from "./RadioGroup";
export * from "./Dialog";
export * from "./Sheet";
export * from "./Dropdown";

/* ─── Layout & feedback ─────────────────────────────── */
export * from "./Tabs";
export * from "./Tooltip";
export * from "./Popover";
export * from "./Avatar";
export * from "./Accordion";
export * from "./Table";
export * from "./Form";

/* ─── Utilities ─────────────────────────────────────── */
export { Skeleton, StatCardSkeleton, TableSkeleton } from "./Skeleton/Skeleton";
export type { SkeletonProps } from "./Skeleton/Skeleton";

export { Progress, CircularProgress } from "./Progress/Progress";
export type { ProgressProps, CircularProgressProps } from "./Progress/Progress";

export { Separator } from "./Separator/Separator";
export type { SeparatorProps } from "./Separator/Separator";

export { ScrollArea, ScrollBar } from "./ScrollArea/ScrollArea";
