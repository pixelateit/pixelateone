// context/SmoothScroll.js
"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    // 🛡️ Prevent initializing if DOM elements not yet present
    if (!wrapper || !content) return;

    // 🔁 Kill previous instance if any
    const existing = ScrollSmoother.get();
    if (existing) existing.kill();

    const smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 5,
      effects: true,
      smoothTouch: 1.5,
    });

    const refreshTimeout = setTimeout(() => {
      smoother.refresh();
    }, 100);

    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });

    return () => {
      clearTimeout(refreshTimeout);
      smoother.kill();
    };
  }, [pathname]);

  return null;
}
