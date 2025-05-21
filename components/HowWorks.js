"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAppear from "./TextAppear";

export default function HowWorks() {
  const divWx = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      divWx.current,
      {
        width: "80px",
      },
      {
        width: "700px",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: divWx.current,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
          markers: false,
        },
      }
    );

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="p-5 relative min-h-56" ref={divWx}>
      <div className="h-8 w-8 border-[#AFAFAF] border-l border-t absolute top-0 left-0"></div>
      <div className="h-8 w-8 border-[#AFAFAF] border-r border-t absolute top-0 right-0"></div>
      <div className="h-8 w-8 border-[#AFAFAF] border-l border-b absolute bottom-0 left-0"></div>
      <div className="h-8 w-8 border-[#AFAFAF] border-r border-b absolute bottom-0 right-0"></div>
      <p
        className="text-[#2D0F09] absolute top-5 w-fit flex flex-col font-oswald uppercase font-semibold text-center"
        style={{
          fontSize: "clamp(32px, 7vw, 72px)",
          lineHeight: "clamp(28px, 6vw, 64px)",
          letterSpacing: "-0.06em",
        }}
      >
        <TextAppear className="w-full" start="top 50%" end="top 10%">
          <span>Your Superpower test,</span>
          <span>
            <span className="text-[#FF471E]">10x</span> better than an
          </span>
          <span>annual physical</span>
        </TextAppear>
      </p>
    </div>
  );
}
