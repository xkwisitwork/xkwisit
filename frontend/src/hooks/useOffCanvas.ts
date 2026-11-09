"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type UseOffCanvasResult = {
  isMobileMenuVisible: boolean;
  setIsMobileMenuVisible: (value: boolean) => void;
  hamburgerToggle: () => void;
  hamburgerRef: RefObject<HTMLElement | null>;
  sidebarRef: RefObject<HTMLElement | null>;
};

/**
 * Off-canvas / mobile menu state with click-outside close.
 * Legacy helper kept for marketing layouts that still use a hamburger sidebar.
 */
export function useOffCanvas(): UseOffCanvasResult {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const hamburgerRef = useRef<HTMLElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);

  const hamburgerToggle = useCallback(() => {
    setIsMobileMenuVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(target)
      ) {
        setIsMobileMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    isMobileMenuVisible,
    setIsMobileMenuVisible,
    hamburgerToggle,
    hamburgerRef,
    sidebarRef,
  };
}
