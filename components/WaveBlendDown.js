"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import Image from "next/image";
import GradientImg from "@/public/home/GradientImg2.webp";

export default function WaveBlendDown() {
  const imgDown = useRef(null);
  const triggerDown = useRef(null);

  useGSAPAnimations({
    animations: [
      () => {
        if (!imgDown.current || !triggerDown.current) return;

        gsap.fromTo(
          imgDown.current,
          { scaleY: -16 },
          {
            scaleY: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: triggerDown.current,
              start: "70% 80%",
              end: "bottom 20%",
              scrub: true,
              markers: false,
            },
          }
        );

        // cleanup
        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      },
    ],
    dependencies: [],
  });

  return (
    <div
      className="pointer-events-none relative w-full z-9 h-[50vh] bg-white"
      ref={triggerDown}
    >
      <div className="flex h-full w-full" style={{ alignItems: "flex-start" }}>
        <div className=" relative h-[100vh] w-screen">
          <div
            className=" sticky top-0 flex h-screen w-full"
            style={{ alignItems: "flex-start" }}
          >
            <div
              className="absolute left-0 h-auto w-full"
              style={{ bottom: "auto", top: "-5px" }}
            >
              <div
                className="flex origin-bottom flex-row"
                style={{ transform: "translateY(-28.5vw)" }}
                ref={imgDown}
              >
                {/* Background Image */}
                <Image
                  src={GradientImg}
                  alt="Gradient"
                  priority
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
