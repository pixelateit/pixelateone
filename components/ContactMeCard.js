"use client";

import ContactMeBG from "@/public/ContactMeBG.png";
import ReachOut from "@/public/ReachOut.png";
import MarkerLineY from "@/public/MarkerLineY.png";
import BarCodePX from "@/public/BarCodePX.png";
import PageTorn from "@/public/home/pageTorn2.webp";
import Image from "next/image";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";
import Link from "next/link";
import { trackClick } from "@/utils/analytics";
import { Bounce, toast } from "react-toastify";
import { Copy } from "lucide-react";

ContactMeCard.propTypes = {
  contactShow: PropTypes.bool.isRequired,
  contactHide: PropTypes.func.isRequired,
};

export default function ContactMeCard({ contactShow, contactHide }) {
  const [isRendered, setIsRendered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const email = "PrakharS@protonmail.com";
  const phoneNumber = "+91984****410";
  const [showTooltip2, setShowTooltip2] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        progress: undefined,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      toast.error("Failed to copy email!");
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      toast.success(
        <div>
          <span className="font-medium font-archivo text-[#242222] text-base ">
            Number Copied!
          </span>
          <p className="text-[#242222]/80 font-archivo text-sm">
            I may or may not pick up the call 😄
          </p>
        </div>,
        {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
    } catch (err) {
      toast.error("Failed to copy number!");
      console.error("Clipboard error:", err);
    }
  };

  useEffect(() => {
    if (contactShow) {
      setIsRendered(true); // Step 1: render first

      // Step 2: Wait a frame for DOM to mount before animation
      const timeout = setTimeout(() => {
        const overlay = overlayRef.current;
        const card = cardRef.current;
        if (!overlay || !card) return;

        // Initial hidden state
        gsap.set(overlay, { opacity: 0 });
        gsap.set(card, {
          opacity: 0,
          y: -40,
          clipPath: "polygon(-20% 0, 100% 0, 100% 0%, -20% 0%)",
        });

        // Animate in
        gsap
          .timeline()
          .to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" })
          .to(
            card,
            {
              opacity: 1,
              y: 0,
              clipPath: "polygon(-20% 0, 100% 0, 100% 120%, -20% 120%)",
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.1"
          );
      }, 20); // small delay to ensure browser paints hidden state first

      return () => clearTimeout(timeout);
    }

    if (!contactShow && isRendered) {
      const overlay = overlayRef.current;
      const card = cardRef.current;
      if (!overlay || !card) return;

      gsap
        .timeline({
          onComplete: () => setIsRendered(false),
        })
        .to(card, {
          opacity: 0,
          y: -40,
          clipPath: "polygon(-20% 0, 100% 0, 100% 0%, -20% 0%)",
          duration: 0.4,
          ease: "power3.in",
        })
        .to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
    }
  }, [contactShow]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && contactShow) contactHide();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [contactShow, contactHide]);

  if (!isRendered) return null;

  return (
    <div
      className="w-full h-screen fixed top-0 left-0 right-0 bottom-0 bg-black/50 opacity-0"
      style={{ zIndex: 999 }}
      ref={overlayRef}
      onClick={contactHide} // click outside to close
    >
      <div
        ref={cardRef}
        className="w-full max-w-[420px] h-[560px] absolute top-2 right-2 drop-shadow-2xl "
        style={{
          background: `url(${ContactMeBG.src})`,
          backgroundSize: "cover",
          clipPath: "polygon(-20% 0, 100% 0, 100% 0%, -20% 0%)",
          opacity: 0,
          zIndex: 9999,
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="w-full h-14 flex items-center justify-center border-b border-dashed border-[#958E80] relative">
          <div className="w-full max-w-[332px] h-full flex items-center justify-center border-s border-e border-dashed border-[#958E80] relative">
            <h5
              className="w-fit font-archivo-narrow font-semibold text-3xl uppercase text-[#A6A298]"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="font-kings font-normal text-[32px]">C</span>
              ontact{" "}
              <span className="font-kings font-normal text-[32px]">M</span>e
            </h5>
            <Image
              src={ReachOut}
              alt="Reach Out!"
              width={184}
              height={52}
              className="absolute top-5 rotate-[-7deg] left-[20%]"
            />
          </div>

          <button
            type="button"
            className="group absolute top-0 right-0"
            onClick={() => {
              contactHide();
              trackClick("menu_contact");
            }}
          >
            <div className="py-2 px-2 cursor-pointer duration-300">
              <div className="w-[28px] h-10 p-1 flex flex-col justify-between relative">
                <div className="h-0.5 w-full group-hover:w-2/3 bg-[#746E62] duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center rotate-45"></div>
                <div className="h-0.5 w-full group-hover:w-2/3 bg-[#746E62] duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center -rotate-45"></div>
              </div>
            </div>
          </button>
        </div>

        <div className="w-full h-[118px] flex items-center justify-center border-b border-dashed border-[#958E80]">
          <div className="w-full max-w-[332px] h-full flex items-center justify-center border-s border-e border-dashed border-[#958E80]">
            <p
              className="w-full max-w-[292px] text-center font-archivo-narrow font-semibold text-lg uppercase text-[#746E62]"
              style={{ letterSpacing: "-0.03em", lineHeight: "1em" }}
            >
              Do you have a question, an idea, or a project you need help with?
              <br />
              Just, Ping Me!
            </p>
          </div>
        </div>

        <div className="w-full h-[146px] flex items-center justify-center border-b border-dashed border-[#958E80]">
          <div className="w-full max-w-[332px] h-full flex items-center justify-center border-s border-e border-dashed border-[#958E80]">
            <div className="w-full max-w-[292px] flex flex-col gap-4">
              <div className="w-full flex flex-col">
                <h5
                  className="w-full font-archivo font-medium text-sm text-[#746E62] text-center uppercase"
                  style={{ letterSpacing: "-0.02em", lineHeight: "1em" }}
                >
                  (Email)
                </h5>
                <div className="relative w-fit">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="w-fit px-1 font-archivo font-semibold text-2xl text-[#474136] text-center cursor-pointer"
                    style={{
                      letterSpacing: "-0.02em",
                      background: `url(${MarkerLineY.src})`,
                      mixBlendMode: "darken",
                    }}
                  >
                    PrakharS@protonmail.com
                  </button>

                  {showTooltip && (
                    <div className="absolute flex flex-row gap-1 -top-8 left-1/2 -translate-x-1/2 bg-[#333] text-white text-xs px-2 py-2 rounded-md shadow-md whitespace-nowrap">
                      <Copy className="w-3 h-3 mt-[2px] text-white" />
                      <span>Click to copy</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <h5
                  className="w-full font-archivo font-medium text-sm text-[#746E62] text-center uppercase"
                  style={{ letterSpacing: "-0.02em", lineHeight: "1em" }}
                >
                  (Phone)
                </h5>
                <div className="relative w-fit">
                  <button
                    type="button"
                    onClick={copyPhone}
                    onMouseEnter={() => setShowTooltip2(true)}
                    onMouseLeave={() => setShowTooltip2(false)}
                    className="w-fit px-1 font-archivo font-semibold text-2xl text-[#474136] text-center cursor-pointer"
                    style={{
                      letterSpacing: "-0.02em",
                      background: `url(${MarkerLineY.src})`,
                      mixBlendMode: "darken",
                      backgroundSize: "stretch",
                    }}
                  >
                    <span className="font-normal">(+91)</span> 984 **** 410
                  </button>

                  {showTooltip2 && (
                    <div className="absolute flex flex-row gap-1 -top-8 left-1/2 -translate-x-1/2 bg-[#333] text-white text-xs px-2 py-2 rounded-md shadow-md whitespace-nowrap">
                      <Copy className="w-3 h-3 mt-[2px] text-white" />
                      <span>Click to copy</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[118px] flex items-center justify-center border-b border-dashed border-[#958E80]">
          <div className="w-full max-w-[332px] h-full flex items-center justify-center border-s border-e border-dashed border-[#958E80]">
            <div className="w-full max-w-[292px] flex flex-col gap-1">
              <Link
                href="https://www.linkedin.com/in/pixelateit/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-row justify-between items-center group cursor-pointer"
              >
                <h5
                  className="w-fit font-oswald font-medium text-base text-[#746E62] uppercase group-hover:underline"
                  style={{ letterSpacing: "-0.02em", lineHeight: "1em" }}
                >
                  (1) linkedin.com
                </h5>
                <span
                  className="w-fit font-archivo font-bold text-lg text-[#474136] group-hover:underline"
                  style={{
                    letterSpacing: "-0.02em",
                    lineHeight: "1em",
                  }}
                >
                  /in/pixelateit
                </span>
              </Link>

              <Link
                href="https://www.instagram.com/thepixelateit/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-row justify-between items-center group cursor-pointer"
              >
                <h5
                  className="w-fit font-oswald font-medium text-base text-[#746E62] uppercase group-hover:underline"
                  style={{ letterSpacing: "-0.02em", lineHeight: "1em" }}
                >
                  (2) instagram.com
                </h5>
                <span
                  className="w-fit font-archivo font-bold text-lg text-[#474136] group-hover:underline"
                  style={{
                    letterSpacing: "-0.02em",
                    lineHeight: "1em",
                  }}
                >
                  /thepixelateit
                </span>
              </Link>

              <Link
                href="https://www.x.com/pixelateit/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-row justify-between items-center group cursor-pointer"
              >
                <h5
                  className="w-fit font-oswald font-medium text-base text-[#746E62] uppercase group-hover:underline"
                  style={{ letterSpacing: "-0.02em", lineHeight: "1em" }}
                >
                  (3) x.com
                </h5>
                <span
                  className="w-fit font-archivo font-bold text-lg text-[#474136] group-hover:underline"
                  style={{
                    letterSpacing: "-0.02em",
                    lineHeight: "1em",
                  }}
                >
                  /pixelateit
                </span>
              </Link>

              <Link
                href="https://www.behance.net/thepixelate/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-row justify-between items-center group cursor-pointer"
              >
                <h5
                  className="w-fit font-oswald font-medium text-base text-[#746E62] uppercase group-hover:underline"
                  style={{ letterSpacing: "-0.02em", lineHeight: "1em" }}
                >
                  (4) behance.net
                </h5>
                <span
                  className="w-fit font-archivo font-bold text-lg text-[#474136] group-hover:underline"
                  style={{
                    letterSpacing: "-0.02em",
                    lineHeight: "1em",
                  }}
                >
                  /thepixelateit
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-[122px] flex items-center justify-center border-b border-dashed border-[#958E80]">
          <div className="w-full max-w-[310px] h-full flex items-center justify-center ">
            <Image
              src={BarCodePX}
              alt="BarCode"
              width={310}
              height={100}
              className="mt-auto"
            />
          </div>
        </div>

        <div
          className="w-full h-[50px] absolute bottom-0 left-0"
          style={{
            backgroundImage: `url(${PageTorn.src})`,
            backgroundRepeat: "repeat-x",
            transform: "translateY(30px)",
          }}
        />
      </div>
    </div>
  );
}
