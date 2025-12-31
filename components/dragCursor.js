"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import CursorDrag from "@/public/DragCursor.svg";
import ScrollCursor from "@/public/ScrollCursor.svg";
import Image from "next/image";

export default function DragCursor({ state = "idle" }) {
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

    if (state === "drag") {
      gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.25 });
    } else if (state === "scroll") {
      gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.25 });
    } else if (state === "view") {
      gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.25 });
    } else if (state === "click") {
      gsap.to(cursorRef.current, { opacity: 0, scale: 0.3, duration: 0.2 });
    } else if (state === "idle") {
      gsap.to(cursorRef.current, { opacity: 0, scale: 0.6, duration: 0.5 });
    } else {
      gsap.to(cursorRef.current, { opacity: 0, scale: 0.6, duration: 0.25 });
    }
  }, [state]);

  return (
    <div
      ref={cursorRef}
      className="absolute top-0 left-0 pointer-events-none z-[9999] cursor-none"
      style={{ scale: 0.6 }}
    >
      {state === "drag" && (
        <div className="bg-white/80 flex justify-center items-center h-14 w-14 rounded-full backdrop-blur-[3px] relative">
          <span className="text-[#242222] text-sm uppercase font-semibold font-oswald z-10">
            Drag
          </span>
          <Image
            src={CursorDrag.src}
            alt="Cursor Drag"
            width={80}
            height={80}
            className={
              `w-full h-auto aspect-auto bg-cover absolute top-0 left-0 ` +
              `${state === "click" ? "scale-125" : "scale-150"}`
            }
          />
        </div>
      )}

      {state === "scroll" && (
        <div className="bg-white/80 flex justify-center items-center px-4 py-2 rounded-full backdrop-blur-[3px] relative">
          <span className="text-[#242222] text-sm uppercase font-semibold font-oswald z-10">
            Scroll
          </span>
          <Image
            src={ScrollCursor.src}
            alt="Cursor Drag"
            width={80}
            height={20}
            className={
              `w-full h-auto aspect-auto bg-cover absolute top-1/2 -translate-y-1/2 left-0 ` +
              `${state === "click" ? "scale-125" : "scale-[140%]"}`
            }
          />
        </div>
      )}

      {state === "view" && (
        <div className="bg-white/80 flex justify-center items-center px-6 py-2 rounded-full backdrop-blur-[5px]">
          <span className="text-[#242222] text-sm uppercase font-semibold font-oswald">
            View
          </span>
        </div>
      )}
    </div>
  );
}
