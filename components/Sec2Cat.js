"use client";

import Image from "next/image";
import { Categories } from "@/public/home/categories/index.js";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { Draggable } from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

export default function Sec2Cat() {
  const catDiv = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    if (!catDiv.current) return;

    const cats = catDiv.current?.querySelectorAll("img");

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    requestAnimationFrame(() => {
      gsap.fromTo(
        cats,
        { z: "-100px", scale: 0 },
        {
          z: "0px",
          scale: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: catDiv.current,
            toggleActions: "restart none none none",
            start: "top 80%",
            markers: false,
          },
        }
      );

      cats.forEach((cat) => {
        Draggable.create(cat, {
          type: "rotation",
          inertia: true,
        });
      });

      ScrollTrigger.refresh();
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full relative h-full scale-50 lg:scale-100" ref={catDiv}>
      <Image
        src={Categories[0]}
        alt="Social Media"
        height={52}
        unoptimized
        className="absolute aspect-auto top-[64px] left-[24px] rotate-[3.74deg]"
      />
      <Image
        src={Categories[1]}
        alt="Marketing"
        height={52}
        unoptimized
        className="absolute aspect-auto top-[20px] left-[42.6px] rotate-[-10.79deg]"
      />
      <Image
        src={Categories[4]}
        alt="Animation"
        height={52}
        unoptimized
        className="absolute aspect-auto top-[164px] left-[60px] rotate-[-10.72deg]"
      />
      <Image
        src={Categories[2]}
        alt="Product Design"
        height={52}
        unoptimized
        className="absolute aspect-auto top-[138px] left-[20px] rotate-[3deg]"
      />
      <Image
        src={Categories[3]}
        alt="UI/UX"
        height={50}
        unoptimized
        className="absolute aspect-auto top-[48px] left-[150px] rotate-[21.27deg]"
      />

      <Image
        src={Categories[5]}
        alt="Graphic Design"
        height={52}
        unoptimized
        className="absolute aspect-auto top-[98.46px] left-[7px] rotate-[-5.39deg]"
      />
    </div>
  );
}
