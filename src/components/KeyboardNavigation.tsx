"use client";

import { useEffect } from "react";

export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();

        // 1. Find all focusable elements
        const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const allFocusable = Array.from(document.querySelectorAll(selector)) as HTMLElement[];

        // 2. Filter for visible elements only
        const visibleFocusable = allFocusable.filter((el) => {
          const rect = el.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.width > 0 &&
            rect.height > 0 &&
            window.getComputedStyle(el).visibility !== "hidden"
          );
        });

        if (visibleFocusable.length === 0) return;

        // 3. Find current focus index
        const currentIndex = visibleFocusable.indexOf(document.activeElement as HTMLElement);

        // 4. Calculate next index
        let nextIndex;
        if (e.shiftKey) {
          // Shift + Tab: Go backwards
          nextIndex = currentIndex > 0 ? currentIndex - 1 : visibleFocusable.length - 1;
        } else {
          // Tab: Go forwards
          nextIndex = currentIndex < visibleFocusable.length - 1 ? currentIndex + 1 : 0;
        }

        // 5. Focus the next element
        visibleFocusable[nextIndex].focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
