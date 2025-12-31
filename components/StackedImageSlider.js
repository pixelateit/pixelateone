"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";

export default function StackedImageSlider({
  images = [],
  width = 540,
  height = 600,
  duration = 4,
  showControls = false,
  hoverPause = false,
}) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);

  // advance slider index
  const cycle = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  // start autoplay
  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(cycle, duration * 1000);
  };

  // stop autoplay
  const stopAuto = () => {
    clearInterval(intervalRef.current);
  };

  // initialize autoplay when images change
  useEffect(() => {
    if (images.length) startAuto();
    return stopAuto;
  }, [images]);

  // pause on hover
  useEffect(() => {
    if (hoverPause && containerRef.current) {
      const el = containerRef.current;
      el.addEventListener("mouseenter", stopAuto);
      el.addEventListener("mouseleave", startAuto);
      return () => {
        el.removeEventListener("mouseenter", stopAuto);
        el.removeEventListener("mouseleave", startAuto);
      };
    }
  }, [hoverPause, containerRef, startAuto, stopAuto]);

  // animate progress bar on index change
  useEffect(() => {
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "100%", duration, ease: "linear" }
      );
    }
  }, [index, duration]);

  // compute zIndex so active slide is on top
  const getZ = (i) => {
    const offset = (i - index + images.length) % images.length;
    return images.length - offset;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center h-full"
      // style={{ height: `${height}%` }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 origin-center w-[50%] md:w-[60%] lg:w-[75%] h-fit"
          style={{
            zIndex: getZ(i),
            transform: `translate(-50%, -50%) rotateZ(${
              i % 2 === 0 ? 3 * i : -5 * i
            }deg)`,
            boxShadow:
              "8px 12px 20px -4px rgba(0,0,0,0.15), 11px 22px 45px rgba(0,0,0,0.24)",
          }}
        >
          <Image
            src={src}
            alt={`Slide ${i + 1}`}
            priority
            width={width || 540}
            height={height || 600}
            className="rounded-[4px] aspect-auto block w-full h-auto"
          />
        </div>
      ))}

      {/* Progress bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80px] h-[5px] bg-[#333] rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-white w-0" />
      </div>

      {/* Manual controls */}
      {showControls && (
        <div className="absolute bottom-2 right-4 flex gap-2">
          <button
            onClick={() => {
              stopAuto();
              setIndex((idx) => (idx - 1 + images.length) % images.length);
              startAuto();
            }}
            className="px-2 py-1 bg-gray-800 text-white rounded"
          >
            Prev
          </button>
          <button
            onClick={() => {
              stopAuto();
              setIndex((idx) => (idx + 1) % images.length);
              startAuto();
            }}
            className="px-2 py-1 bg-gray-800 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
