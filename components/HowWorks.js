"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import TextAppear from "./TextAppear";

export default function HowWorks() {
  const divWx = useRef(null);

  useGSAPAnimations({
    animations: [
      () => {
        if (!divWx.current) return;

        const ctx = gsap.context(() => {
          gsap.fromTo(
            divWx.current,
            { width: "80px" },
            {
              width: "700px",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: divWx.current,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        }, divWx);

        return () => ctx.revert();
      },
    ],
    dependencies: [],
  });

  return (
    <div
      className="p-2.5 lg:p-5 relative min-w-[340px]"
      ref={divWx}
      style={{
        height: "clamp(124px, 11.67vw, 224px)",
        maxWidth: "clamp(340px, 36.46vw, 700px)",
        position: "relative",
        margin: "0 auto",
      }}
    >
      <div className="h-8 w-8 border-[#AFAFAF] border-l border-t absolute top-0 left-0"></div>
      <div className="h-8 w-8 border-[#AFAFAF] border-r border-t absolute top-0 right-0"></div>
      <div className="h-8 w-8 border-[#AFAFAF] border-l border-b absolute bottom-0 left-0"></div>
      <div className="h-8 w-8 border-[#AFAFAF] border-r border-b absolute bottom-0 right-0"></div>
      <p
        className="text-[#2D0F09] absolute top-3 left-1/2 -translate-x-1/2 w-full flex flex-col font-oswald uppercase font-semibold text-center"
        style={{
          fontSize: "clamp(26px, 2.81vw, 54px)",
          lineHeight: "clamp(26px, 2.55vw, 49px)",
          letterSpacing: "-0.05em",
        }}
      >
        <TextAppear className="w-full" start="top 50%" end="top 10%">
          <span>Bold brands. Intuitive design. Scroll-stopping </span>
          <span className="text-[#FF471E]">visuals— crafted to connect</span>
          <span>, convert, and leave a lasting mark.</span>
        </TextAppear>
      </p>
    </div>
  );
}
