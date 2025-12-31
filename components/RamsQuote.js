"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import Image from "next/image";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import DesignS from "@/public/home/designS.webp";
import FunctionalS from "@/public/home/FunctionalS.webp";
import TextAppear from "./TextAppear";

export default function RamsQuote() {
  const quote = useRef(null);
  const quoteDiv = useRef(null);
  const img1 = useRef(null);
  const img2 = useRef(null);

  useGSAPAnimations({
    animations: [
      () => {
        if (
          !quote.current ||
          !quoteDiv.current ||
          !img1.current ||
          !img2.current
        )
          return;

        const ctx = gsap.context(() => {
          const mm = gsap.matchMedia();

          mm.add("(max-width: 768px)", () => {
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
              { width: "80px" },
              { width: "340px", duration: 1, ease: "power3.out" }
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
          });

          mm.add("(min-width: 769px)", () => {
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
              { width: "100px" },
              { width: "480px", duration: 1, ease: "power3.out" }
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
          });
        }, quoteDiv);

        return () => ctx.revert();
      },
    ],
    dependencies: [],
  });

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full flex flex-row items-center justify-center md:min-h-[120px] gap-8">
        <Image
          src={DesignS}
          ref={img1}
          width={424}
          height={240}
          alt="Beautiful Design"
          className="hidden lg:block w-full h-auto aspect-video"
        />
        <div className="hidden lg:flex flex-row items-center w-full">
          <div className="bg-[#cccccc] h-[1px] w-full"></div>
          <div className="bg-[#cccccc] h-[80px] w-[1px]"></div>
        </div>
        <div className="basis-[340px] lg:basis-[480px]">
          <div
            className="flex relative flex-col items-center h-12 md:h-36 xl:h-12"
            ref={quoteDiv}
            style={{ width: "100px" }}
          >
            <h3
              className="flex absolute w-[340px] lg:w-[480px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex-col text-center text-[#2D0F09] uppercase font-oswald font-semibold"
              ref={quote}
              style={{
                fontSize: "clamp(16px, 3vw, 30px)",
                lineHeight: "clamp(16px, 2.8vw, 28px)",
                letterSpacing: "-0.05em",
              }}
            >
              <TextAppear classname="w-full" start={"top 50%"} end={"top 10%"}>
                Good design is{" "}
                <span className="text-[#FF3F2B]">
                  as little design as possible.
                </span>{" "}
                emphasizing purposeful simplicity, where{" "}
                <span className="text-[#FF3F2B]">design and function</span> are
                distilled to their essence..
              </TextAppear>
            </h3>
          </div>
        </div>
        <div className="hidden lg:flex flex-row items-center w-full ">
          <div className="bg-[#cccccc] h-[80px] w-[1px]"></div>
          <div className="bg-[#cccccc] h-[1px] w-full"></div>
        </div>
        <Image
          src={FunctionalS}
          ref={img2}
          alt="Functional Design"
          className="hidden lg:block max-w-[212px] w-full aspect-video"
        />
      </div>

      <span className="w-fit text-center text-sm lg:text-lg">
        <span className="w-fit font-kings text-[#9a9a9a]">A dose of </span>
        <span className="w-fit font-archivo-narrow font-semibold text-[#2D0F09]">
          Dieter Rams
        </span>
      </span>
    </div>
  );
}
