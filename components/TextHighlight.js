"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { SplitText } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

export default function TextHighlight({
  children,
  start,
  end,
  opacity,
  y,
  scrub,
  delay,
}) {
  const ref = useRef(null);
  const splitRef = useRef(null);
  const triggerRef = useRef(null); // track this component’s trigger

  useGSAPAnimations({
    animations: [
      () => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
          // split the text
          document.fonts.ready.then(() => {
            splitRef.current = new SplitText(ref.current, {
              type: "chars, words",
            });

            // create tween + trigger
            gsap.from(splitRef.current.chars, {
              opacity: opacity ?? 0.08,
              y: y ?? 20,
              stagger: 0.05,
              duration: 1,
              delay: delay ?? 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                start: start ?? "top 55%",
                end: end ?? "top 5%",
                scrub: scrub ?? true,
                // markers: true,
              },
            });
          }, splitRef);
        });

        // cleanup
        return () => {
          ctx.revert();
          splitRef.current?.revert(); // cleanup SplitText
          gsap.killTweensOf(splitRef.current?.chars);
        };
      },
    ],
    dependencies: [end, opacity, start, scrub, y],
  });

  return <span ref={ref}>{children}</span>;
}
