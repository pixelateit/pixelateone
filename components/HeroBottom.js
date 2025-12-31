"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { Stickers } from "@/public/home/stickers/index.js";
import Image from "next/image";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

export default function HeroBottom() {
  const div1 = useRef(null);
  const div2 = useRef(null);
  const div3 = useRef(null);
  const catImg = useRef(null);

  useGSAPAnimations({
    animations: [
      () => {
        if (!div1.current || !div2.current || !div3.current || !catImg.current)
          return;

        const animateDivs = (container) => {
          const [left, right] = container.querySelectorAll("div");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
              markers: false,
            },
          });

          tl.fromTo(
            [left, right],
            {
              width: "1px",
              height: "1px",
              borderRadius: "0%",
            },
            {
              width: "100%",
              height: "2rem",
              duration: 1,
              ease: "power3.out",
            }
          ).fromTo(
            catImg.current.children,
            {
              opacity: 0,
              scale: 0.2,
              filter: "blur(20px)",
            },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power3.out",
              delay: 1,
              stagger: {
                each: 0.1,
                amount: 0.5,
                from: "center",
              },
              scrollTrigger: {
                trigger: container,
                start: "top 70%",
                end: "top 40%",
                scrub: true,
              },
            },
            "-=0.3"
          );
        };

        [div1, div2, div3].forEach((ref) => animateDivs(ref.current));
      },
    ],
    dependencies: [],
  });

  return (
    <div className="relative w-full mb-[-4px] z-10">
      {/* Stickers */}
      <div
        className="w-full absolute left-1/2 bottom-0 flex flex-row items-center justify-between px-4 lg:px-10 py-5 max-w-[70%] lg:max-w-1/2"
        style={{
          transform: "translateX(-50%)",
        }}
        ref={catImg}
      >
        {Stickers.map((Sticker, index) => (
          <Image
            key={index}
            src={Sticker}
            alt={`Sticker ${index + 1}`}
            height={20}
            className=" xl:h-5 h-2 aspect-auto"
          />
        ))}
      </div>

      {/* Gooey filter */}
      <svg className="absolute w-0 h-0">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 12 -5"
            result="gooey"
          />
          <feBlend in="SourceGraphic" in2="gooey" />
        </filter>
      </svg>

      {/* Animated bars */}
      <div className="flex flex-col w-full" style={{ filter: "url(#gooey)" }}>
        <div
          className="flex flex-row justify-between gap-[90%] lg:gap-[70%]"
          ref={div1}
        >
          <div className="bg-white max-w-60 max-h-4 md:max-h-8 rounded-tr-md"></div>
          <div className="bg-white max-w-60 max-h-4 md:max-h-8 rounded-tl-md"></div>
        </div>
        <div
          className="flex flex-row justify-between gap-[80%] lg:gap-[65%]"
          ref={div2}
        >
          <div className="bg-white max-w-80 max-h-4 md:max-h-8 rounded-tr-md"></div>
          <div className="bg-white max-w-80 max-h-4 md:max-h-8 rounded-tl-md"></div>
        </div>
        <div
          className="flex flex-row justify-between gap-[70%] lg:gap-[50%]"
          ref={div3}
        >
          <div className="bg-white max-w-md max-h-4 md:max-h-8 rounded-tr-md"></div>
          <div className="bg-white max-w-md max-h-4 md:max-h-8 rounded-tl-md"></div>
        </div>
        <div className="bg-white w-full h-2"></div>
      </div>
    </div>
  );
}
