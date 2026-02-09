// components/ProductShow.js
"use client";

import { useRef } from "react";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";

import Image1 from "@/public/home/image.webp";
import Image2 from "@/public/home/image-1.webp";
import Image3 from "@/public/home/image-2.webp";
import postCab from "@/public/home/cabPoster.webp";
import speakerImg from "@/public/home/SpeakerImage.webp";

const imageData = [
  { type: "image", src: Image1, tags: ["Logo Design", "Branding"] },
  { type: "image", src: Image2, tags: ["App Design", "UI/UX"] },
  {
    type: "video",
    src: "/home/cabsule.mp4",
    tags: ["Ads", "Animation", "3d"],
    poster: postCab,
  },
  { type: "image", src: Image3, tags: ["Web Design", "Web APP", "UI/UX"] },
  {
    type: "video",
    src: "/home/SpeakerVideo.mp4",
    tags: ["Product Design", "3d"],
    poster: speakerImg,
  },
];

export default function ProductShow() {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useGSAPAnimations({
    animations: [
      () => {
        if (!containerRef.current || !imageRefs.current.length) return;

        const ctx = gsap.context(() => {
          gsap.from(imageRefs.current, {
            y: 120,
            filter: "blur(100px)",
            opacity: 0,
            ease: "power3.out",
            duration: 1,
            scale: 0.9,
            stagger: {
              each: 0.05,
              amount: 0.5,
              from: "center",
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: false,
              once: true, // trigger only once
            },
          });
        }, containerRef);

        return () => ctx.revert(); // cleanup only context
      },
    ],
    dependencies: [],
  });

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full"
    >
      {/* Desktop Grid */}
      <div className="hidden sm:flex flex-row items-center justify-center gap-2.5 p-2.5 w-full">
        {imageData.map((item, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className="rounded-xl overflow-hidden flex-grow max-w-1/5 relative group"
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={`Image ${index + 1}`}
                priority
                height={520}
                width={9999}
                className="w-full h-full duration-300 transform scale-100 aspect-auto group-hover:scale-120"
              />
            ) : (
              <video
                autoPlay
                poster={item.poster.src}
                loop
                muted
                playsInline
                className="w-full h-full aspect-auto object-cover pointer-events-none"
              >
                <source
                  src={typeof item.src === "string" ? item.src : item.src?.src}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="absolute top-0 w-full flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex-wrap items-center">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-2 bg-white/90 rounded-full text-xs text-black font-archivo font-semibold uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="sm:hidden w-full overflow-x-auto px-4 py-8 ">
        <div className="flex gap-4" style={{ width: "max-content" }}>
          {imageData.map((item, index) => (
            <div
              key={index}
              // ref={(el) => (imageRefs.current[index] = el)}
              className="w-[45vw] flex-shrink-0 rounded-xl overflow-hidden relative group"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={`Image ${index + 1}`}
                  priority
                  height={520}
                  width={9999}
                  className="w-full h-full duration-300 transform scale-100 aspect-auto group-hover:scale-120"
                />
              ) : (
                <video
                  autoPlay
                  poster={item.poster.src}
                  loop
                  muted
                  playsInline
                  className="w-full h-full aspect-auto object-cover pointer-events-none"
                >
                  <source
                    src={
                      typeof item.src === "string" ? item.src : item.src?.src
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="absolute top-0 w-full flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex-wrap items-center">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/90 rounded-full text-xs text-black font-archivo font-semibold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-8 lg:mt-16">
        <div className="bg-[#cccccc] h-[1px] w-[40px] lg:w-[60px]"></div>
        <div className="bg-[#cccccc] h-[240px] lg:h-[180px] w-[1px]"></div>
      </div>
    </div>
  );
}
