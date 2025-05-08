"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.sin((t * Math.PI) / 2),
      // ease: "power1.out",
      // direction: "vertical",
      // gestureDirection: "vertical",
      smooth: true,
      lerp: 0.09,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return value !== undefined ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // No lenis.update() here — just refresh
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.kill();
    };
  }, []);

  return null;
}
