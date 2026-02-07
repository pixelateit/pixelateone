"use client";

import Image from "next/image";
import MyPhoto from "@/public/ps-photo.webp";
import TextAppear from "./TextAppear";
import PageTorn from "@/public/home/pageTorn2.webp";
import { useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import EdgeW from "@/public/EdgeW.svg";
import EdgeR from "@/public/EdgeR.svg";
import AOI from "@/public/DOF.webp";
import DOF from "@/public/AOI2.webp";
import QuoteSlider from "./QuoteSlider";

export default function AboutSection() {
  const postImg = useRef(null);
  const cont = useRef(null);
  const [isOn, setIsOn] = useState(false);
  const [toggleOn, setToggleOn] = useState(0);

  const toggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <section
      className="w-full relative"
      style={{
        background:
          "radial-gradient(296.76% 100% at 50% 100%, #FF9147 9.95%, #FF4D11 24%, #FF3F2B 32%, #E33B2A 44%, #3F120D 71.52%, #000000 100%)",
      }}
    >
      <div className="w-full px-6 pt-[56px] pb-[80px] flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex w-fit">
          <h1
            className="font-bold flex flex-row"
            style={{ fontSize: "clamp(36px, 5.2vw, 100px)" }}
          >
            <span
              className="text-[#ffffff] font-bold font-archivo-narrow"
              style={{
                letterSpacing: "-0.05em",
                lineHeight: "clamp(36px, 5.2vw, 100px)",
              }}
            >
              About
            </span>
            <span
              className="text-[#ffffff] font-kings font-normal text-[84px]"
              style={{
                fontSize: "clamp(40px, 5.72vw, 108px)",
                lineHeight: "clamp(44px, 6.45vw, 124px)",
              }}
            >
              Me
            </span>
          </h1>
          <div style={{ marginTop: "clamp(0px, 0.2vw, 10px)" }}>
            <span
              className="font-oswald font-medium uppercase text-[#FF3F2B]"
              style={{ fontSize: "clamp(10px, 0.83vw, 16px)" }}
            >
              (the1)
            </span>
          </div>
        </div>

        <div className="sticky top-0 text-lg font-semibold font-archivo-narrow text-[#787878] transition-all duration-300 flex gap-2 items-center">
          <span className={isOn ? "text-white" : "text-white/50"}>TL ; DR</span>{" "}
          /
          <div className="flex flex-col gap-6 items-start">
            {/* Toggle Switch */}
            <div
              onClick={toggle}
              className={`relative w-16 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 
          ${isOn ? "bg-[#FF3F2B]" : "bg-gray-500"}`}
            >
              {/* Switch Knob */}
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300
            ${isOn ? "right-1" : "left-1"}`}
              />
              {/* Text */}
              <span
                className={`absolute top-1/2 transform -translate-y-1/2 text-[14px] font-bold tracking-wider transition-colors duration-300
            ${isOn ? "left-2 text-white" : "right-2 text-gray-300"}`}
              >
                {isOn ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-center md:gap-20">
          <div className="w-full h-[600px] md:h-[720px] relative" ref={cont}>
            <div
              ref={postImg}
              className="absolute top-1/2 -translate-y-1/2 origin-top-right md:-left-20 md:rotate-[-12deg] w-[360px] md:w-[480px]"
            >
              <Image
                src={MyPhoto}
                alt="my photo"
                width={525}
                height={625}
                draggable={false}
                className="w-full aspect-auto"
                onLoad={() => {
                  gsap.registerPlugin(Draggable, InertiaPlugin);
                  Draggable.create(postImg.current, {
                    inertia: true,
                    bounds: cont.current,
                    edgeResistance: 0.1,
                  });
                }}
              />
            </div>
          </div>
          <div className="w-full px-5 md:px-0">
            <h5 className="flex items-center gap-1 ps-3">
              <div className="w-[5px] h-[5px] bg-[#FF3F2B]"></div>
              <span className="font-archivo-narrow font-medium text-white text-base uppercase">
                Profile / Bio
              </span>
            </h5>

            <TextAppear scrub={false}>
              <h3
                className="w-full uppercase text-white font-archivo-narrow font-bold mt-8"
                style={{
                  fontSize: "clamp(22px, 2.3vw, 44px)",
                  letterSpacing: "-0.04em",
                  lineHeight: "clamp(19px, 1.97vw, 38px)",
                }}
              >
                <div className="w-full">
                  <div>
                    <span
                      className="font-kings font-normal"
                      style={{
                        fontSize: "clamp(24.5px, 2.55vw, 49px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Y
                    </span>
                    o,{" "}
                    <span
                      className="font-kings font-normal"
                      style={{
                        fontSize: "clamp(24.5px, 2.55vw, 49px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      I
                    </span>{" "}
                    am{" "}
                    <span className="text-red-700">
                      <span
                        className="font-kings font-normal"
                        style={{
                          fontSize: "clamp(24.5px, 2.55vw, 49px)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        P
                      </span>
                      rakhar
                    </span>
                  </div>
                  <div>
                    A{" "}
                    <span
                      className="font-kings font-normal"
                      style={{
                        fontSize: "clamp(24.5px, 2.55vw, 49px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      M
                    </span>
                    ultidisciplinary
                  </div>
                </div>

                <div className="w-full ps-10">
                  <div>
                    <span
                      className="font-kings font-normal"
                      style={{
                        fontSize: "clamp(24.5px, 2.55vw, 49px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      D
                    </span>
                    esigner{" "}
                    <span
                      className="font-kings font-normal"
                      style={{
                        fontSize: "clamp(24.5px, 2.55vw, 49px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      w
                    </span>
                    ith{" "}
                    <span>
                      <span
                        className="font-kings font-normal"
                        style={{
                          fontSize: "clamp(24.5px, 2.55vw, 49px)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        a
                      </span>
                      n
                    </span>
                  </div>
                  <div>
                    <span
                      className="font-kings font-normal"
                      style={{
                        fontSize: "clamp(24.5px, 2.55vw, 49px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      E
                    </span>
                    ngineering{" "}
                    <span
                      className="font-kings font-normal"
                      style={{
                        fontSize: "clamp(24.5px, 2.55vw, 49px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      M
                    </span>
                    indset
                  </div>
                </div>
              </h3>
            </TextAppear>

            <div className="w-full flex flex-col gap-10 mt-[72px]">
              <div className="w-full pe-[60px]">
                <p
                  className={`font-archivo-narrow font-medium text-base uppercase transition-all duration-500 ${
                    isOn ? "text-white/5" : "text-white/90"
                  }`}
                  style={{ letterSpacing: "-0.02em" }}
                >
                  My journey into design began with curiosity.{" "}
                  <span
                    className={
                      isOn ? " text-white font-archivo-narrow" : "text-base"
                    }
                  >
                    <span
                      className={
                        isOn
                          ? " text-[#FF3F2B] inline-block me-1 ps-1"
                          : "hidden"
                      }
                    >
                      (1)
                    </span>
                    I’ve always been drawn to building — understanding how
                    things work and how they can work better.{" "}
                  </span>
                  That curiosity led me to code early, experiment with
                  interfaces, and eventually step into product design.{" "}
                  <span
                    className={
                      isOn ? " text-white font-archivo-narrow" : "text-base"
                    }
                  >
                    <span
                      className={
                        isOn
                          ? " text-[#FF3F2B] inline-block me-1 ps-1"
                          : "hidden"
                      }
                    >
                      (2)
                    </span>
                    With 3.5+ years of hands-on experience, I work at the
                    intersection of design and engineering.{" "}
                  </span>
                  My frontend background allows me to think in systems — not
                  just screens. I design with structure, scalability, and
                  implementation in mind.
                </p>
              </div>

              <div className="w-full ps-[60px]">
                <p
                  className={`font-archivo-narrow font-medium text-base uppercase transition-colors duration-300 ${
                    isOn ? "text-white/5" : "text-white/90"
                  }`}
                  style={{ letterSpacing: "-0.02em" }}
                >
                  I started by designing interfaces and coding them myself. That
                  process shaped how I approach UX today — grounded in logic,
                  performance, and usability.{" "}
                  <span
                    className={
                      isOn ? " text-white font-archivo-narrow" : "text-base"
                    }
                  >
                    <span
                      className={
                        isOn
                          ? " text-[#FF3F2B] inline-block me-1 ps-1"
                          : "hidden"
                      }
                    >
                      (3)
                    </span>
                    Over time, I moved into a design-first approach, focusing on
                    clarity, visual hierarchy, and product strategy.{" "}
                  </span>
                  <span
                    className={
                      isOn ? " text-white font-archivo-narrow" : "text-base"
                    }
                  >
                    <span
                      className={
                        isOn
                          ? " text-[#FF3F2B] inline-block me-1 ps-1"
                          : "hidden"
                      }
                    >
                      (4)
                    </span>
                    My work spans UI/UX, branding, web experiences, and 3D
                    visuals.{" "}
                  </span>
                  I enjoy bridging creativity with technical precision —
                  crafting digital products that are both expressive and
                  functional.
                </p>
              </div>

              <div className="w-full pe-[60px]">
                <p
                  className={`font-archivo-narrow font-medium text-base uppercase transition-colors duration-300 ${
                    isOn ? "text-white/5" : "text-white/90"
                  }`}
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Beyond product design, I’ve worked on branding initiatives,
                  marketing campaigns, and visual systems.{" "}
                  <span
                    className={
                      isOn ? " text-white font-archivo-narrow" : "text-base"
                    }
                  >
                    <span
                      className={
                        isOn
                          ? " text-[#FF3F2B] inline-block me-1 ps-1"
                          : "hidden"
                      }
                    >
                      (5)
                    </span>
                    I’ve led projects end-to-end — from concept and design to
                    implementation — collaborating closely with developers and
                    stakeholders.
                  </span>
                </p>
              </div>

              <div className="w-full ps-[60px]">
                <p
                  className={`font-archivo-narrow font-medium text-base uppercase transition-colors duration-300 ${
                    isOn ? "text-white/5" : "text-white/90"
                  }`}
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Today,{" "}
                  <span
                    className={
                      isOn ? " text-white font-archivo-narrow" : "text-base"
                    }
                  >
                    <span
                      className={
                        isOn
                          ? " text-[#FF3F2B] inline-block me-1 ps-1"
                          : "hidden"
                      }
                    >
                      (6)
                    </span>
                    I focus on building purposeful digital experiences — clean,
                    scalable, and built for impact.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-2.5 mt-[140px]">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col md:flex-row">
            <button
              onClick={() => setToggleOn(0)}
              className={
                "w-full lg:w-[460px] flex items-center justify-center h-[60px] relative text-xl font-archivo font-bold uppercase cursor-pointer " +
                (toggleOn === 0
                  ? "bg-white text-[#242222]"
                  : "bg-[#881406] text-[#C67065]")
              }
              style={{ letterSpacing: "-0.02em", zIndex: 1 }}
            >
              <span>Areas of Interest</span>
              <Image
                src={EdgeW}
                alt="EdgeRW"
                width={120}
                height={60}
                className="absolute hidden md:block top-0 right-[-120px]"
              />
            </button>
            <button
              onClick={() => setToggleOn(1)}
              className={
                "w-full lg:w-[460px] flex items-center justify-center h-[60px] relative text-xl font-archivo font-bold uppercase cursor-pointer " +
                (toggleOn === 1
                  ? "bg-white text-[#242222]"
                  : "bg-[#881406] text-[#C67065]")
              }
              style={{ letterSpacing: "-0.02em" }}
            >
              <span>Disciplines of Focus</span>
              <Image
                src={toggleOn === 1 ? EdgeW : EdgeR}
                alt="EdgeRW"
                width={120}
                height={60}
                className="absolute hidden md:block top-0 right-[-120px]"
              />
            </button>
          </div>

          <div
            className={
              "w-full bg-white flex-col lg:flex-row items-center min-h-[520px] " +
              (toggleOn === 0 ? "flex" : "hidden")
            }
          >
            <div className="w-full p-6 lg:px-[80px] flex items-center h-full lg:py-10">
              <div className="w-full flex flex-col gap-3">
                <span
                  className="w-full font-archivo-narrow font-medium text-base text-[#242222] uppercase"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  (Areas of Interest)
                </span>
                <h2
                  className="w-full font-archivo-narrow font-bold text-[#242222] uppercase"
                  style={{
                    fontSize: "clamp(32px, 3.33vw, 60px)",
                    lineHeight: "clamp(26px, 2.64vw, 52px)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  Media / Entertainment, Fashion / Lifestyle, Technology,
                  Automotive, Luxury, Sports, Art, SAAS
                </h2>
              </div>
            </div>
            <div className="w-full h-full relative max-w-[740px]">
              <Image
                src={AOI}
                alt="main"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className={
              "w-full bg-white flex-col lg:flex-row items-center min-h-[520px] " +
              (toggleOn === 1 ? "flex" : "hidden")
            }
          >
            <div className="w-full px-[60px] flex items-center h-full py-10">
              <div className="w-full flex flex-col gap-3">
                <span
                  className="w-full font-archivo-narrow font-medium text-base text-[#242222] uppercase"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  (Disciplines of Focus)
                </span>
                <h2
                  className="w-full font-archivo-narrow font-bold text-[#242222] uppercase"
                  style={{
                    fontSize: "clamp(32px, 3.33vw, 60px)",
                    lineHeight: "clamp(26px, 2.64vw, 52px)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  Art Direction, Branding, Identity, Visual Design, Interactive
                  Design, Graphic Design, Motion Design, Development, 3D
                  Generalist
                </h2>
              </div>
            </div>
            <div className="w-full h-full relative max-w-[740px]">
              <Image
                src={DOF}
                alt="main"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <QuoteSlider />

      <div
        className="w-full h-[50px] absolute bottom-0 left-0"
        style={{
          backgroundImage: `url(${PageTorn.src})`,
          backgroundRepeat: "repeat-x",
          transform: "translateY(30px)",
          zIndex: 2,
        }}
      />
    </section>
  );
}
