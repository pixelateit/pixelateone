"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";

const HoverButton = ({ onClickFn, text }) => {
  const lineRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(lineRef.current, {
      width: "24px", // expands line
      backgroundColor: "#FF790E",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      color: "#242222",
      x: 4, // small movement
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(lineRef.current, {
      width: "8px", // back to original
      backgroundColor: "#C7C7C7",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      color: "#24222299", // tailwind /60
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClickFn}
    >
      <div ref={lineRef} className="w-[8px] h-[1.4px] bg-[#C7C7C7]" />
      <span
        ref={textRef}
        className="font-archivo font-medium text-base text-[#242222]/60"
      >
        {text}
      </span>
    </div>
  );
};

export default HoverButton;
