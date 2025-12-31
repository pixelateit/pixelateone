"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import Image from "next/image";
import GradientImg from "@/public/home/GradientImg2.webp";

export default function WaveBlendUp() {
  const imgUp = useRef(null);
  const triggerUp = useRef(null);

  useGSAPAnimations({
    animations: [
      () => {
        if (!imgUp.current || !triggerUp.current) return;

        gsap.fromTo(
          imgUp.current,
          { scaleY: 0 },
          {
            scaleY: 16,
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
