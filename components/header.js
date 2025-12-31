"use client";

import Image from "next/image";

import LogoLongW from "@/public/home/logoLongW.svg";
import LogoLongB from "@/public/home/logoLongB.svg";
import LogoLongBoW from "@/public/logoLongBO.svg";
import LogoLongWoB from "@/public/logoLongWoB.svg";

// import Link from "next/link";
import { useState, useEffect } from "react";
import MenuContainer from "./MenuContainer";
import ContactMeCard from "./ContactMeCard";
import PageLink from "./PageLink";

import { gsap } from "@/lib/gsapConfig";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { trackClick } from "@/utils/analytics";

gsap.registerPlugin(ScrollSmoother);
export default function Header({ theme }) {
  const [menuOn, setMenuOn] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const contactShow = () => setShowContact(true);
  const contactHide = () => setShowContact(false);

  const menuOpen = () => setMenuOn(true);
  const menuClose = () => setMenuOn(false);

  useEffect(() => {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      if (menuOn) {
        smoother.paused(true);
      } else {
        smoother.paused(false);
      }
    } else {
      console.warn("ScrollSmoother not yet initialized.");
    }
  }, [menuOn]);

  const logoMap = {
    dark: LogoLongB,
    bow: LogoLongBoW,
    wob: LogoLongWoB,
    default: LogoLongW,
  };

  const PxLogo = logoMap[theme] || logoMap.default;

  return (
    <>
      <header
        className={`flex w-full flex-row justify-between p-5  absolute top-0 z-20 `}
      >
        <div className="px-[5px] flex items-center">
          <PageLink href="/">
            <Image
              src={PxLogo}
              alt="Pixelateit Logo"
              width={"auto"}
              height={30}
              priority={true}
            />
          </PageLink>
        </div>
        <div className="flex flex-row gap-4">
          <button
            type="button"
            onClick={() => {
              contactShow();
              trackClick("contact_me_header");
            }}
            className={
              `px-6 py-2 cursor-pointer rounded-full duration-300 font-oswald font-medium uppercase hidden lg:block text-base ` +
              (theme === "dark" || theme === "bow"
                ? "bg-[#242222] text-white hover:bg-[#403D3C]"
                : "bg-white text-[#242222] hover:bg-[#282828] hover:text-white ")
            }
          >
            Contact Me
          </button>
          <button type="button" className="group" onClick={menuOpen}>
            <div
              className={
                `py-2 px-1 cursor-pointer rounded-full duration-300 font-oswald font-medium uppercase text-base ` +
                (theme === "dark" || theme === "bow" || theme === "wob"
                  ? "bg-[#FF3F2B] group-hover:bg-[#B11100]"
                  : "bg-white group-hover:bg-[#2D0F09]")
              }
            >
              <div className="w-8 h-6 p-1 flex flex-col justify-between">
                <div
                  className={
                    `h-0.5 w-full bg-[#2D0F09] ` +
                    (theme === "dark" || theme === "bow" || theme === "wob"
                      ? "bg-white"
                      : "bg-[#2D0F09] group-hover:bg-white")
                  }
                ></div>
                <div
                  className={
                    `h-0.5 w-full bg-[#2D0F09] ` +
                    (theme === "dark" || theme === "bow" || theme === "wob"
                      ? "bg-white"
                      : "bg-[#2D0F09] group-hover:bg-white")
                  }
                ></div>
                <div
                  className={
                    `h-0.5 w-full bg-[#2D0F09] ` +
                    (theme === "dark" || theme === "bow" || theme === "wob"
                      ? "bg-white"
                      : "bg-[#2D0F09] group-hover:bg-white")
                  }
                ></div>
              </div>
            </div>
          </button>
        </div>
      </header>
      <MenuContainer menuOpen={menuOn} menuClose={menuClose} />
      <ContactMeCard contactShow={showContact} contactHide={contactHide} />
    </>
  );
}
