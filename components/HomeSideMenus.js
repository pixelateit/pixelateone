"use client";
import TextScramble from "./TextScramble";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { trackClick } from "@/utils/analytics";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef } from "react";

export default function HomeSideMenus() {
  const sideMenuRef = useRef();
  const sideMenuRef2 = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    if (!sideMenuRef.current || !sideMenuRef2.current) return;

    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        sideMenuRef.current,
        { left: "-100px" },
        {
          left: 0,
          delay: 2.5,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sideMenuRef.current,
            start: "top center",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      ).fromTo(
        sideMenuRef2.current,
        { right: "-100px" },
        {
          right: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sideMenuRef2.current,
            start: "top center",
            toggleActions: "play none none none",
            markers: false,
          },
        },
        "<"
      );

      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      {/*Left Side */}
      <div
        className="max-w-20 items-center max-h-screen pointer-events-none justify-center  w-full flex-col gap-4 mt-[100px] fixed top-0 left-[-100px] hidden lg:flex"
        style={{ height: "calc(100vh - 150px)", zIndex: 96 }}
        ref={sideMenuRef}
      >
        <div className="flex flex-col h-full items-center">
          <div className="bg-[#c0c0c0] h-full w-[0.75px]"></div>
          <div className="bg-[#c0c0c0] h-[0.75px] w-[20px]"></div>
        </div>

        <div className="flex w-full gap-2 flex-col items-center">
          <div className="flex w-full flex-col items-center">
            <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
              UI/UX,
              <br />
              Graphic
            </span>
          </div>
          <div className="flex w-full flex-col items-center">
            <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
              Designer
            </span>
          </div>
          <div className="flex w-full flex-col items-center">
            <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
              Based In
              <br />
              Inida
            </span>
          </div>
        </div>

        <div className="flex flex-col h-full items-center">
          <div className="bg-[#c0c0c0] h-[0.75px] w-[20px]"></div>
          <div className="bg-[#c0c0c0] h-full w-[0.75px]"></div>
        </div>
        <div className="flex w-full flex-col items-center">
          <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
            ©2026
          </span>
        </div>
      </div>
      {/*Right Side */}
      <div
        className="max-w-20 items-center max-h-screen justify-center hidden lg:flex w-full flex-col gap-4 mt-[100px] fixed top-0 right-[-100px]"
        style={{ height: "calc(100vh - 150px)", zIndex: 96 }}
        ref={sideMenuRef2}
      >
        <div className="flex flex-col h-full pointer-events-none items-center">
          <div className="bg-[#c0c0c0] h-full w-[0.75px]"></div>
          <div className="bg-[#c0c0c0] h-[0.75px] w-[20px]"></div>
        </div>

        <div className="flex w-full gap-2 flex-col items-center">
          <div className="flex w-full flex-col items-center">
            <button
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#myHunch", offsetY: 0 },
                  ease: "power2",
                });
                trackClick("side_menu_hunch");
              }}
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>My Hunch</TextScramble>
            </button>
          </div>
          <div className="flex w-full flex-col items-center">
            <button
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#myWork", offsetY: 0 },
                  ease: "power2",
                });
                trackClick("side_menu_work");
              }}
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>Work</TextScramble>
            </button>
          </div>

          <div className="flex w-full flex-col items-center">
            <button
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#myPosters", offsetY: 0 },
                  ease: "power2",
                });
                trackClick("side_menu_posters");
              }}
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>Posters</TextScramble>
            </button>
          </div>

          <div className="flex w-full flex-col items-center">
            <button
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#aboutMe", offsetY: 0 },
                  ease: "power2",
                });
                trackClick("side_menu_aboutme");
              }}
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>About Me</TextScramble>
            </button>
          </div>

          <div className="flex w-full flex-col items-center">
            <button
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#myServices", offsetY: 0 },
                  ease: "power2",
                });
                trackClick("side_menu_services");
              }}
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>Services</TextScramble>
            </button>
          </div>

          <div className="flex w-full flex-col items-center">
            <button
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#myBlogs", offsetY: 0 },
                  ease: "power2",
                });
                trackClick("side_menu_blogs");
              }}
              className="block font-oswald w-full text-xs text-[#cfcfcf] text-center uppercase cursor-pointer hover:text-[#7E1C06]"
            >
              <TextScramble>Blogs</TextScramble>
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full pointer-events-none items-center">
          <div className="bg-[#c0c0c0] h-[0.75px] w-[20px]"></div>
          <div className="bg-[#c0c0c0] h-full w-[0.75px]"></div>
        </div>
        <div className="flex w-full flex-col items-center">
          <span className="block font-oswald w-full text-xs text-[#c0c0c0] text-center uppercase">
            Menu
          </span>
        </div>
      </div>
    </>
  );
}
