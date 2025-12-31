"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

export default function TextAppear({
  children,
  classname,
  start,
  end,
  duration,
  scrub,
  delay,
  splittype,
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

          const splitText =
            splittype === "chars"
              ? splitRef.current.chars
              : splitRef.current.words;

          gsap.from(splitText, {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            stagger: 0.08,
            duration: duration || 0.5,
            delay: delay ?? 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: start ?? "top 65%",
              end: end ?? "top 20%",
              scrub: scrub ?? true,
              markers: false,
            },
          });
        });

        // cleanup
        return () => {
          splitRef.current?.revert(); // cleanup SplitText
          gsap.killTweensOf(splitRef.current?.chars);
        };
      },
    ],
    dependencies: [end, start, splittype, scrub, duration, delay],
  });

  return (
    <span className={classname} ref={ref}>
      {children}
    </span>
  );
}
