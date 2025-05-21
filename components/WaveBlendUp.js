"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GradientImg from "@/public/home/GradientImg2.webp";

export default function WaveBlendUp() {
  const imgUp = useRef(null);
  const triggerUp = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      imgUp.current,
      { scaleY: 0 },
      {
        scaleY: 8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerUp.current,
          start: "70% 80%",
          end: "bottom 20%",
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
    <div
      className="pointer-events-none relative z-9 w-full h-[50vh] bg-white"
      ref={triggerUp}
    >
      <div className="flex h-full w-full" style={{ alignItems: "flex-end" }}>
        <div className=" relative h-[100vh] w-screen">
          <div
            className=" sticky top-0 flex h-screen w-full"
            style={{ alignItems: "flex-end" }}
          >
            <div
              className="absolute left-0 h-auto w-full"
              style={{ bottom: "-5px", top: "auto" }}
            >
              <div className="flex origin-bottom flex-row" ref={imgUp}>
                {/* Background Image */}
                <Image
                  src={GradientImg}
                  alt="Gradient"
                  loading="lazy"
                  className="pointer-events-none h-full grow origin-bottom-left"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
