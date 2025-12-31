"use client";
import { gsap } from "@/lib/gsapConfig";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export default function ModalSlider2({ isOpen, onClose, card }) {
  const modalRef = useRef(null);
  const modalDiv = useRef(null);

  const closeCard = useCallback(() => {
    if (!modalRef.current) return;
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(modalDiv.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.5,
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
          ease: "cubic-bezier(0.77, 0, 0.175, 1)",
        }
      ).fromTo(
        modalDiv.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.5,
          ease: "cubic-bezier(0.77, 0, 0.175, 1)",
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

  if (!isOpen || !card) return null;

  return (
    <div
      ref={modalRef}
      className="fixed w-auto h-screen top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-end p-4 md:p-6"
      style={{ zIndex: 9999, opacity: 0 }}
      key={card.id}
      onClick={closeCard}
    >
      <div
        ref={modalDiv}
        className="relative w-full md:w-fit h-full flex overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-fit h-full flex flex-col relative">
          <button
            onClick={() => closeCard()}
            className="absolute top-0 right-0 z-10 bg-white hover:bg-gray-300/40 text-black text-2xl flex items-center justify-center w-10 h-10 border border-[#242222]/50 cursor-pointer transition-all duration-300 group"
          >
            <X className="w-6 h-6 group-hover:w-5 group-hover:h-5 transition-all duration-300" />
          </button>
          {card.posterImage?.length > 0 ? (
            <div className="relative h-full w-full md:w-fit flex">
              <Image
                src={card.posterImage}
                alt={card.posterName || "Card image"}
                width={400}
                height={500}
                className="object-contain aspect-auto h-full w-auto flex"
                priority
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
      </div>
    </div>
  );
}
