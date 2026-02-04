"use client";

import { useEffect, useRef } from "react";
import TextAppear from "./TextAppear";
import TextHighlight from "./TextHighlight";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import Image from "next/image";

import uiux1 from "@/public/home/skills/uiux/UIUX-01.png";
import uiux2 from "@/public/home/skills/uiux/UIUX-02.png";
import uiux3 from "@/public/home/skills/uiux/UIUX-03.png";
import anim1 from "@/public/home/skills/anim/Anim-01.png";
import anim2 from "@/public/home/skills/anim/Anim-02.png";
import anim3 from "@/public/home/skills/anim/Anim-03.png";
import comProf1 from "@/public/home/skills/comProf/ComProf-01.png";
import comProf2 from "@/public/home/skills/comProf/ComProf-02.png";
import comProf3 from "@/public/home/skills/comProf/ComProf-03.png";
import graph1 from "@/public/home/skills/graph/Graph-01.png";
import graph2 from "@/public/home/skills/graph/Graph-02.png";
import graph3 from "@/public/home/skills/graph/Graph-03.png";
import webDev1 from "@/public/home/skills/webDev/WebDev-01.png";
import webDev2 from "@/public/home/skills/webDev/WebDev-02.png";
import webDev3 from "@/public/home/skills/webDev/WebDev-03.png";

export default function SkillSection() {
  const devMd = useRef(null);

  useEffect(() => {
    if (!devMd.current) return;

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    requestAnimationFrame(() => {
      const children = Array.from(devMd.current.children);

      gsap.to(
        children,
        // {
        //   rotate: "-2deg",
        //   scale: 1.05,
        // },
        {
          rotate: "0deg",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.07)",
          scale: 1,
          stagger: 0.1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: devMd.current,
            start: "50% 70%",
            toggleActions: "restart none none none",
            // end: "50% 20%",
            // scrub: true,
            markers: false,
          },
        },
      );

      ScrollTrigger.refresh();
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col container w-full max-w-7xl  mt-8 lg:mt-20">
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <TextHighlight opacity={0}>
            <h3
              id="myServices"
              className="flex flex-row"
              style={{ fontSize: "clamp(24px, 2.5vw, 48px)" }}
            >
              <span
                className="text-[#2D0F09] font-bold font-archivo-narrow"
                style={{
                  letterSpacing: "-0.05em",
                  lineHeight: "clamp(20px, 1.56vw, 30px)",
                }}
              >
                My
              </span>
              <span
                className="text-[#2D0F09] font-kings"
                style={{
                  fontSize: "clamp(24px, 2.5vw, 54px)",
                  lineHeight: "clamp(24px, 1.875vw, 36px)",
                }}
              >
                Skills
              </span>
            </h3>
          </TextHighlight>

          <div className="w-full relative">
            <TextAppear start="top 55%" end="top 5%">
              <h2
                className="text-[#2D0F09] w-full flex flex-col font-oswald uppercase font-semibold text-center"
                style={{
                  fontSize: "clamp(32px, 4.16vw, 80px)",
                  lineHeight: "clamp(30px, 3.75vw, 72px)",
                  letterSpacing: "-0.05em",
                  textAlign: "center",
                  textTransparent: "true",
                }}
              >
                <span>Business Goals Meet</span>
                {/* <br /> */}
                <span>Great Design</span>
              </h2>
            </TextAppear>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-12 lg:mt-28">
        <div className="w-full flex flex-col items-center mb-20 lg:mb-60">
          <div className="w-full items-center flex flex-col " ref={devMd}>
            <div className="w-full flex flex-col items-center bg-white border-b-[1px] border-black/20 z-5 hover:z-10 shadow-[0_12px_40px_0_rgba(0,0,0,0.07)] group">
              <div className="w-full flex flex-col items-center bg-white py-10 group-hover:bg-[#E6EAED] duration-300">
                <div className="w-full max-w-[1080px] flex gap-2 lg:gap-0 flex-col lg:flex-row px-5 lg:px-0">
                  <h5 className="w-full font-archivo font-semibold text-xl text-[#2D0F09] max-w-[300px] flex gap-1 items-center">
                    <span className="font-kings text-sm text-[#2D0F09]">
                      (01)
                    </span>
                    UX/UI Design
                  </h5>
                  <p className="w-full font-archivo font-normal text-[#6F6867] text-base">
                    Intuitive, user-centered interfaces crafted with
                    precision—balancing usability, accessibility, and visual
                    clarity. Designed for SaaS platforms, dashboards, and
                    digital products.
                  </p>
                  <div className="w-full hidden lg:block max-w-[300px] h-full relative z-10">
                    <div className="w-full max-w-[300px] h-full relative translate-x-20">
                      <Image
                        src={uiux2}
                        alt="Image2"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[45%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-300 rotate-z-0 group-hover:rotate-z-[-24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={uiux3}
                        alt="Image3"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[55%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-[200ms] rotate-z-0 group-hover:rotate-z-[24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={uiux1}
                        alt="Image1"
                        width={212}
                        height={248}
                        className="absolute top-0 left-1/2 -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-200 origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-xl aspect-auto border border-black/5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center bg-white border-b-[1px] border-black/20 origin-top-left z-4 hover:z-10 rotate-[-2deg] shadow-[0_12px_40px_0_rgba(0,0,0,0.07)] group">
              <div className="w-full flex flex-col items-center bg-white py-10 group-hover:bg-[#E6EAED] duration-300">
                <div className="w-full max-w-[1080px] flex gap-2 lg:gap-0 flex-col lg:flex-row px-5 lg:px-0">
                  <h5 className="w-full font-archivo font-semibold text-xl text-[#2D0F09] max-w-[300px] flex gap-1 items-center">
                    <span className="font-kings text-sm text-[#2D0F09]">
                      (02)
                    </span>
                    Web Development
                  </h5>
                  <p className="w-full font-archivo font-normal text-[#6F6867] text-base">
                    Responsive, high-performance websites built with modern
                    technologies. Optimized for speed, scalability, and seamless
                    user interaction across devices.
                  </p>
                  <div className="w-full hidden lg:block max-w-[300px] h-full relative z-10">
                    <div className="w-full max-w-[300px] h-full relative translate-x-20">
                      <Image
                        src={webDev2}
                        alt="WebDev1"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[45%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-300 rotate-z-0 group-hover:rotate-z-[-24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={webDev3}
                        alt="WebDev2"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[55%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-[200ms] rotate-z-0 group-hover:rotate-z-[24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={webDev1}
                        alt="WebDev3"
                        width={212}
                        height={248}
                        className="absolute top-0 left-1/2 -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-200 origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-xl aspect-auto border border-black/5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center bg-white border-b-[1px] border-black/20 origin-top-left z-3 hover:z-10 rotate-[-4deg] shadow-[0_12px_40px_0_rgba(0,0,0,0.07)] group">
              <div className="w-full flex flex-col items-center bg-white py-10 group-hover:bg-[#E6EAED] duration-300">
                <div className="w-full max-w-[1080px] flex gap-2 lg:gap-0 flex-col lg:flex-row px-5 lg:px-0">
                  <h5 className="w-full font-archivo font-semibold text-xl text-[#2D0F09] max-w-[300px] flex gap-1 items-center">
                    <span className="font-kings text-sm text-[#2D0F09]">
                      (03)
                    </span>
                    Graphic Design
                  </h5>
                  <p className="w-full font-archivo font-normal text-[#6F6867] text-base">
                    Strategic visual communication—from brand identities to
                    marketing creatives. Clean, impactful designs that
                    strengthen brand presence and storytelling.
                  </p>
                  <div className="w-full hidden lg:block max-w-[300px] h-full relative z-10">
                    <div className="w-full max-w-[300px] h-full relative translate-x-20">
                      <Image
                        src={graph3}
                        alt="Graph1"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[45%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-300 rotate-z-0 group-hover:rotate-z-[-24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={graph2}
                        alt="Graph2"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[55%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-[200ms] rotate-z-0 group-hover:rotate-z-[24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={graph1}
                        alt="Graph3"
                        width={212}
                        height={248}
                        className="absolute top-0 left-1/2 -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-200 origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-xl aspect-auto border border-black/5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center bg-white border-b-[1px] border-black/20 origin-top-left z-2 hover:z-10 rotate-[-6deg] shadow-[0_12px_40px_0_rgba(0,0,0,0.07)] group">
              <div className="w-full flex flex-col items-center bg-white py-10 group-hover:bg-[#E6EAED] duration-300">
                <div className="w-full max-w-[1080px] flex gap-2 lg:gap-0 flex-col lg:flex-row px-5 lg:px-0">
                  <h5 className="w-full font-archivo font-semibold text-xl text-[#2D0F09] max-w-[300px] flex gap-1 items-center">
                    <span className="font-kings text-sm text-[#2D0F09]">
                      (04)
                    </span>
                    Pitch Decks
                  </h5>
                  <p className="w-full font-archivo font-normal text-[#6F6867] text-base">
                    Compelling presentation designs that communicate vision with
                    clarity. Structured for storytelling, investor confidence,
                    and persuasive impact.
                  </p>
                  <div className="w-full hidden lg:block max-w-[300px] h-full relative z-10">
                    <div className="w-full max-w-[300px] h-full relative translate-x-20">
                      <Image
                        src={comProf1}
                        alt="ComProf1"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[45%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-300 rotate-z-0 group-hover:rotate-z-[-24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={comProf2}
                        alt="ComProf2"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[55%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-[200ms] rotate-z-0 group-hover:rotate-z-[24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={comProf3}
                        alt="ComProf3"
                        width={212}
                        height={248}
                        className="absolute top-0 left-1/2 -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-200 origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-xl aspect-auto border border-black/5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center bg-white border-b-[1px] border-black/20 origin-top-left z-1 hover:z-10 rotate-[-8deg] shadow-[0_12px_40px_0_rgba(0,0,0,0.07)] group">
              <div className="w-full flex flex-col items-center bg-white py-10 group-hover:bg-[#E6EAED] duration-300">
                <div className="w-full max-w-[1080px] flex gap-2 lg:gap-0 flex-col lg:flex-row px-5 lg:px-0">
                  <h5 className="w-full font-archivo font-semibold text-xl text-[#2D0F09] max-w-[300px] flex gap-1 items-center">
                    <span className="font-kings text-sm text-[#2D0F09]">
                      (05)
                    </span>
                    3D Animation
                  </h5>
                  <p className="w-full font-archivo font-normal text-[#6F6867] text-base">
                    Dynamic 3D visuals and motion experiences that elevate
                    digital storytelling—ideal for product showcases, web
                    interactions, and branded content.
                  </p>
                  <div className="w-full hidden lg:block max-w-[300px] h-full relative z-10">
                    <div className="w-full max-w-[300px] h-full relative translate-x-20">
                      <Image
                        src={anim1}
                        alt="Anim1"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[45%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-300 rotate-z-0 group-hover:rotate-z-[-24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={anim2}
                        alt="Anim2"
                        width={212}
                        height={248}
                        className="absolute top-[-50px] left-[55%] -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-[200ms] rotate-z-0 group-hover:rotate-z-[24deg] origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-sm aspect-auto border border-black/5"
                      />

                      <Image
                        src={anim3}
                        alt="Anim3"
                        width={212}
                        height={248}
                        className="absolute top-0 left-1/2 -translate-1/2 scale-0 rounded-xl max-w-[212px] max-h-[248px] object-cover group-hover:scale-100 duration-200 origin-bottom opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur-none group-hover:shadow-xl aspect-auto border border-black/5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
