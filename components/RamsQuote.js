"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DesignS from "@/public/home/designS.webp";
import FunctionalS from "@/public/home/FunctionalS.webp";
import TextAppear from "./TextAppear";

export default function RamsQuote() {
  const quote = useRef(null);
  const quoteDiv = useRef(null);
  const img1 = useRef(null);
  const img2 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: quote.current,
        start: "top 60%",
        end: "top 10%",
        scrub: true,
        markers: false,
      },
    });

    tl.fromTo(
      quoteDiv.current,
      { minWidth: "40px" },
      { minWidth: "480px", duration: 1, ease: "power3.out" }
    )
      .fromTo(
        [img1.current, img2.current],
        { maxWidth: "140px" },
        { maxWidth: "212px", duration: 1, ease: "power3.out" },
        "-=0.9"
      )
      .fromTo(
        quote.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
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
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-row items-center gap-8">
        <Image
          src={DesignS}
          ref={img1}
          alt="Beautiful Design"
          className=" w-full aspect-video"
        />
        <div className="flex flex-row items-center w-full">
          <div className="bg-[#cccccc] h-[1px] w-full"></div>
          <div className="bg-[#cccccc] h-[80px] w-[1px]"></div>
        </div>
        <div
          className="flex relative flex-col items-center h-auto"
          ref={quoteDiv}
        >
          <h3
            className="flex absolute w-[480px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex-col text-center text-[#2D0F09] uppercase font-oswald font-semibold"
            ref={quote}
            style={{
              fontSize: "clamp(15px, 3vw, 30px)",
              lineHeight: "clamp(14px, 2.8vw, 28px)",
              letterSpacing: "-0.05em",
            }}
          >
            <TextAppear classname="w-full" start={"top 50%"} end={"top 10%"}>
              Good design is as little design as possible. emphasizing
              purposeful simplicity, where beauty and function are distilled to
              their essence..
            </TextAppear>
          </h3>
        </div>
        <div className="flex flex-row items-center w-full ">
          <div className="bg-[#cccccc] h-[80px] w-[1px]"></div>
          <div className="bg-[#cccccc] h-[1px] w-full"></div>
        </div>
        <Image
          src={FunctionalS}
          ref={img2}
          alt="Functional Design"
          className="max-w-[212px] w-full aspect-video"
        />
      </div>

      <span className="w-fit text-center">
        <span className="w-fit font-kings text-lg text-[#9a9a9a]">
          A dose of{" "}
        </span>
        <span className="w-fit font-archivo-narrow text-lg font-semibold text-[#2D0F09]">
          Dieter Rams
        </span>
      </span>
    </div>
  );
}
