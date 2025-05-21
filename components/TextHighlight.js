"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function TextHighlight({ children, start, end, opacity }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const split = new SplitText(ref.current, {
      type: "chars, words",
    });

    gsap.from(split.chars, {
      opacity: opacity || 0.08,
      y: 20,
      stagger: 0.05,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: start || "top 55%",
        end: end || "top 5%",
        scrub: true,
        // markers: true,
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [end, opacity, start]);

  return <span ref={ref}>{children}</span>;
}
