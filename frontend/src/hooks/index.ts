/**
 * Barrel export for `@/hooks`.
 * Every cross-cutting React hook lives here or in a subfolder and is
 * re-exported from this file.
 */

/* ─── Data ──────────────────────────────────────────── */
export * from "./useFetch";
export * from "./useMutation";

/* ─── UI state ──────────────────────────────────────── */
export * from "./usePagination";
export * from "./useToggle";
export * from "./usePrevious";
export * from "./useCopyToClipboard";
export * from "./useMounted";

/* ─── Viewport & scroll ─────────────────────────────── */
export * from "./useMediaQuery";
export * from "./useWindowSize";
export * from "./useScrollPosition";
export * from "./useIntersectionObserver";
export * from "./useOnScreen";
export * from "./useResizeObserver";

/* ─── Interaction ───────────────────────────────────── */
export * from "./useClickOutside";
export * from "./useKeyPress";
export * from "./useHotkeys";
export * from "./useDebounce";

/* ─── Timers ────────────────────────────────────────── */
export * from "./useInterval";
export * from "./useTimeout";

/* ─── Platform ──────────────────────────────────────── */
export * from "./useLocalStorage";
export * from "./useIsomorphicLayoutEffect";

/* ─── Legacy / feature-specific ─────────────────────── */
export * from "./useOffCanvas";
