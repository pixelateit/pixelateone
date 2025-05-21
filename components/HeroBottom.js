"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroBottom() {
  const div1 = useRef(null);
  const div2 = useRef(null);
  const div3 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animateDivs = (container) => {
      const [left, right] = container.querySelectorAll("div");

      gsap.fromTo(
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
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      ),
        "-=0.5";
    };

    [div1, div2, div3].forEach((ref) => animateDivs(ref.current));

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
    <div className="relative w-full">
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
      <div className="flex flex-col w-full" style={{ filter: "url(#gooey)" }}>
        <div className="flex flex-row justify-between gap-4" ref={div1}>
          <div className="bg-white max-w-60 h-8 rounded-tr-md"></div>
          <div className="bg-white max-w-60 h-8 rounded-tl-md"></div>
        </div>
        <div className="flex flex-row justify-between gap-4" ref={div2}>
          <div className="bg-white max-w-80 h-8 rounded-tr-md"></div>
          <div className="bg-white max-w-80 h-8 rounded-tl-md"></div>
        </div>
        <div className="flex flex-row justify-between gap-4" ref={div3}>
          <div className="bg-white max-w-md h-8 rounded-tr-md"></div>
          <div className="bg-white max-w-md h-8 rounded-tl-md"></div>
        </div>
        <div className="bg-white w-full h-2"></div>
      </div>
    </div>
  );
}
