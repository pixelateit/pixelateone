"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import HandWithCapsuleImg from "@/public/home/handWithCapsule.webp";

export default function HandWithCapsule({ className }) {
  const handsImgs = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
          trigger: handsImgs.current,
          start: "50% 50%",
          end: "50% 10%",
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
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="w-full" ref={handsImgs}>
        <Image
          src={HandWithCapsuleImg}
          alt="Visual vs Functional"
          className="w-full aspect-auto"
          loading="lazy"
          ref={handsImgs}
        />
      </div>
    </div>
  );
}
