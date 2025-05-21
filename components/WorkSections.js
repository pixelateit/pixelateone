"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Image2 from "@/public/home/image-1.webp";

export default function WorkSections() {
  const triggerDiv = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const projects = triggerDiv.current.querySelectorAll(".proj1");

    projects.forEach((proj, index) => {
      if (index !== 0) {
        gsap.set(proj, { yPercent: 100 });
      }
    });

    const scrollLength = (projects.length - 1) * 100;

    const tl = gsap.timeline();

    projects.forEach((proj, index) => {
      if (index < projects.length - 1) {
        tl.to(proj, {
          scale: 0.9,
          borderRadius: "10px",
        });

        tl.to(
          projects[index + 1],
          {
            yPercent: 0,
          },
          "<"
        );
      }
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: triggerDiv.current,
      start: "top top",
      end: `+=${scrollLength}%`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
      markers: false,
    });

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
      className="w-full h-[400vh] overflow-hidden relative block"
      ref={triggerDiv}
    >
      {/* Project 1 */}
      <div className="proj1 w-full h-screen absolute bg-black flex flex-col items-center justify-center inset-0">
        <div className="flex flex-row container max-w-7xl my-auto gap-10">
          <div className="lg:max-w-[720px] w-full h-full border-white/15 aspect-square border relative overflow-hidden rounded-[10px]">
            <Image
              loading="lazy"
              src={Image2}
              alt="Gradient"
              className="w-full aspect-square h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="flex flex-col w-full py-5">
            <div className="flex flex-row gap-3 items-center">
              <div className="w-12 h-12 rounded-md bg-amber-700"></div>
              <div className="flex flex-col">
                <h5 className="text-white font-bold font-archivo text-xl">
                  Untitled Project
                </h5>
                <p className="text-[#AFAFAF] text-sm">
                  GAM is a consortium of physicians creating novel metrics of
                  healthcare quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project 2 */}
      <div className="proj1 w-full h-screen absolute bg-red-500 flex flex-col items-center justify-center inset-0">
        <div className="flex flex-row container max-w-7xl my-auto gap-10">
          <div className="lg:max-w-[720px] w-full h-full border-white/15 aspect-square border relative overflow-hidden rounded-[10px]">
            <Image
              loading="lazy"
              src={Image2}
              alt="Gradient"
              className="w-full aspect-square h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="flex flex-col w-full py-5">
            <div className="flex flex-row gap-3 items-center">
              <div className="w-12 h-12 rounded-md bg-blue-500"></div>
              <div className="flex flex-col">
                <h5 className="text-white font-bold font-archivo text-xl">
                  Untitled Project
                </h5>
                <p className="text-[#AFAFAF] text-sm">
                  GAM is a consortium of physicians creating novel metrics of
                  healthcare quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project 3 */}
      <div className="proj1 w-full h-screen absolute bg-blue-600 flex flex-col items-center justify-center inset-0">
        <div className="flex flex-row container max-w-7xl my-auto gap-10">
          <div className="lg:max-w-[720px] w-full h-full border-white/15 aspect-square border relative overflow-hidden rounded-[10px]">
            <Image
              loading="lazy"
              src={Image2}
              alt="Gradient"
              className="w-full aspect-square h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="flex flex-col w-full py-5">
            <div className="flex flex-row gap-3 items-center">
              <div className="w-12 h-12 rounded-md bg-yellow-500"></div>
              <div className="flex flex-col">
                <h5 className="text-white font-bold font-archivo text-xl">
                  Untitled Project
                </h5>
                <p className="text-[#AFAFAF] text-sm">
                  GAM is a consortium of physicians creating novel metrics of
                  healthcare quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project 4 */}
      <div className="proj1 w-full h-screen absolute bg-black flex flex-col items-center justify-center inset-0">
        <div className="flex flex-row container max-w-7xl my-auto gap-10">
          <div className="lg:max-w-[720px] w-full h-full border-white/15 aspect-square border relative overflow-hidden rounded-[10px]">
            <Image
              loading="lazy"
              src={Image2}
              alt="Gradient"
              className="w-full aspect-square h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="flex flex-col w-full py-5">
            <div className="flex flex-row gap-3 items-center">
              <div className="w-12 h-12 rounded-md bg-red-500"></div>
              <div className="flex flex-col">
                <h5 className="text-white font-bold font-archivo text-xl">
                  Untitled Project
                </h5>
                <p className="text-[#AFAFAF] text-sm">
                  GAM is a consortium of physicians creating novel metrics of
                  healthcare quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
