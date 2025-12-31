"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

export default function TextHighlightColor({
  children,
  start,
  end,
  opacity,
  y,
  scrub,
  color1 = "#ffffff",
  color2 = "#ff3f2b",
}) {
  const ref = useRef(null);
  const splitRef = useRef(null);

  useGSAPAnimations({
    animations: [
      () => {
        if (!ref.current) return;

        document.fonts.ready.then(() => {
          splitRef.current = new SplitText(ref.current, {
            type: "chars, words",
          });

          const chars = splitRef.current.chars;

          gsap.fromTo(
            chars,
            { opacity: opacity ?? 0.08, y: y ?? 20, color: color1 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 1,
              stagger: {
                amount: 1,
                each: 0.12,
                onStart: function () {
                  const char = this.targets()[0];
                  gsap.to(char, {
                    keyframes: [
                      { color: color2, duration: 0.35 },
                      { color: color1, duration: 0.25 },
                    ],
                    ease: "power2.inOut",
                    delay: 0.05,
                  });
                },
              },
              scrollTrigger: {
                trigger: ref.current,
                start: start ?? "top 55%",
                end: end ?? "top 5%",
                scrub: scrub ?? true,
              },
            }
          );
        });

        // cleanup
        return () => {
          splitRef.current?.revert(); // cleanup SplitText
          gsap.killTweensOf(splitRef.current?.chars);
        };
      },
    ],
    dependencies: [end, opacity, start, scrub, y, color1, color2],
  });

  return <span ref={ref}>{children}</span>;
}
