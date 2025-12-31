"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export function useGSAPAnimations({
  animations,
  delay = 100,
  dependencies = [],
}) {
  useEffect(() => {
    const cleanupFns = [];
    // small delay to ensure DOM is mounted
    const timer = setTimeout(() => {
      animations.forEach((fn) => {
        const cleanup = fn();
        if (typeof cleanup === "function") {
          cleanupFns.push(cleanup);
        }
      });
      ScrollTrigger.refresh();
    }, delay);

    return () => {
      clearTimeout(timer);
      cleanupFns.forEach((fn) => fn());
    };
  }, dependencies);
}
