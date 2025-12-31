"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function CustomCursor({ state = "idle", text }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (!cursorRef.current || !smoother) return;

    const move = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY + smoother.scrollTop(),
        duration: 0.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    if (state === "hover") {
      gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.25 });
    } else if (state === "click") {
      gsap.to(cursorRef.current, { opacity: 0, scale: 0.3, duration: 0.2 });
    } else {
      gsap.to(cursorRef.current, { opacity: 0, scale: 0.6, duration: 0.25 });
    }
  }, [state]);

  return (
    <div
      ref={cursorRef}
      className="absolute top-0 left-0 pointer-events-none z-[9999]"
      style={{ scale: 0.6 }}
    >
      <div className="bg-black/50 flex justify-center items-center h-20 w-20 rounded-full backdrop-blur-[5px]">
        <span className="text-white text-sm uppercase font-semibold font-oswald">
          {text}
        </span>
      </div>
    </div>
  );
}
