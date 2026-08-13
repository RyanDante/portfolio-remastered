"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Returns the id of the section currently most visible in the viewport.
 * @param sectionIds - Array of element IDs to observe.
 * @param threshold  - Intersection threshold (0–1). Defaults to 0.4.
 */
export function useScrollSpy(
  sectionIds: string[],
  threshold = 0.4
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observers = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            observers.set(id, entry.intersectionRatio);
          } else {
            observers.delete(id);
          }
        });

        if (observers.size === 0) return;

        // Pick the section with the highest visibility ratio
        let maxId: string | null = null;
        let maxRatio = 0;
        observers.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });
        if (maxId) setActiveId(maxId);
      },
      { threshold: [0, threshold, 1] }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, threshold]);

  return activeId;
}
