"use client";
import { gsap } from "@/lib/gsapConfig";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export default function ModalSlider({ isOpen, onClose, card }) {
  const modalRef = useRef(null);
  const modalDiv1 = useRef(null);
  const modalDiv = useRef(null);
  const [index, setIndex] = useState(0);

  function formattedDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const closeCard = useCallback(() => {
    if (!modalRef.current) return;
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to([modalDiv.current, modalDiv1.current], {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.in",
    }).to(modalRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    });
  }, [onClose]);

  // Animate in when modal opens
  useLayoutEffect(() => {
    if (!isOpen || !card || !modalRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        modalRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      ).fromTo(
        [modalDiv1.current, modalDiv.current],
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.25"
      );
    }, modalRef);

    return () => {
      ctx.revert();
    };
  }, [isOpen, card]);

  useLayoutEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeCard();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeCard]);

  // Reset index when a new card is opened
  useLayoutEffect(() => {
    if (card) setIndex(0);
  }, [card]);

  if (!isOpen || !card) return null;

  return (
    <div
      ref={modalRef}
      className="fixed w-full h-screen top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center p-6"
      style={{ zIndex: 9999, opacity: 0 }}
    >
      <div
        ref={modalDiv1}
        className="relative w-full h-full bg-[radial-gradient(113.73%_100%_at_50%_100%,_#FF3F2B_36.04%,_#E00E15_67.52%,_#750000_100%)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        <div
          ref={modalDiv}
          className="relative bg-white w-full h-full p-2 md:p-10 flex flex-col lg:flex-row overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        >
          <button
            onClick={() => closeCard()}
            className="absolute top-0.5 right-0.5 bg-white hover:bg-gray-300/40 text-black text-2xl flex items-center justify-center w-10 h-10 border border-[#242222]/50 cursor-pointer transition-all duration-300 group z-20"
          >
            <X className="w-6 h-6 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
          </button>
          <div className="relative w-full h-full ">
            <div className="relative w-full h-full overflow-hidden">
              {card.sliderImages?.length > 0 ? (
                <div className="flex w-full h-full overflow-x-auto gap-4">
                  <Image
                    src={card.sliderImages[index]}
                    alt={`${card.company} image ${index + 1}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                    style={{
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#e7e9eb]">
                  <span className="font-archivo-narrow text-xl uppercase text-[#242222] font-medium">
                    No images available.
                  </span>
                </div>
              )}
            </div>

            {card.sliderImages?.length > 1 && (
              <div className="flex justify-between absolute top-1/2 w-full translate-y-[-50%]">
                <button
                  onClick={() =>
                    setIndex((i) =>
                      i > 0 ? i - 1 : card.sliderImages.length - 1
                    )
                  }
                  className="bg-black/25 flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-2xl cursor-pointer -translate-x-5"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() =>
                    setIndex((i) => (i + 1) % card.sliderImages.length)
                  }
                  className="bg-black/25 flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-2xl cursor-pointer translate-x-5"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="w-full h-[1px] lg:w-[1px] lg:h-full bg-[#242222]/20 mx-10" />

          <div className="w-full h-full flex flex-col pe-2.5">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="w-fit flex flex-col md:flex-row md:items-center md:gap-1">
                <span className="font-archivo-narrow font-medium text-sm uppercase text-[#242222]/50">
                  Company:
                </span>
                <span className="w-fit font-oswald font-medium text-sm uppercase text-[#242222] transition-all duration-300">
                  {card.company}
                </span>
              </div>
              <div className="w-fit flex flex-col md:flex-row md:items-center md:gap-1">
                <span className="font-archivo-narrow font-medium text-sm uppercase text-[#242222]/50">
                  Date:
                </span>
                <span className="w-fit font-oswald font-medium text-sm uppercase text-[#242222] transition-all duration-300">
                  {formattedDate(card.date)}
                </span>
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-3 pt-5">
              <h2 className="font-archivo text-xl md:text-2xl font-semibold text-[#242222]">
                {card.title}
              </h2>
              <p className="font-archivo text-sm md:text-base font-normal text-[#242222]/50">
                {card.description}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <span className="font-oswald font-normal text-base uppercase text-[#242222] transition-all duration-300">
                CP-{card.id}
              </span>
              <span className="font-kings font-normal text-base text-[#242222] transition-all duration-300">
                Made in{" "}
                <span
                  className="font-oswald font-medium uppercase"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {card.software}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
