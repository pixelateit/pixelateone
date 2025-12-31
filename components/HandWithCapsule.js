"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import Image from "next/image";
import HandWithCapsuleImg from "@/public/home/handWithCapsule.webp";

export default function HandWithCapsule({ className }) {
  const handsImgs = useRef(null);
  const divImgs = useRef(null);

  useGSAPAnimations({
    animations: [
      () => {
        if (!handsImgs.current || !divImgs.current) return;

        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", handleLoad);

        const ctx = gsap.context(() => {
          gsap.fromTo(
            handsImgs.current,
            {
              width: "100%",
              scale: 1.15,
              filter: "grayScale(1)",
            },
            {
              width: "100%",
              scale: 1,
              filter: "grayScale(0)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: divImgs.current,
                start: "50% 50%",
                end: "50% 10%",
                scrub: true,
                markers: false,
              },
            }
          );
        }, handsImgs);

        return () => ctx.revert();
      },
    ],
    dependencies: [],
  });

  return (
    <div className={`w-full overflow-hidden ${className}`} ref={divImgs}>
      <div className="w-full origin-bottom transform-3d" ref={handsImgs}>
        <Image
          src={HandWithCapsuleImg}
          alt="Visual vs Functional"
          className="w-full aspect-auto"
          priority
        />
      </div>
    </div>
  );
}
