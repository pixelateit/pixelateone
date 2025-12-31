"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2);
  const [animateProgress, setAnimateProgress] = useState(false);
  const intervalRef = useRef(null);
  const DURATION = 4000; // 4 seconds

  // Responsive layout
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = images.length;

  // Move slides
  const sliderLeft = () => {
    setCurrentIndex((prev) =>
      prev - slidesToShow < 0 ? totalSlides - slidesToShow : prev - slidesToShow
    );
    restartProgress();
  };

  const sliderRight = () => {
    setCurrentIndex((prev) =>
      prev + slidesToShow >= totalSlides ? 0 : prev + slidesToShow
    );
    restartProgress();
  };

  // Visible images (loop-friendly)
  const visibleImages = images.slice(currentIndex, currentIndex + slidesToShow)
    .length
    ? images.slice(currentIndex, currentIndex + slidesToShow)
    : [
        ...images.slice(currentIndex),
        ...images.slice(0, slidesToShow - (totalSlides - currentIndex)),
      ];

  // Auto-slide + progress reset
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex, slidesToShow]);

  const startAutoSlide = () => {
    stopAutoSlide();
    setAnimateProgress(true);
    intervalRef.current = setInterval(() => {
      sliderRight();
    }, DURATION);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setAnimateProgress(false);
  };

  const restartProgress = () => {
    setAnimateProgress(false);
    setTimeout(() => setAnimateProgress(true), 50); // restart CSS animation
    startAutoSlide();
  };

  // Pause on hover
  const handleMouseEnter = () => stopAutoSlide();
  const handleMouseLeave = () => startAutoSlide();

  return (
    <div
      className="w-full flex flex-col gap-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Buttons */}
      <div
        className={`w-full flex items-center justify-center relative ${
          images.length <= 2 ? "md:hidden" : ""
        }`}
      >
        <div className="w-fit h-fit rounded-full bg-[#000000]/20 relative overflow-hidden z-20">
          <div className="w-fit flex flex-row gap-1 items-center bg-[#E8ECEF] rounded-full relative overflow-hidden z-20">
            {/* Prev Button */}
            <button
              type="button"
              onClick={sliderLeft}
              className="px-3 py-3 flex flex-row gap-2 text-[#242222] font-archivo font-semibold text-sm cursor-pointer rounded-sm hover:bg-[#DCE1E5]"
            >
              <ArrowLeft className="w-5 h-5 text-[#242222] relative z-10" />
              <span
                className="relative z-10"
                style={{ letterSpacing: "-0.02em" }}
              >
                PREV
              </span>
            </button>

            <div className="w-0.5 h-6 bg-[#AFBBC4]" />

            {/* Next Button */}
            <button
              type="button"
              onClick={sliderRight}
              className="px-3 py-3 flex flex-row gap-2 text-[#242222] font-archivo font-semibold text-sm cursor-pointer rounded-sm hover:bg-[#DCE1E5]"
            >
              <span
                className="relative z-10"
                style={{ letterSpacing: "-0.02em" }}
              >
                NEXT
              </span>
              <ArrowRight className="w-5 h-5 text-[#242222] relative z-10" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Images */}
      <div className="w-full flex flex-row gap-2.5 transition-all duration-300 ease-in-out px-[5px] items-center justify-center">
        {visibleImages.map((imageSrc, index) => (
          <Image
            key={index}
            src={imageSrc?.preview}
            alt={`Slide ${index + 1}`}
            width={948}
            height={860}
            className="rounded-[10px] object-cover w-full md:max-w-1/2"
          />
        ))}
      </div>
    </div>
  );
}
